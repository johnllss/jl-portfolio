import type { ContactBody } from "./types";

// thrown when the email settings are missing, so the route can tell that apart from a send failure
export class MailConfigError extends Error {}

export function mailIsConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

// sends the visitor's message to me through Resend's HTTPS API
export async function sendContactEmail(msg: Pick<ContactBody, "name" | "email" | "message">): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    throw new MailConfigError("RESEND_API_KEY and CONTACT_TO_EMAIL must both be set");
  }
  // until I verify a domain in Resend, this test sender only delivers to my own Resend account email.
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: msg.email, // hitting Reply in my inbox answers the visitor
      subject: `Portfolio message from ${msg.name.replace(/[\r\n]+/g, " ")}`,
      text: `From: ${msg.name} <${msg.email}>\n\n${msg.message}`, // plain text only: nothing to inject
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}
