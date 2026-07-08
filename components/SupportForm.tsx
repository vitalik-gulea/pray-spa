"use client";

import { useState, type FormEvent } from "react";
import { supportSubjects } from "@/lib/support-schema";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

type Status = "idle" | "loading" | "success" | "error";

export function SupportForm({
  dict,
  locale,
  supportEmail,
}: {
  dict: Dictionary["support"];
  locale: Locale;
  supportEmail: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      locale,
      honeypot: formData.get("company"),
    };

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setStatus("error");
        setErrorMessage(data?.error ?? dict.errorGeneric);
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(dict.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
        <p className="text-lg font-semibold text-accent-dark">{dict.successTitle}</p>
        <p className="mt-2 text-foreground/70">
          {dict.successBody.replace("{email}", supportEmail)}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-accent-dark hover:underline"
        >
          {dict.successRetry}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            {dict.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            className="mt-1.5 w-full rounded-lg border border-black/10 bg-background px-3.5 py-2.5 outline-none transition-colors focus:border-accent dark:border-white/15"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            {dict.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="mt-1.5 w-full rounded-lg border border-black/10 bg-background px-3.5 py-2.5 outline-none transition-colors focus:border-accent dark:border-white/15"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium">
          {dict.subjectLabel}
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue="general"
          className="mt-1.5 w-full rounded-lg border border-black/10 bg-background px-3.5 py-2.5 outline-none transition-colors focus:border-accent dark:border-white/15"
        >
          {supportSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {dict.subjectOptions[subject]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          {dict.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-black/10 bg-background px-3.5 py-2.5 outline-none transition-colors focus:border-accent dark:border-white/15"
        />
      </div>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && errorMessage && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? dict.submitting : dict.submit}
      </button>
    </form>
  );
}
