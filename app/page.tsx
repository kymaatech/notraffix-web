import Link from "next/link";
import { Arrow, ArrowLink, Photo } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { Item, Parallax, Reveal, Stagger } from "@/components/motion";
import { FAQ, SOLUTIONS } from "@/lib/content";
import { Closing } from "@/components/Closing";
import { SolarPoleScene } from "@/components/solar/Art";
import { KITS } from "@/lib/solar";
import { TEAM } from "@/lib/team";
import type { MediaKey } from "@/lib/media";

/* Home, after Sila Signalbau's traffic-lights page: a bright product photo,
   the title on white, then full-bleed photos with overlapping white cards.
   Modernised with larger type, rounded frames and quiet motion. */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Values />
      <SolarBand />
      <MoreSolutions />
      <Leadership />
      <Questions />
      <Closing />
    </>
  );
}

const eyebrow = "text-[13px] font-medium uppercase tracking-[0.16em] text-muted";

function Lights({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-hidden>
      <span className="h-2 w-2 rounded-full bg-stop" />
      <span className="h-2 w-2 rounded-full bg-signal" />
      <span className="h-2 w-2 rounded-full bg-go" />
    </span>
  );
}

/* ── 1. Hero: the product against the sky, the statement on a white panel ── */
function Hero() {
  return (
    <section className="px-3 pt-[84px] sm:px-5 sm:pt-[92px]">
      <div className="relative mx-auto max-w-[calc(1360px+2.5rem)]">
        <div className="relative isolate h-[44svh] min-h-[300px] overflow-hidden rounded-2xl sm:h-[56svh] sm:min-h-[420px] sm:rounded-[28px]">
          <Parallax>
            <Photo k="signalSky" priority className="h-full w-full [&_img]:object-[50%_35%]" sizes="100vw" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        <div className="wrap relative z-10 -mt-20 sm:-mt-28">
          <div className="hero-in max-w-[920px] rounded-2xl bg-white p-7 shadow-[0_30px_80px_-40px_rgb(21_23_27/.35)] sm:rounded-[28px] sm:p-12 [animation-delay:.1s]">
            <p className={`flex items-center gap-3 ${eyebrow}`}>
              <Lights /> Traffic signal systems for African cities
            </p>
            <h1 className="mt-5 text-[clamp(2rem,4.2vw,3.9rem)] font-normal leading-[1.06] tracking-[-0.04em]">
              We design, install and run traffic signals, adaptive control and road works signalling.
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/enquiry" className="btn-signal">Make an enquiry <Arrow /></Link>
              <Link href="/solutions" className="btn-line">Our solutions</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Intro, as Sila's "New standards in traffic safety" ── */
function Intro() {
  return (
    <section className="pb-20 pt-20 sm:pb-28 sm:pt-28">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <h2 className="text-title">
            Built for <span className="text-muted">African cities.</span>
          </h2>
        </Reveal>
        <Reveal className="space-y-5 text-[17.5px] leading-relaxed text-body lg:col-span-7" delay={0.08}>
          <p>
            Every junction is different. We start with a survey of the traffic actually there, then choose the signals, controller and timing that keep it safe and moving.
          </p>
          <p>
            Our hardware is chosen for heat, dust, heavy rain and an unreliable grid, with battery or solar backup on every controller. The same team designs, installs and maintains it, so one company stays accountable from the first count to years of operation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 3. Services: full-bleed photo to the screen edge, overlapping white card ── */
function Services() {
  const rows: { slug: string; name: string; image: MediaKey }[] = [
    { slug: "signal-installation", name: "Traffic signals", image: "signalMast" },
    { slug: "adaptive-control", name: "Adaptive control", image: "intersection" },
    { slug: "roadworks", name: "Road works signalling", image: "cones" },
  ];
  return (
    <section className="space-y-16 pb-24 sm:space-y-24 sm:pb-32">
      {rows.map((r, i) => {
        const s = SOLUTIONS.find((x) => x.slug === r.slug)!;
        const flip = i % 2 === 1;
        return (
          <div key={r.slug} className="relative lg:flex lg:min-h-[600px] lg:items-center">
            {/* photo: runs off the left (or right) edge of the screen */}
            <div className={`lg:absolute lg:inset-y-0 lg:w-[60%] ${flip ? "lg:right-0" : "lg:left-0"}`}>
              <Photo
                k={r.image}
                className={`aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full ${flip ? "lg:rounded-l-[28px]" : "lg:rounded-r-[28px]"}`}
                sizes="(min-width:1080px) 60vw, 100vw"
              />
            </div>
            <div className="wrap relative z-10 -mt-14 lg:mt-0">
              <Reveal delay={0.1} className={`lg:w-[46%] ${flip ? "" : "lg:ml-auto"}`}>
                <div className="rounded-2xl bg-white p-7 shadow-[0_30px_80px_-35px_rgb(21_23_27/.3)] sm:rounded-[24px] sm:p-11">
                  <p className={eyebrow}>{s.title}</p>
                  <h3 className="mt-3 text-[clamp(1.9rem,2.8vw,2.6rem)] leading-[1.05] tracking-[-0.04em]">{r.name}</h3>
                  <p className="mt-4 text-[16.5px] leading-relaxed text-body">{s.intro}</p>
                  <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {s.features.slice(0, 4).map((f) => (
                      <li key={f.title} className="flex items-center gap-3 text-[15.5px]">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
                        {f.title}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/solutions/${s.slug}`} className="btn-signal mt-8">More details <Arrow /></Link>
                </div>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ── 4. Three promises in the three signal colours ── */
function Values() {
  const items = [
    {
      t: "Safer roads",
      d: "Conflict monitoring, pedestrian phases and a safe fallback on every junction.",
      c: "bg-stop",
      icon: <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Zm-3 9 2 2 4-4" />,
    },
    {
      t: "Faster journeys",
      d: "Timings that follow real demand, so green time goes where the queue is.",
      c: "bg-signal",
      icon: <path d="M12 21a8 8 0 1 0-8-8M12 13l4-4M4 13h2M12 5v2M18 13h2" />,
    },
    {
      t: "Smarter cities",
      d: "Every junction monitored and adjustable from one control room.",
      c: "bg-go",
      icon: <path d="M4 20V10l5-3v13M9 20V5l6-2v17M15 20V9l5 2v9M3 20h18" />,
    },
  ];
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="wrap">
        <Stagger className="grid gap-12 text-center sm:grid-cols-3 sm:gap-8">
          {items.map((v) => (
            <Item key={v.t} className="flex flex-col items-center">
              <span className={`flex h-20 w-20 items-center justify-center rounded-full ${v.c} text-white shadow-[0_18px_40px_-18px_rgb(21_23_27/.45)]`}>
                <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {v.icon}
                </svg>
              </span>
              <h3 className="mt-6 text-[24px] tracking-[-0.03em]">{v.t}</h3>
              <p className="mt-2 max-w-[300px] text-[16px] leading-relaxed text-body">{v.d}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── 5. Solar systems ── */
function SolarBand() {
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <SolarPoleScene className="block h-auto w-full max-w-[560px]" />
        </Reveal>
        <Reveal className="lg:col-span-6" delay={0.1}>
          <p className={eyebrow}>Solar signal systems</p>
          <h2 className="mt-4 text-title">
            No power at the junction? <span className="text-muted">Bring the sun.</span>
          </h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-body">
            Complete off-grid signal systems for three- and four-way junctions. Solar panels, batteries and a wireless controller on every pole, so the lights keep running whatever the grid is doing.
          </p>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {KITS.map((k) => (
              <li key={k.slug}>
                <Link href={`/solar#${k.slug}`} className="group flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3.5 text-[15px] transition-colors hover:bg-ink hover:text-white">
                  <span>{k.name}</span>
                  <span className="text-[13px] text-muted group-hover:text-white/60">{k.type}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8"><Link href="/solar" className="btn-signal">Explore solar systems <Arrow /></Link></div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 6. The rest of the range ── */
function MoreSolutions() {
  const rest = SOLUTIONS.filter((s) => !["signal-installation", "adaptive-control", "roadworks"].includes(s.slug));
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className={eyebrow}>Also from Notraffix</p>
            <h2 className="mt-4 text-title">
              Priority, monitoring <span className="text-muted">and parking.</span>
            </h2>
          </Reveal>
          <ArrowLink href="/solutions">All solutions</ArrowLink>
        </div>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {rest.map((s) => (
            <Item key={s.slug}>
              <Link href={`/solutions/${s.slug}`} className="group block">
                <Photo k={s.image} className="aspect-[4/3] rounded-2xl" sizes="(min-width:820px) 31vw, 100vw" />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[23px] tracking-[-0.035em]">{s.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-body">{s.short}</p>
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-signal group-hover:bg-signal">
                    <Arrow diagonal />
                  </span>
                </div>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── 7. Leadership ── */
function Leadership() {
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className={eyebrow}>Leadership</p>
            <h2 className="mt-4 text-title">
              Led by people who have <span className="text-muted">built and governed infrastructure.</span>
            </h2>
          </Reveal>
          <ArrowLink href="/about#leadership">Meet the team</ArrowLink>
        </div>
        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {TEAM.map((p) => (
            <Item key={p.slug}>
              <Link href="/about#leadership" className="group block">
                <div className="frame aspect-[4/5] rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={`Portrait of ${p.name}`} loading="lazy" decoding="async" />
                </div>
                <p className="mt-4 text-[17px] leading-tight tracking-[-0.02em]">{p.name}</p>
                <p className="mt-1 text-[13.5px] text-muted">{p.role}</p>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── 8. FAQ ── */
function Questions() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className={eyebrow}>Questions</p>
          <h2 className="mt-4 text-title">
            What clients <span className="text-muted">ask us first.</span>
          </h2>
          <p className="mt-6 max-w-[320px] text-[16px] text-body">
            Something else? <Link href="/enquiry" className="link-u text-ink">Send us an enquiry</Link>
          </p>
        </div>
        <div className="lg:col-span-8"><Faq items={FAQ} /></div>
      </div>
    </section>
  );
}
