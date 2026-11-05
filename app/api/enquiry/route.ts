import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { KIT_OPTIONS, SERVICE_OPTIONS, validate, type Enquiry } from "@/lib/enquiry";
import { SITE } from "@/lib/site";
import { customerConfirmationEmail, teamEnquiryEmail } from "@/lib/emails";

/* POST /api/enquiry
   1. validates (same rules as the form)
   2. stores the enquiry in Supabase  — needs SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
   3. emails the team via Resend      — needs RESEND_API_KEY + ENQUIRY_TO (+ ENQUIRY_FROM)
   4. sends the sender a short confirmation (same Resend key)
   Each step is skipped, not failed, when its keys aren't set, so previews still work. */

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}


export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "Too many enquiries from this connection. Try again in a few minutes, or email us directly." }, { status: 429 });

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "We couldn't read that form. Refresh the page and try again." }, { status: 400 });
  }
  if (raw.website) return NextResponse.json({ ok: true }); // honeypot

  const str = (k: string, max: number) => String(raw[k] ?? "").trim().slice(0, max);
  const validSlugs = new Set(SERVICE_OPTIONS.map((s) => s.slug));
  const e: Enquiry = {
    name: str("name", 120),
    email: str("email", 160).toLowerCase(),
    phone: str("phone", 40),
    organisation: str("organisation", 160),
    orgType: str("orgType", 80),
    services: Array.isArray(raw.services) ? raw.services.map(String).filter((s) => validSlugs.has(s)).slice(0, 6) : [],
    location: str("location", 200),
    scale: str("scale", 60),
    timeline: str("timeline", 60),
    kit: KIT_OPTIONS.some((k) => k.slug === raw.kit) ? String(raw.kit) : undefined,
    message: str("message", 5000),
    consent: raw.consent === true,
  };

  const errors = validate(e);
  if (Object.keys(errors).length) return NextResponse.json({ error: "Some fields need attention.", fields: errors }, { status: 422 });

  const serviceNames = e.services.map((s) => SERVICE_OPTIONS.find((x) => x.slug === s)?.title ?? s);
  const kitName = e.kit ? KIT_OPTIONS.find((k) => k.slug === e.kit)?.title : undefined;

  // ── 2. Supabase ──────────────────────────────────────────
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let reference = "";
  if (sbUrl && sbKey) {
    const sb = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
    const { data, error } = await sb
      .from("enquiries")
      .insert({
        name: e.name,
        email: e.email,
        phone: e.phone || null,
        organisation: e.organisation || null,
        org_type: e.orgType,
        services: e.services,
        location: e.location,
        scale: e.scale || null,
        timeline: e.timeline || null,
        kit: e.kit || null,
        message: e.message,
        source_ip: ip,
        user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      })
      .select("reference")
      .single();
    if (error) {
      console.error("[enquiry] supabase insert failed", error);
      return NextResponse.json({ error: `We couldn't save your enquiry just now. Please email ${SITE.email} instead.` }, { status: 502 });
    }
    reference = data?.reference ?? "";
  }

  // ── 3 + 4. Resend ────────────────────────────────────────
  const rk = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  const from = process.env.ENQUIRY_FROM || `${SITE.name} <onboarding@resend.dev>`;
  if (rk && to) {
    const data = { ...e, kit: kitName, services: serviceNames, reference: reference || undefined, receivedAt: new Date() };
    const team = teamEnquiryEmail(data);
    const confirm = customerConfirmationEmail(data);

    const send = (body: object) =>
      fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${rk}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });

    const r = await send({ from, to: to.split(",").map((s) => s.trim()), reply_to: e.email, subject: team.subject, html: team.html, text: team.text });
    if (!r.ok) {
      console.error("[enquiry] resend team email failed", r.status, await r.text());
      if (!reference) return NextResponse.json({ error: `We couldn't send your enquiry just now. Please email ${SITE.email} instead.` }, { status: 502 });
    }
    await send({ from, to: [e.email], reply_to: process.env.ENQUIRY_REPLY_TO || to.split(",")[0].trim(), subject: confirm.subject, html: confirm.html, text: confirm.text }).catch(() => {});
  }

  if (!sbUrl && !rk) console.log("[enquiry] (no Supabase or Resend keys set — logged only)", e);
  return NextResponse.json({ ok: true, reference });
}
