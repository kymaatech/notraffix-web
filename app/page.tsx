import Link from "next/link";
import { Arrow, ArrowLink, Film, Photo, SectionTop, Tone } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { FAQ, PROCESS, PROJECTS, SOLUTIONS } from "@/lib/content";
import { Closing } from "@/components/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Solutions />
      <ControlRoom />
      <Spotlight />
      <Process />
      <Projects />
      <Questions />
      <Closing />
    </>
  );
}

/* ── 1. Hero: full-screen aerial film, the pitch and the action on one screen ── */
function Hero() {
  const quick = [SOLUTIONS[0], SOLUTIONS[1], SOLUTIONS[4]];
  return (
    <section className="on-dark relative isolate flex min-h-[640px] flex-col overflow-hidden bg-ink text-white h-[100svh]">
      <Film video="heroVideo" poster="heroPoster" className="!absolute inset-0 -z-10 !bg-ink" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/50 to-transparent" />

      <div className="wrap flex flex-1 flex-col justify-end pb-8 pt-28 sm:pb-10">
        <p className="hero-in text-[15px] text-white/75 [animation-delay:.05s]">Traffic signal systems for Nigerian cities</p>
        <h1 className="mt-5 text-hero">
          <span className="hero-in block [animation-delay:.12s]">Junctions that keep</span>
          <span className="hero-in block text-white/55 [animation-delay:.2s]">the city moving.</span>
        </h1>
        <div className="mt-9 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="hero-in max-w-[560px] text-lead text-white/75 [animation-delay:.3s]">
              We design, install and run traffic signals, adaptive control and roadworks signalling for road authorities, contractors and campuses.
            </p>
            <div className="hero-in mt-8 flex flex-wrap gap-3 [animation-delay:.38s]">
              <Link href="/enquiry" className="btn-signal">Request a site survey <Arrow /></Link>
              <Link href="/solutions" className="btn-glass">See our solutions</Link>
            </div>
          </div>

          <nav aria-label="Popular solutions" className="hero-in hidden rounded-xl border border-white/15 bg-white/[0.08] p-2 backdrop-blur-md lg:col-span-5 lg:block [animation-delay:.45s]">
            {quick.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="group flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white/10">
                <Photo k={s.image} className="h-14 w-[72px] shrink-0 rounded-md" />
                <span className="flex-1">
                  <span className="block text-[16px] text-white">{s.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-white/60">{s.short.split(":")[0].split(",")[0]}</span>
                </span>
                <Arrow className="h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </nav>
        </div>

        <dl className="hero-in mt-8 hidden grid-cols-1 gap-4 sm:grid border-t border-white/15 pt-6 text-[15px] sm:grid-cols-3 [animation-delay:.5s]">
          {[
            ["Survey to maintenance", "One team from the first count to years of operation"],
            ["Built for the grid we have", "Battery and solar backup on every controller"],
            ["24/7 fault line", "Engineers dispatched the moment a junction reports a fault"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <dt className="text-white">{k}</dt>
              <dd className="text-white/55">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── 2. Statement + people at work ── */
function Intro() {
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap">
        <SectionTop label="Why Notraffix">
          <Tone
            className="text-display max-w-[1000px]"
            a="Most congestion isn't a road problem."
            b="It's a timing problem. We fix it junction by junction, with signals that respond to the traffic actually there."
          />
        </SectionTop>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <Photo k="engineer" className="aspect-[4/5] rounded-xl lg:col-span-5" sizes="(min-width:1080px) 40vw, 100vw" />
          <div className="flex flex-col gap-5 lg:col-span-7">
            <Photo k="signalSky" className="aspect-[16/10] rounded-xl" sizes="(min-width:1080px) 55vw, 100vw" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-7">
                <h3 className="text-[22px] tracking-[-0.03em]">Hardware that suits the climate</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body">Controllers, heads and cabinets specified for heat, dust and heavy rain, with backup power on every junction.</p>
              </div>
              <div className="rounded-xl bg-white p-7">
                <h3 className="text-[22px] tracking-[-0.03em]">Engineers who stay on</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body">The team that surveys and installs your junctions also monitors and maintains them afterwards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Solutions: photo cards ── */
function Solutions() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="wrap">
        <SectionTop label="Solutions" action={<ArrowLink href="/solutions">All solutions</ArrowLink>}>
          <Tone className="text-display max-w-[900px]" a="Everything a junction needs," b="from the pole to the control room." />
        </SectionTop>
        <div className="mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="group block">
              <Photo k={s.image} className="aspect-[4/3] rounded-xl" sizes="(min-width:1080px) 30vw, (min-width:640px) 45vw, 100vw" />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[24px] tracking-[-0.035em]">{s.title}</h3>
                  <p className="mt-2 max-w-[380px] text-[16px] leading-relaxed text-body">{s.short}</p>
                </div>
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <Arrow diagonal />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Full-bleed control-room film ── */
function ControlRoom() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <Film video="controlVideo" poster="controlPoster" className="!absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
      <div className="wrap flex min-h-[760px] flex-col justify-between py-24 sm:py-28">
        <div className="max-w-[720px]">
          <p className="label">Monitoring and control</p>
          <Tone className="mt-5 text-display" a="One control room" b="for every junction you own." />
          <p className="mt-7 max-w-[520px] text-lead text-white/70">
            Phase state, queues and faults for the whole network on one screen. Engineers can re-time a corridor or push an incident plan in seconds, without a site visit.
          </p>
          <div className="mt-9"><Link href="/solutions/monitoring" className="btn-light">How monitoring works <Arrow /></Link></div>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/15 sm:grid-cols-3">
          {[
            ["Faults raised in seconds", "Lamp, controller and power faults alert our team day and night."],
            ["Plans pushed remotely", "Timing plans are scheduled, changed and rolled back from the console."],
            ["Data you can use", "Counts, delays and incidents in monthly reports and an open API."],
          ].map(([t, d]) => (
            <div key={t} className="bg-ink/70 p-6 backdrop-blur-md">
              <h3 className="text-[19px] tracking-[-0.02em]">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Spotlight: adaptive control + roadworks, alternating splits ── */
function Spotlight() {
  const items = [SOLUTIONS[1], SOLUTIONS[4]];
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap space-y-24 sm:space-y-32">
        {items.map((s, i) => (
          <div key={s.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className={`grid grid-cols-5 gap-4 lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
              <Photo k={s.image} className="col-span-3 aspect-[3/4] rounded-xl" sizes="(min-width:1080px) 35vw, 60vw" />
              <div className="col-span-2 flex flex-col gap-4">
                <Photo k={s.gallery[0]} className="aspect-square rounded-xl" sizes="25vw" />
                <Photo k={s.gallery[1]} className="flex-1 rounded-xl" sizes="25vw" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="label">{s.title}</p>
              <Tone className="mt-4 text-title" a={s.heading[0]} b={s.heading[1]} />
              <p className="mt-6 text-[17px] leading-relaxed text-body">{s.intro}</p>
              <dl className="mt-8 border-t border-line">
                {s.specs.slice(0, 4).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-line py-3.5 text-[15.5px]">
                    <dt className="text-body">{k}</dt>
                    <dd className="text-right text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8"><ArrowLink href={`/solutions/${s.slug}`}>Read more about {s.title.toLowerCase()}</ArrowLink></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 6. Process: a real sequence, so it's numbered ── */
function Process() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="wrap">
        <SectionTop label="How a project runs">
          <Tone className="text-display max-w-[900px]" a="From the first count" b="to years of monitored operation." />
        </SectionTop>
        <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="flex flex-col">
              <Photo k={p.image} className="aspect-[4/3] rounded-xl" sizes="(min-width:1080px) 23vw, 45vw" />
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-[15px] text-muted">Step {i + 1}</span>
              </div>
              <h3 className="mt-1 text-[26px] tracking-[-0.035em]">{p.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-body">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 7. Projects ── */
function Projects() {
  const [a, ...rest] = PROJECTS;
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap">
        <SectionTop label="Projects" action={<ArrowLink href="/projects">All projects</ArrowLink>}>
          <Tone className="text-display max-w-[900px]" a="Work on" b="the roads you drive." />
        </SectionTop>
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <Link href="/projects" className="group relative block overflow-hidden rounded-xl lg:col-span-7">
            <Photo k={a.image} className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]" sizes="(min-width:1080px) 58vw, 100vw" />
            <div className="on-dark absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-7 pt-24 text-white">
              <p className="label">{a.scope}, {a.place}</p>
              <h3 className="mt-2 text-[30px] tracking-[-0.035em]">{a.name}</h3>
              <p className="mt-2 max-w-[460px] text-[15.5px] text-white/70">{a.summary}</p>
            </div>
          </Link>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((p) => (
              <Link key={p.name} href="/projects" className="group grid grid-cols-5 gap-5 rounded-xl bg-white p-3">
                <Photo k={p.image} className="col-span-2 aspect-square rounded-lg" sizes="20vw" />
                <div className="col-span-3 flex flex-col justify-between py-2 pr-2">
                  <div>
                    <p className="text-[14px] text-muted">{p.scope}</p>
                    <h3 className="mt-1 text-[21px] leading-tight tracking-[-0.03em]">{p.name}</h3>
                  </div>
                  <p className="text-[14.5px] text-body">{p.place}, {p.scale}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
          <p className="label">Questions</p>
          <Tone className="mt-4 text-title" a="What clients" b="ask us first." />
          <p className="mt-6 max-w-[320px] text-[16px] text-body">
            Something else? <Link href="/enquiry" className="link-u text-ink">Send us an enquiry</Link>
          </p>
        </div>
        <div className="lg:col-span-8"><Faq items={FAQ} /></div>
      </div>
    </section>
  );
}
