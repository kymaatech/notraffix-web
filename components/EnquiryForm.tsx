"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { KIT_OPTIONS, ORG_TYPES, SERVICE_OPTIONS, validate, type Enquiry, type FieldErrors } from "@/lib/enquiry";
import { Arrow } from "./ui";

const EMPTY: Enquiry = { name: "", email: "", phone: "", organisation: "", orgType: "", services: [], location: "", kit: "", message: "" };

export function EnquiryForm() {
  const params = useSearchParams();
  const pre = params.get("service");
  const preKit = params.get("kit");
  const [v, setV] = useState<Enquiry>({
    ...EMPTY,
    services: pre && SERVICE_OPTIONS.some((s) => s.slug === pre) ? [pre] : [],
    kit: preKit && KIT_OPTIONS.some((k) => k.slug === preKit) ? preKit : "",
    location: (params.get("location") || "").slice(0, 200),
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Enquiry, boolean>>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Enquiry>(k: K, val: Enquiry[K]) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (touched[k]) setErrors((e) => ({ ...e, [k]: validate(next)[k] }));
  };
  const blur = (k: keyof Enquiry) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validate(v)[k] }));
  };

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const hp = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value;
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, website: hp }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.fields) setErrors(json.fields);
        throw new Error(json.error || "Something went wrong sending your enquiry.");
      }
      setReference(json.reference || "");
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong sending your enquiry.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[560px] flex-col justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-go/15">
          <svg viewBox="0 0 20 20" className="h-6 w-6 text-go" aria-hidden><path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h2 className="mt-8 text-title">Enquiry sent.</h2>
        <p className="mt-4 max-w-[460px] text-[17px] leading-relaxed text-body">
          Thanks, {v.name.split(" ")[0]}. Our customer service team will reply to {v.email} within two working days{reference ? `. Your reference is ${reference}` : ""}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/solutions" className="btn-ink">Browse solutions</Link>
          <button onClick={() => { setV(EMPTY); setTouched({}); setErrors({}); setStatus("idle"); }} className="btn-line">Send another enquiry</button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Enquiry) => (touched[k] ? errors[k] : undefined);

  return (
    <form id="form" ref={formRef} onSubmit={submit} noValidate className="space-y-12">
      <fieldset className="space-y-5">
        <legend className="mb-2 text-[22px] tracking-[-0.03em]">About you</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Text k="name" label="Full name" required autoComplete="name" v={v} set={set} blur={blur} err={err("name")} />
          <Text k="organisation" label="Organisation" autoComplete="organization" v={v} set={set} blur={blur} />
          <Text k="email" label="Work email" type="email" required autoComplete="email" v={v} set={set} blur={blur} err={err("email")} />
          <Text k="phone" label="Phone" type="tel" autoComplete="tel" hint="Optional. We'll only call about this enquiry." v={v} set={set} blur={blur} err={err("phone")} />
        </div>
        <Select k="orgType" label="Organisation type" required options={ORG_TYPES} v={v} set={set} blur={blur} err={err("orgType")} />
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-2 text-[22px] tracking-[-0.03em]">Your project</legend>
        <div>
          <p id="services-label" className="mb-3 text-[15px] font-medium">What do you need help with? <span className="text-stop">*</span></p>
          <div role="group" aria-labelledby="services-label" aria-describedby={err("services") ? "services-err" : undefined} className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((s, i) => {
              const on = v.services.includes(s.slug);
              return (
                <button
                  key={s.slug}
                  type="button"
                  data-field={i === 0 ? "services" : undefined}
                  aria-pressed={on}
                  onClick={() => { set("services", on ? v.services.filter((x) => x !== s.slug) : [...v.services, s.slug]); setTouched((t) => ({ ...t, services: true })); }}
                  className={`min-h-[44px] rounded-full px-4 text-[15px] transition-colors ${on ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:ring-ink/40"}`}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
          {err("services") && <p id="services-err" role="alert" className="mt-2 text-[14px] text-stop">{err("services")}</p>}
        </div>
        {v.services.includes("solar-systems") && (
          <label htmlFor="f-kit" className="block">
            <span className="mb-2 block text-[15px] font-medium">Which solar system?</span>
            <select id="f-kit" value={v.kit} onChange={(e) => set("kit", e.target.value)} className="field">
              <option value="">Not sure yet, please advise</option>
              {KIT_OPTIONS.map((k) => <option key={k.slug} value={k.slug}>{k.title}</option>)}
            </select>
            <p className="mt-2 text-[14px] text-muted"><Link href="/solar#systems" className="link-u text-ink">Compare the six systems</Link></p>
          </label>
        )}
        <Text k="location" label="Where is the site?" required placeholder="City, road or junction" v={v} set={set} blur={blur} err={err("location")} />
        <label className="block">
          <span className="mb-2 block text-[15px] font-medium">Tell us about it <span className="text-stop">*</span></span>
          <textarea
            data-field="message"
            rows={6}
            value={v.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={!!err("message")}
            aria-describedby="message-help"
            className="field resize-y"
            placeholder="What happens at the junction today, and what would you like to change?"
          />
          {err("message") ? <p role="alert" className="mt-2 text-[14px] text-stop">{err("message")}</p> : <p id="message-help" className="mt-2 text-[14px] text-muted">Photos or drawings can follow by email once we reply.</p>}
        </label>
      </fieldset>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="space-y-6 border-t border-line pt-8">
        {status === "error" && (
          <p role="alert" className="rounded-lg bg-stop/10 px-4 py-3 text-[15px] text-stop">{serverError}</p>
        )}
        <button type="submit" disabled={status === "sending"} className="btn-signal w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto">
          {status === "sending" ? "Sending enquiry…" : "Send enquiry"} <Arrow />
        </button>
      </div>
    </form>
  );
}

type Common = { v: Enquiry; set: <K extends keyof Enquiry>(k: K, val: Enquiry[K]) => void; blur: (k: keyof Enquiry) => void; err?: string; label: string; required?: boolean; hint?: string };

function Text({ k, type = "text", placeholder, autoComplete, ...c }: Common & { k: "name" | "email" | "phone" | "organisation" | "location"; type?: string; placeholder?: string; autoComplete?: string }) {
  const id = `f-${k}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[15px] font-medium">{c.label}{c.required && <span className="text-stop"> *</span>}</span>
      <input
        id={id}
        data-field={k}
        type={type}
        value={c.v[k]}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => c.set(k, e.target.value)}
        onBlur={() => c.blur(k)}
        aria-invalid={!!c.err}
        aria-describedby={c.err ? `${id}-err` : c.hint ? `${id}-hint` : undefined}
        className="field"
      />
      {c.err ? <p id={`${id}-err`} role="alert" className="mt-2 text-[14px] text-stop">{c.err}</p> : c.hint ? <p id={`${id}-hint`} className="mt-2 text-[14px] text-muted">{c.hint}</p> : null}
    </label>
  );
}

function Select({ k, options, ...c }: Common & { k: "orgType"; options: readonly string[] }) {
  const id = `f-${k}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[15px] font-medium">{c.label}{c.required && <span className="text-stop"> *</span>}</span>
      <select
        id={id}
        data-field={k}
        value={c.v[k]}
        onChange={(e) => c.set(k, e.target.value)}
        onBlur={() => c.blur(k)}
        aria-invalid={!!c.err}
        className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22><path d=%22M6 8l4 4 4-4%22 fill=%22none%22 stroke=%22%2315171B%22 stroke-width=%221.6%22/></svg>')] bg-[length:20px] bg-[right_14px_center] bg-no-repeat pr-11"
      >
        <option value="">Choose one</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      {c.err && <p role="alert" className="mt-2 text-[14px] text-stop">{c.err}</p>}
    </label>
  );
}
