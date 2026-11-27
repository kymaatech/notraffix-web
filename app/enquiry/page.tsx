import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE, fullAddress, tel, whatsappLink } from "@/lib/site";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Photo } from "@/components/ui";

export const metadata: Metadata = { title: "Make an enquiry", description: `Tell ${SITE.name} about your junction, corridor or work zone.` };

const NEXT = [
  `Our customer service team reads your enquiry and replies ${SITE.replyTime}.`,
  "We agree a site visit and count the traffic at the times that matter.",
  "You get a written proposal with layout, phasing, cost and timeline.",
];

export default function EnquiryPage() {
  return (
    <section className="pb-24 pt-[92px]">
      <div className="mx-auto grid max-w-[calc(1360px+2.5rem)] gap-5 px-3 sm:px-5 lg:grid-cols-12">
        <aside className="on-dark relative isolate overflow-hidden rounded-2xl text-white lg:sticky lg:top-[92px] lg:col-span-5 lg:h-[calc(100svh-112px)]">
          <Photo k="engineer" priority className="!absolute inset-0 -z-10" sizes="(min-width:1080px) 40vw, 100vw" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
          <div className="flex h-full min-h-[560px] flex-col justify-end p-7 sm:p-10">
            <p className="label">Enquiries</p>
            <h1 className="mt-4 text-display">Tell us about <span className="tone">the site.</span></h1>
            <ol className="mt-8 space-y-4">
              {NEXT.map((t, i) => (
                <li key={t} className="flex gap-4 text-[15.5px] leading-relaxed text-white/75">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-[13px] text-white">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <div className="mt-10 grid gap-4 border-t border-white/15 pt-6 text-[15px] sm:grid-cols-2">
              <div>
                <p className="text-white/50">Email</p>
                <a href={`mailto:${SITE.email}`} className="text-white hover:underline">{SITE.email}</a>
              </div>
              <div>
                <p className="text-white/50">Phone and WhatsApp</p>
                <a href={tel(SITE.phone)} className="text-white hover:underline">{SITE.phone}</a>
              </div>
              <div className="sm:col-span-2">
                <p className="text-white/50">Office, {SITE.hours}</p>
                <address className="not-italic text-white/80">{fullAddress()}</address>
              </div>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn-glass sm:col-span-2 sm:justify-self-start">Chat on WhatsApp</a>
            </div>
          </div>
        </aside>

        <div className="rounded-2xl bg-white p-6 sm:p-10 lg:col-span-7 lg:p-14">
          <Suspense>
            <EnquiryForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
