/* Transactional email templates (Resend).
   Table-based, inline-styled HTML so it renders in Gmail, Outlook, Apple Mail and Zoho.
   Every template also returns a plain-text version. */

import { SITE } from "./site";

export type EnquiryEmailData = {
  reference?: string;
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  orgType: string;
  services: string[]; // display names
  location: string;
  scale?: string;
  timeline?: string;
  kit?: string; // display name of a chosen solar system
  message: string;
  receivedAt?: Date;
};

const C = { paper: "#F2F0EB", card: "#FFFFFF", ink: "#15171B", body: "#585C63", muted: "#8A8E95", line: "#E7E4DD", signal: "#F5A300" };
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

const esc = (s = "") => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");
const asset = (p: string) => `${SITE.url.replace(/\/$/, "")}${p}`;
const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;
const when = (d: Date) =>
  d.toLocaleString("en-GB", { timeZone: "Africa/Lagos", weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " WAT";

/* ── shared shell ───────────────────────────────────────── */
function shell({ preheader, body, footerNote }: { preheader: string; body: string; footerNote: string }) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(SITE.name)}</title>
<style>
  @media (max-width:620px){ .px{padding-left:24px!important;padding-right:24px!important} .stack{display:block!important;width:100%!important} .stack-gap{padding-top:12px!important} .h1{font-size:28px!important;line-height:34px!important} }
  a{color:${C.ink}}
</style>
</head>
<body style="margin:0;padding:0;background:${C.paper};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper}">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">
    <tr><td style="padding:0 8px 20px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="vertical-align:middle"><img src="${asset("/email/mark.png")}" width="32" height="32" alt="" style="display:block;border:0;border-radius:8px"></td>
        <td style="vertical-align:middle;padding-left:10px;font:600 19px/1 ${FONT};letter-spacing:-0.4px;color:${C.ink}">${esc(SITE.name)}</td>
      </tr></table>
    </td></tr>
    <tr><td style="background:${C.card};border-radius:20px;overflow:hidden">${body}</td></tr>
    <tr><td class="px" style="padding:24px 16px 0;font:400 13px/20px ${FONT};color:${C.muted}">
      ${footerNote}<br>
      ${esc(SITE.legal)} · ${esc(SITE.city)} · <a href="${SITE.url}" style="color:${C.muted}">${SITE.url.replace(/^https?:\/\//, "")}</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function button(href: string, label: string, primary = true) {
  const bg = primary ? C.signal : C.paper;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table"><tr>
    <td style="background:${bg};border-radius:999px">
      <a href="${href}" style="display:inline-block;padding:13px 22px;font:500 15px/1 ${FONT};color:${C.ink};text-decoration:none;border-radius:999px">${esc(label)}</a>
    </td></tr></table>`;
}

function rows(items: [string, string][]) {
  return items
    .map(
      ([k, v]) => `<tr>
        <td style="padding:12px 0;border-top:1px solid ${C.line};font:400 14px/20px ${FONT};color:${C.body};width:150px;vertical-align:top">${esc(k)}</td>
        <td style="padding:12px 0;border-top:1px solid ${C.line};font:400 15px/21px ${FONT};color:${C.ink};vertical-align:top">${v}</td>
      </tr>`,
    )
    .join("");
}

/* ── 1. New-enquiry alert for the team ─────────────────── */
export function teamEnquiryEmail(d: EnquiryEmailData) {
  const ref = d.reference ? ` ${d.reference}` : "";
  const subject = `New enquiry${ref}: ${d.organisation || d.name} — ${d.services[0] ?? "General"}`;
  const first = d.name.split(" ")[0];
  const replySubject = encodeURIComponent(`Re: your Notraffix enquiry${ref}`);

  const html = shell({
    preheader: `${d.name}${d.organisation ? `, ${d.organisation}` : ""} · ${d.location} · ${d.services.join(", ")}`,
    footerNote: `Sent by the enquiry form on ${SITE.url.replace(/^https?:\/\//, "")}. Reply to this email to answer ${esc(first)} directly.`,
    body: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="height:6px;background:${C.signal};font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td class="px" style="padding:36px 40px 8px">
          <p style="margin:0 0 10px;font:500 13px/1 ${FONT};color:${C.body}">New enquiry${d.reference ? ` · <span style="color:${C.ink}">${esc(d.reference)}</span>` : ""}</p>
          <h1 class="h1" style="margin:0;font:400 32px/38px ${FONT};letter-spacing:-1px;color:${C.ink}">${esc(d.name)}<span style="color:${C.muted}">${d.organisation ? `, ${esc(d.organisation)}` : ""}</span></h1>
          <p style="margin:12px 0 0;font:400 16px/24px ${FONT};color:${C.body}">${esc(d.services.join(", "))} in ${esc(d.location)}</p>
        </td></tr>
        <tr><td class="px" style="padding:24px 40px 8px">
          ${button(`mailto:${d.email}?subject=${replySubject}`, `Reply to ${first}`)}
          ${d.phone ? `<span style="display:inline-block;width:8px"></span>${button(tel(d.phone), `Call ${d.phone}`, false)}` : ""}
        </td></tr>
        <tr><td class="px" style="padding:24px 40px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${rows([
              ["Email", `<a href="mailto:${esc(d.email)}" style="color:${C.ink}">${esc(d.email)}</a>`],
              ["Phone", d.phone ? `<a href="${tel(d.phone)}" style="color:${C.ink}">${esc(d.phone)}</a>` : "—"],
              ["Organisation type", esc(d.orgType)],
              ["Needs", esc(d.services.join(", "))],
              ...(d.kit ? ([["System", esc(d.kit)]] as [string, string][]) : []),
              ["Site", esc(d.location)],
              ["Size of job", esc(d.scale || "—")],
              ["Timeline", esc(d.timeline || "—")],
            ])}
          </table>
        </td></tr>
        <tr><td class="px" style="padding:16px 40px 40px">
          <p style="margin:0 0 10px;font:500 13px/1 ${FONT};color:${C.body}">Message</p>
          <div style="background:${C.paper};border-radius:14px;padding:20px 22px;font:400 16px/25px ${FONT};color:${C.ink}">${nl2br(d.message)}</div>
          <p style="margin:16px 0 0;font:400 13px/20px ${FONT};color:${C.muted}">Received ${when(d.receivedAt ?? new Date())}</p>
        </td></tr>
      </table>`,
  });

  const text = [
    `New enquiry${ref}`,
    "",
    `${d.name}${d.organisation ? `, ${d.organisation}` : ""}`,
    `${d.services.join(", ")} in ${d.location}`,
    "",
    `Email:      ${d.email}`,
    `Phone:      ${d.phone || "—"}`,
    `Org type:   ${d.orgType}`,
    `Size:       ${d.scale || "—"}`,
    `Timeline:   ${d.timeline || "—"}`,
    ...(d.kit ? [`System:     ${d.kit}`] : []),
    "",
    "Message:",
    d.message,
    "",
    `Received ${when(d.receivedAt ?? new Date())}`,
  ].join("\n");

  return { subject, html, text };
}

/* ── 2. Confirmation for the person who enquired ───────── */
export function customerConfirmationEmail(d: EnquiryEmailData) {
  const first = d.name.split(" ")[0];
  const subject = `We've received your enquiry${d.reference ? ` (${d.reference})` : ""}`;
  const steps = [
    ["We read it", "A traffic engineer reviews your enquiry and replies within two working days."],
    ["We visit", "We agree a site visit and count the traffic at the times that matter."],
    ["You get a proposal", "A written plan with layout, phasing, cost and timeline."],
  ];

  const html = shell({
    preheader: `Thanks, ${first}. A traffic engineer will reply within two working days.`,
    footerNote: `You're receiving this because you sent an enquiry on our website. Reply to this email if anything has changed.`,
    body: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td><img src="${asset("/email/banner.jpg")}" width="600" alt="Aerial view of a busy roundabout" style="display:block;width:100%;max-width:600px;height:auto;border:0"></td></tr>
        <tr><td class="px" style="padding:36px 40px 8px">
          ${d.reference ? `<p style="margin:0 0 16px"><span style="display:inline-block;background:${C.paper};border-radius:999px;padding:7px 14px;font:500 13px/1 ${FONT};color:${C.ink}">Reference ${esc(d.reference)}</span></p>` : ""}
          <h1 class="h1" style="margin:0;font:400 32px/38px ${FONT};letter-spacing:-1px;color:${C.ink}">Thanks, ${esc(first)}. <span style="color:${C.muted}">We've got your enquiry.</span></h1>
          <p style="margin:16px 0 0;font:400 16px/25px ${FONT};color:${C.body}">
            You asked about <strong style="font-weight:500;color:${C.ink}">${esc(d.services.join(", ").toLowerCase())}</strong> in <strong style="font-weight:500;color:${C.ink}">${esc(d.location)}</strong>. A traffic engineer will reply to ${esc(d.email)} within two working days.
          </p>
        </td></tr>
        <tr><td class="px" style="padding:28px 40px 8px">
          <p style="margin:0 0 4px;font:500 13px/1 ${FONT};color:${C.body}">What happens next</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${steps
              .map(
                ([t, s], i) => `<tr>
                  <td style="padding:16px 14px 16px 0;border-top:1px solid ${C.line};vertical-align:top;width:28px">
                    <div style="width:28px;height:28px;border-radius:999px;background:${i === 0 ? C.signal : C.paper};text-align:center;font:500 13px/28px ${FONT};color:${C.ink}">${i + 1}</div>
                  </td>
                  <td style="padding:16px 0;border-top:1px solid ${C.line};vertical-align:top">
                    <p style="margin:0;font:500 16px/22px ${FONT};color:${C.ink}">${t}</p>
                    <p style="margin:3px 0 0;font:400 15px/22px ${FONT};color:${C.body}">${s}</p>
                  </td></tr>`,
              )
              .join("")}
          </table>
        </td></tr>
        <tr><td class="px" style="padding:20px 40px 8px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ink};border-radius:14px">
            <tr><td style="padding:20px 22px">
              <p style="margin:0;font:400 14px/20px ${FONT};color:#A9ADB3">Signal fault or emergency? Our fault line is open 24/7.</p>
              <p style="margin:6px 0 0;font:400 22px/28px ${FONT};letter-spacing:-0.5px"><a href="${tel(SITE.faultLine)}" style="color:${C.signal};text-decoration:none">${esc(SITE.faultLine)}</a></p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td class="px" style="padding:28px 40px 40px">
          <p style="margin:0 0 20px;font:400 15px/23px ${FONT};color:${C.body}">While you wait, you can see how we work on site.</p>
          ${button(`${SITE.url}/solutions`, "Browse our solutions", false)}
          <p style="margin:28px 0 0;font:400 15px/23px ${FONT};color:${C.ink}">The ${esc(SITE.name)} team</p>
        </td></tr>
      </table>`,
  });

  const text = [
    `Thanks, ${first}. We've got your enquiry.${d.reference ? ` Reference ${d.reference}.` : ""}`,
    "",
    `You asked about ${d.services.join(", ").toLowerCase()} in ${d.location}. A traffic engineer will reply to ${d.email} within two working days.`,
    "",
    "What happens next",
    ...steps.map(([t, s], i) => `${i + 1}. ${t}: ${s}`),
    "",
    `Signal fault or emergency? Call our 24/7 fault line: ${SITE.faultLine}`,
    "",
    `The ${SITE.name} team`,
    SITE.url,
  ].join("\n");

  return { subject, html, text };
}

/* Sample data for the preview page. */
export const SAMPLE: EnquiryEmailData = {
  reference: "NTX-1001",
  name: "Adaeze Okafor",
  email: "adaeze.okafor@example.com",
  phone: "+234 803 000 0000",
  organisation: "Lekki Gardens Estate",
  orgType: "Estate, campus or developer",
  services: ["Signal installation", "Monitoring and data"],
  location: "Lekki–Epe Expressway, Lagos",
  scale: "2 to 10 junctions",
  timeline: "Within 3 months",
  message:
    "We have two access junctions onto the expressway that back up badly every morning between 7 and 9am.\n\nWe'd like to understand what signalising them would involve, and whether we can monitor them remotely.",
  receivedAt: new Date("2026-11-05T09:42:00+01:00"),
};
