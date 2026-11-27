import Link from "next/link";
import { SITE, tel } from "@/lib/site";
import { Arrow, Photo } from "./ui";
import { Parallax, Reveal } from "./motion";

export function Closing() {
  return (
    <section className="py-5">
      <div className="mx-auto max-w-[calc(1360px+2.5rem)] px-3 sm:px-5">
        <div className="on-dark relative isolate overflow-hidden rounded-2xl text-white">
          <Parallax><Photo k="congestion" reveal={false} className="h-full w-full" sizes="100vw" /></Parallax>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
          <Reveal className="px-6 py-20 sm:px-12 sm:py-28">
            <p className="label">Start a project</p>
            <h2 className="mt-5 max-w-[760px] text-display">
              Start with one junction. <span className="tone">We'll show you the minutes it gives back.</span>
            </h2>
            <p className="mt-7 max-w-[520px] text-lead text-white/70">Tell us where it is and what's going wrong. Our team replies {SITE.replyTime}.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/enquiry" className="btn-signal">Make an enquiry <Arrow /></Link>
              <a href={tel(SITE.phone)} className="btn-glass">Call {SITE.phone}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
