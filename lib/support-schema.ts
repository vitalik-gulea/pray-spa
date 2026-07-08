import { z } from "zod";
import { locales } from "./i18n/config";

export const supportSubjects = [
  "general",
  "bug",
  "account_deletion",
  "suggestion",
  "other",
] as const;

export const supportRequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  subject: z.enum(supportSubjects),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(locales).default("ru"),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type SupportRequestBody = z.infer<typeof supportRequestSchema>;
