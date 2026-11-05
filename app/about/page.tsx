import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { Film, Photo, Tone } from "@/components/ui";
import { Item, Parallax, Reveal, ScrollFill, Stagger } from "@/components/motion";

export const metadata: Metadata = { title: "Company", description: `About ${SITE.name}.` };

const CLIENTS = [
  { t: "State and municipal road authorities", d: "New junctions, upgrades and network-wide adaptive control, with reporting for policy and budget." },
  { t: "Construction contractors", d: "Roadworks signalling, traffic management plans and permits for the length of the job." },
  { t: "Estates, campuses and developers", d: "Signalised access roads, internal junctions and parking guidance." },
  { t: "Ports, airports and logistics hubs", d: "Freight priority, queue detection and guidance on busy approaches." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero image="officer" label="Company" a="Traffic engineers first." b="Then a signal company." text={`${SITE.name} exists to bring modern, measured traffic control to Nigerian roads that have outgrown fixed timings and hand signals.`} />

      <section className="py-24 sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Tone className="text-title" a="Give every road" b="its full capacity." />
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-body">
              <p>Most congestion isn't caused by too little road. It comes from junctions running on timings written for traffic that no longer exists, or on no timings at all.</p>
              <p>We combine signal hardware built for the climate, adaptive software and a round-the-clock operations team. The engineers who survey and install a junction are the ones who keep it running afterwards.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <Photo k="engineer" className="aspect-[3/4] rounded-xl" sizes="25vw" />
            <Photo k="wiring" className="mt-12 aspect-[3/4] rounded-xl" sizes="25vw" />
          </div>
        </div>
      </section>

      <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <Parallax><Film video="nightVideo" poster="nightPoster" className="h-full w-full" /></Parallax>
        <div className="absolute inset-0 -z-10 bg-ink/70" />
        <div className="wrap flex min-h-[560px] items-end py-20">
          <ScrollFill className="max-w-[900px] text-display" text="Day and night, someone is watching every junction we run." />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="wrap">
          <Tone className="max-w-[800px] text-title" a="Who we work with." />
          <Stagger className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {CLIENTS.map((c) => (
              <Item key={c.t} className="border-t border-ink pt-6">
                <h3 className="text-[24px] tracking-[-0.03em]">{c.t}</h3>
                <p className="mt-3 max-w-[460px] text-[16.5px] leading-relaxed text-body">{c.d}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
      <Closing />
    </>
  );
}
