import { customerConfirmationEmail, SAMPLE, teamEnquiryEmail } from "@/lib/emails";

/* Local preview of the email templates:
   /email-preview/team  ·  /email-preview/confirmation  ·  add ?format=text for plain text.
   Disabled in production. */
export async function GET(req: Request, { params }: { params: Promise<{ template: string }> }) {
  if (process.env.NODE_ENV === "production" && process.env.EMAIL_PREVIEW !== "on") return new Response("Not found", { status: 404 });
  const { template } = await params;
  const build = template === "team" ? teamEnquiryEmail : template === "confirmation" ? customerConfirmationEmail : null;
  if (!build) return new Response("Use /email-preview/team or /email-preview/confirmation", { status: 404 });
  const mail = build(SAMPLE);
  const text = new URL(req.url).searchParams.get("format") === "text";
  return new Response(text ? `Subject: ${mail.subject}\n\n${mail.text}` : mail.html, {
    headers: { "Content-Type": text ? "text/plain; charset=utf-8" : "text/html; charset=utf-8" },
  });
}
