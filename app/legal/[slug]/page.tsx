import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/* PLACEHOLDER legal copy — the client's counsel should supply final text. */
const DOCS: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy policy",
    body: [
      `${SITE.legal} collects the details you send through our enquiry form (name, email, phone, organisation, site location and message) only to reply to your enquiry and prepare any proposal.`,
      "Enquiries are stored securely and kept for as long as needed to handle the request and any contract that follows. We do not sell personal data.",
      `To see, correct or delete the details we hold about you, email ${SITE.email}.`,
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(DOCS).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const d = DOCS[(await params).slug]; return d ? { title: d.title } : {}; }

export default async function Legal({ params }: Props) {
  const d = DOCS[(await params).slug];
  if (!d) notFound();
  return (
    <section className="pb-24 pt-40">
      <div className="wrap max-w-[780px]">
        <h1 className="text-display">{d.title}</h1>
        <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-body">{d.body.map((p) => <p key={p}>{p}</p>)}</div>
      </div>
    </section>
  );
}
