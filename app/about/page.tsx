import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { TEAM } from "@/lib/team";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { Arrow, Film, Photo, Tone } from "@/components/ui";
import { Item, Parallax, Reveal, ScrollFill, Stagger } from "@/components/motion";

export const metadata: Metadata = {
  title: "Company",
  description: `${SITE.name} is an initiative of ${SITE.parent}, delivering intelligent traffic-control infrastructure across Nigeria and Africa.`,
};

const SCOPE = [
  "Traffic signal installation",
  "Rehabilitation and modernisation",
  "Adaptive signal control",
  "Sensor-based traffic monitoring",
  "Solar-powered signal systems",
  "Pedestrian safety",
  "Emergency-vehicle priority",
  "Junction synchronisation",
  "Integrated traffic management",
];

const CLIENTS = [
  { t: "Federal, state and local governments", d: "New and upgraded junctions, corridor coordination and network-wide traffic management, with reporting for policy and budgets." },
  { t: "Road authorities", d: "Signal rehabilitation, adaptive control, monitoring and maintenance across the roads they manage." },
  { t: "Contractors", d: "Roadworks signalling and signal packages delivered as part of road and infrastructure projects." },
  { t: "Estates and campuses", d: "Signalised access roads, internal junctions, pedestrian crossings and parking guidance." },
  { t: "Ports and logistics hubs", d: "Freight priority, queue detection and safer, faster approaches for heavy vehicles." },
  { t: "Development partners and philanthropists", d: "Individuals and organisations investing in development economies, town planning and safer communities." },
];

const VISION = ["Safer roads.", "Faster journeys.", "Smarter cities.", "Sustainable mobility."];

export default function AboutPage() {
  const [lead, ...board] = TEAM;
  return (
    <>
      <PageHero
        image="officer"
        label="Company"
        a="Intelligent urban mobility"
        b="for Nigeria and Africa."
        text={`${SITE.name} started operations in ${SITE.founded} as an initiative of ${SITE.parent}, to give the region reliable, efficient and intelligent traffic-control infrastructure.`}
      />

      {/* ── Story ── */}
      <section className="py-24 sm:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="label">Our story</p>
            <Tone className="mt-4 text-title" a="Built for what" b="poor junctions really cost." />
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-body">
              <p>
                {SITE.name} grew from a clear view of the economic and social cost of badly maintained signals, inefficient junctions, road accidents, congestion and outdated traffic-management systems.
              </p>
              <p>
                So we set out to do more than install and maintain traffic lights. Our work spans the whole junction and the network around it, from rehabilitating old signals to adaptive control, sensor-based monitoring and solar-powered systems.
              </p>
              <p>
                To deliver to a global standard, we have built strategic partnerships with leading international experts, technology providers, engineering firms and specialist manufacturers. We bring their proven technology and best practice, and adapt it to the way African roads actually operate.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {SCOPE.map((s) => <li key={s} className="rounded-full bg-white px-3.5 py-1.5 text-[14px]">{s}</li>)}
            </ul>
          </Reveal>
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <Photo k="engineer" className="aspect-[3/4] rounded-xl" sizes="25vw" />
              <Photo k="wiring" className="mt-12 aspect-[3/4] rounded-xl" sizes="25vw" />
            </div>
            <Reveal className="mt-4 flex items-end justify-between gap-6 rounded-xl bg-ink p-6 text-white">
              <div>
                <p className="text-[14px] text-white/55">Started operations</p>
                <p className="mt-1 text-[44px] leading-none tracking-[-0.05em]">{SITE.founded}</p>
              </div>
              <p className="max-w-[220px] text-right text-[14.5px] text-white/65">An initiative of {SITE.parent}, based in {SITE.city}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Partnerships band ── */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <Parallax><Film video="nightVideo" poster="nightPoster" className="h-full w-full" /></Parallax>
        <div className="absolute inset-0 -z-10 bg-ink/70" />
        <div className="wrap flex min-h-[560px] items-end py-20">
          <ScrollFill
            className="max-w-[1000px] text-display"
            text="World-class traffic technology, from partners around the globe, adapted to African roads."
          />
        </div>
      </section>

      {/* ── Leadership ── */}
      <section id="leadership" className="scroll-mt-24 py-24 sm:py-32">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-3 lg:pt-3"><p className="label">Leadership</p></Reveal>
            <Reveal className="lg:col-span-9" delay={0.08}>
              <Tone className="text-display max-w-[900px]" a="Decades of experience" b="across planning, engineering and public service." />
            </Reveal>
          </div>

          {/* CEO feature */}
          <article className="group mt-16 grid gap-6 overflow-hidden rounded-xl bg-white p-3 md:grid-cols-12">
            <Portrait src={lead.photo} name={lead.name} className="md:col-span-5" />
            <Reveal className="flex flex-col justify-end p-4 sm:p-8 md:col-span-7">
              <p className="text-[15px] text-muted">{lead.role}</p>
              <h3 className="mt-2 text-title">{lead.name}</h3>
              <p className="mt-5 max-w-[560px] text-[18px] leading-relaxed text-body">{lead.bio}</p>
            </Reveal>
          </article>

          <Stagger className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {board.map((p) => (
              <Item key={p.slug} className="group flex flex-col rounded-xl bg-white p-3">
                <Portrait src={p.photo} name={p.name} />
                <div className="flex flex-1 flex-col p-3 pt-5">
                  <p className="text-[14px] text-muted">{p.role}</p>
                  <h3 className="mt-1 text-[22px] leading-tight tracking-[-0.03em]">{p.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">{p.bio}</p>
                  {p.linkedin && (
                    <a href={p.linkedin} target="_blank" rel="noreferrer" className="link-u mt-auto pt-5 text-[14.5px]">
                      LinkedIn <Arrow diagonal className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3 lg:pt-3"><p className="label">What we're working towards</p></Reveal>
          <Stagger className="lg:col-span-9" gap={0.12}>
            {VISION.map((v, i) => (
              <Item key={v} className="border-b border-line py-5 first:pt-0">
                <p className={`text-display ${i % 2 ? "text-muted" : "text-ink"}`}>{v}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Clients ── */}
      <section className="py-24 sm:py-32">
        <div className="wrap">
          <Tone className="max-w-[800px] text-title" a="Who we work with." />
          <Stagger className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENTS.map((c) => (
              <Item key={c.t} className="border-t border-ink pt-6">
                <h3 className="text-[23px] tracking-[-0.03em]">{c.t}</h3>
                <p className="mt-3 max-w-[420px] text-[16px] leading-relaxed text-body">{c.d}</p>
              </Item>
            ))}
          </Stagger>
          <div className="mt-14"><Link href="/enquiry" className="btn-ink">Talk to us about a project <Arrow /></Link></div>
        </div>
      </section>
      <Closing />
    </>
  );
}

/** Portrait frame: one consistent crop and tone across studio photos with different backdrops. */
function Portrait({ src, name, className = "" }: { src: string; name: string; className?: string }) {
  return (
    <div className={`frame aspect-[4/5] rounded-lg ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`Portrait of ${name}`}
        loading="lazy"
        decoding="async"
        className="lg:grayscale lg:transition-[filter,transform] lg:duration-700 lg:group-hover:grayscale-0"
      />
    </div>
  );
}
