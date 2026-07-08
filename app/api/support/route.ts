import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supportRequestSchema } from "@/lib/support-schema";
import { isRateLimited } from "@/lib/rate-limit";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

const RATE_LIMIT_WINDOW_MS = 30_000;
const SUPPORT_EMAIL_TO = process.env.SUPPORT_EMAIL_TO;

const rateLimitMessages: Record<Locale, string> = {
  ru: "Слишком много запросов. Попробуйте через 30 секунд.",
  en: "Too many requests. Please try again in 30 seconds.",
  ro: "Prea multe cereri. Încearcă din nou peste 30 de secunde.",
};

const invalidRequestMessages: Record<Locale, string> = {
  ru: "Некорректные данные формы",
  en: "Invalid form data",
  ro: "Date de formular invalide",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getRequestLocale(json: unknown): Locale {
  if (json && typeof json === "object" && "locale" in json) {
    const value = (json as { locale?: unknown }).locale;
    if (typeof value === "string" && isLocale(value)) {
      return value;
    }
  }
  return defaultLocale;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: invalidRequestMessages[defaultLocale] },
      { status: 400 },
    );
  }

  const requestLocale = getRequestLocale(json);

  if (isRateLimited(ip, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json(
      { ok: false, error: rateLimitMessages[requestLocale] },
      { status: 429 },
    );
  }

  const parsed = supportRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: invalidRequestMessages[requestLocale] },
      { status: 400 },
    );
  }

  const { name, email, subject, message, locale, honeypot } = parsed.data;

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const dict = await getDictionary(locale);
  const errorGeneric = dict.support.errorGeneric;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured — support email not sent");
    return NextResponse.json({ ok: false, error: errorGeneric }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const subjectLabel = dict.support.subjectOptions[subject];

  try {
    const { error } = await resend.emails.send({
      from: "Pray Together Support <support@pray-together.org>",
      to: SUPPORT_EMAIL_TO ?? [],
      replyTo: email,
      subject: `[Pray Together Support] ${subjectLabel}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
        <p><strong>Language:</strong> ${escapeHtml(locale)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ ok: false, error: errorGeneric }, { status: 500 });
    }
  } catch (error) {
    console.error("Failed to send support email", error);
    return NextResponse.json({ ok: false, error: errorGeneric }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
