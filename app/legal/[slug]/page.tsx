import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE, fullAddress } from "@/lib/site";

/* Privacy policy drafted against the Nigeria Data Protection Act 2023 (NDPA).
   Draft for the client's approval — have counsel review before relying on it. */

const UPDATED = "16 November 2026";

type Section = { h: string; p?: string[]; list?: string[] };

const PRIVACY: Section[] = [
  {
    h: "Who we are",
    p: [
      `${SITE.name} is an initiative of ${SITE.parent} ("we", "us"). We are the data controller for personal data collected through ${SITE.url.replace(/^https?:\/\//, "")}. Our office is at ${fullAddress()}, ${SITE.address.country}. You can contact us about privacy at ${SITE.email}.`,
    ],
  },
  {
    h: "What we collect",
    p: ["We only collect what we need to respond to you:"],
    list: [
      "Details you give in the enquiry form: your name, organisation, organisation type, email address, phone number, the services you are interested in, the site location and your message.",
      "Messages you send us by email, phone or WhatsApp.",
      "Basic technical data sent with the form: your IP address and browser type, used to prevent spam and abuse.",
    ],
  },
  {
    h: "Why we use it, and our lawful basis",
    list: [
      "To reply to your enquiry and prepare a proposal or quotation, based on your consent and on steps you ask us to take before entering a contract.",
      "To manage the project and our relationship with you if you become a client, as needed to perform our contract.",
      "To protect the website against spam and misuse, based on our legitimate interests.",
      "To meet legal, tax and regulatory obligations.",
    ],
    p: ["We do not sell your personal data, and we do not use it for automated decision-making or profiling."],
  },
  {
    h: "Who we share it with",
    p: [
      "Your data is handled by our own team and by a small number of service providers who process it on our instructions: website hosting, our enquiry database, and email delivery. Each is bound to keep it confidential and secure.",
      "Some of these providers store data outside Nigeria. Where that happens, we rely on the transfer safeguards allowed under the NDPA, such as contractual protections, so your data receives an adequate level of protection.",
      "We may also share data with technical partners where needed to prepare a quotation for your project, and we will tell you before we do.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "Enquiries that don't lead to a project are kept for up to 24 months from our last contact, then deleted. If you become a client, we keep project records for as long as the contract requires and for any period required by law.",
    ],
  },
  {
    h: "How we protect it",
    p: [
      "Data is sent over encrypted connections and stored with access restricted to the staff who need it. Our enquiry database cannot be read from the public website.",
    ],
  },
  {
    h: "Your rights",
    p: ["Under the Nigeria Data Protection Act 2023 you have the right to:"],
    list: [
      "be told how your data is used, and get a copy of it;",
      "have inaccurate data corrected;",
      "have your data deleted, or its use restricted;",
      "receive your data in a portable format;",
      "object to how we use it;",
      "withdraw your consent at any time, without affecting anything we did before you withdrew it.",
    ],
  },
  {
    h: "How to use your rights or complain",
    p: [
      `Email ${SITE.email} with your request. We will reply within 30 days. If you're unhappy with how we've handled your data, you can complain to the Nigeria Data Protection Commission (NDPC).`,
    ],
  },
  {
    h: "Cookies",
    p: ["This website does not use advertising or tracking cookies. Your browser may store small technical files needed for the site to work, such as cached pages."],
  },
  {
    h: "Children",
    p: ["Our services are for organisations and adults. We do not knowingly collect data from anyone under 18."],
  },
  {
    h: "Changes to this policy",
    p: ["We may update this policy from time to time. The date at the top shows when it last changed."],
  },
];

const DOCS: Record<string, { title: string; sections: Section[] }> = {
  privacy: { title: "Privacy policy", sections: PRIVACY },
};

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(DOCS).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const d = DOCS[(await params).slug]; return d ? { title: d.title } : {}; }

export default async function Legal({ params }: Props) {
  const d = DOCS[(await params).slug];
  if (!d) notFound();
  return (
    <section className="pb-24 pt-40">
      <div className="wrap max-w-[820px]">
        <h1 className="text-display">{d.title}</h1>
        <p className="mt-4 text-[15px] text-muted">Last updated {UPDATED}</p>
        <div className="mt-12 space-y-10">
          {d.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-[24px] tracking-[-0.03em]">{s.h}</h2>
              <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-body">
                {s.p?.slice(0, s.list ? 1 : undefined).map((t) => <p key={t}>{t}</p>)}
                {s.list && (
                  <ul className="list-disc space-y-2 pl-5 marker:text-muted">
                    {s.list.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}
                {s.list && s.p?.slice(1).map((t) => <p key={t}>{t}</p>)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
