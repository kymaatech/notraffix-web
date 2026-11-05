import Link from "next/link";
import { SITE } from "@/lib/site";
import { SOLUTIONS } from "@/lib/content";
import { Logo } from "./Logo";
import { Arrow } from "./ui";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="wrap pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-[380px] text-[16px] leading-relaxed text-white/60">{SITE.description}</p>
            <Link href="/enquiry" className="btn-signal mt-8">Make an enquiry <Arrow /></Link>
          </div>
          <Col title="Solutions" className="lg:col-span-3">
            {SOLUTIONS.map((s) => <FLink key={s.slug} href={`/solutions/${s.slug}`}>{s.title}</FLink>)}
          </Col>
          <Col title="Company" className="lg:col-span-2">
            <FLink href="/about">About</FLink>
            <FLink href="/projects">Projects</FLink>
            <FLink href="/enquiry">Enquiries</FLink>
          </Col>
          <Col title="Contact" className="lg:col-span-2">
            <a href={`mailto:${SITE.email}`} className="text-white/80 hover:text-white">{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-white/80 hover:text-white">{SITE.phone}</a>
            <span className="text-white/50">{SITE.city}</span>
          </Col>
        </div>

        <div className="mt-16 rounded-xl bg-asphalt p-6 sm:flex sm:items-center sm:justify-between">
          <p className="text-[15px] text-white/60">Signal fault? Our fault line is open 24/7.</p>
          <a href={`tel:${SITE.faultLine.replace(/\s/g, "")}`} className="mt-2 block text-[22px] tracking-[-0.02em] text-signal sm:mt-0">{SITE.faultLine}</a>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-[14px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legal}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SITE.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">{s.label}</a>
            ))}
            <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
            <a href={SITE.credit.href} target="_blank" rel="noreferrer" className="hover:text-white">
              Built and managed by <span className="text-white/75">{SITE.credit.label}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-5 text-[14px] text-white/45">{title}</p>
      <div className="flex flex-col gap-3 text-[15px]">{children}</div>
    </div>
  );
}
function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="text-white/80 transition-colors hover:text-white">{children}</Link>;
}
