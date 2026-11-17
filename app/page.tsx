import Link from "next/link";
import { Arrow, Film, Photo } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { Item, Parallax, Reveal, Stagger } from "@/components/motion";
import { FAQ, PROCESS, SOLUTIONS } from "@/lib/content";
import { Closing } from "@/components/Closing";
import { SolarPoleScene } from "@/components/solar/Art";
import { KITS } from "@/lib/solar";
import { TEAM } from "@/lib/team";
import { HeroBar } from "@/components/home/HeroBar";

/* Home: a dark, editorial page. Light-weight type with gold accents,
   imagery that fades into the ground, one action colour (signal amber). */
export default function Home() {
  return (
    <div className="on-dark bg-night text-white">
      <Hero />
      <Services />
      <Range />
      <Solar />
      <ControlRoom />
      <Process />
      <Leadership />
      <Questions />
      <Closing />
    </div>
  );
}

/** Centred two-weight heading: light words, then the gold part in semibold. */
function Heading({ a, b, sub, as: Tag = "h2" }: { a: string; b: string; sub?: string; as?: "h2" | "h3" }) {
  return (
    <Reveal className="mx-auto max-w-[880px] text-center">
      <Tag className="text-[clamp(2.25rem,4.4vw,3.9rem)] font-light leading-[1.05] tracking-[-0.035em]">
        {a} <span className="font-semibold text-gold">{b}</span>
      </Tag>
      {sub && <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-relaxed text-white/60">{sub}</p>}
    </Reveal>
  );
}

function Signal() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      <span className="h-1.5 w-1.5 rounded-full bg-stop" />
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      <span className="h-1.5 w-1.5 rounded-full bg-go" />
    </span>
  );
}

/* ── Hero: the statement, the film fading into the dark, and an enquiry bar ── */
function Hero() {
  const g = "font-normal text-gold";
  return (
    <section className="relative isolate flex min-h-[700px] flex-col overflow-hidden h-[100svh]">
      {/* film, vignetted on every side so it melts into the page */}
      <div
        className="absolute inset-x-0 bottom-0 top-[18%] -z-10 [mask-image:radial-gradient(ellipse_75%_78%_at_50%_58%,#000_40%,transparent_100%)]"
      >
        <Film video="heroVideo" poster="heroPoster" className="h-full w-full !bg-night" />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/35 to-night/60" />
      </div>

      <div className="wrap flex flex-1 flex-col items-center pb-10 pt-32 text-center sm:pt-36">
        <p className="hero-in flex items-center justify-center gap-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-white/70 sm:text-[13px] sm:tracking-[0.18em] [animation-delay:.05s]">
          <span className="hidden sm:inline-flex"><Signal /></span>
          <span className="text-balance">Traffic signal systems for African cities</span>
        </p>
        <h1 className="hero-in mt-7 max-w-[1120px] text-[clamp(2.3rem,5.4vw,5.1rem)] font-extralight leading-[1.04] tracking-[-0.04em] [animation-delay:.14s]">
          We design, install and run <span className={g}>traffic signals</span>, <span className={g}>adaptive control</span> and{" "}
          <span className={g}>road works signalling</span>.
        </h1>

        <div className="mt-auto w-full pt-10">
          <div className="hero-in [animation-delay:.3s]"><HeroBar /></div>
          <ul className="hero-in mt-6 hidden flex-wrap justify-center gap-x-8 gap-y-2 text-[14px] text-white/55 sm:flex [animation-delay:.42s]">
            <li>Survey to maintenance, one team</li>
            <li className="before:mr-8 before:text-white/25 before:content-['·']">Solar and battery backup</li>
            <li className="before:mr-8 before:text-white/25 before:content-['·']">Global partners, local delivery</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── The three services: photo with an overlapping card, alternating sides ── */
function Services() {
  const rows = [
    { s: SOLUTIONS[0], name: "Traffic signals" },
    { s: SOLUTIONS[1], name: "Adaptive control" },
    { s: SOLUTIONS[4], name: "Road works signalling" },
  ];
  return (
    <section className="py-24 sm:py-36">
      <div className="wrap">
        <Heading
          a="Built for"
          b="African cities"
          sub="Every junction is surveyed, installed and run by the same engineers, with hardware chosen for heat, dust, heavy rain and an unreliable grid."
        />
        <div className="mt-20 space-y-20 sm:mt-28 lg:space-y-32">
          {rows.map(({ s, name }, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={s.slug} className="grid items-center lg:grid-cols-12">
                <div className={`lg:row-start-1 lg:col-span-8 ${flip ? "lg:col-start-5" : "lg:col-start-1"}`}>
                  <Photo k={s.image} className="aspect-[16/11] rounded-2xl" sizes="(min-width:1080px) 66vw, 100vw" />
                </div>
                <Reveal
                  delay={0.12}
                  className={`relative z-10 -mt-16 mx-4 sm:mx-10 lg:mx-0 lg:mt-0 lg:row-start-1 lg:col-span-5 ${flip ? "lg:col-start-1" : "lg:col-start-8"}`}
                >
                  <div className="rounded-2xl border border-white/10 bg-night-2/95 p-8 shadow-[0_40px_90px_-40px_rgb(0_0_0/.9)] backdrop-blur-md sm:p-11">
                    <h3 className=" text-[clamp(1.9rem,3vw,2.6rem)] font-light leading-[1.05] tracking-[-0.035em]">{name}</h3>
                    <p className="mt-5 text-[16.5px] leading-relaxed text-white/65">{s.short}</p>
                    <ul className="mt-7 space-y-3 border-t border-white/10 pt-7">
                      {s.features.slice(0, 4).map((f) => (
                        <li key={f.title} className="flex items-center gap-3 text-[15.5px] text-white/85">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                          {f.title}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/solutions/${s.slug}`} className="btn-signal mt-9">More details <Arrow /></Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Full range as a bento of photo tiles ── */
function Range() {
  const span = ["", "lg:row-span-2", "col-span-2", "", "", ""];
  return (
    <section className="border-t border-white/[0.07] py-24 sm:py-32">
      <div className="wrap">
        <Heading a="Everything a junction needs," b="from pole to control room" sub="Six solutions, delivered on their own or together." />
        <Stagger className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-[270px_270px]">
          {SOLUTIONS.map((s, i) => (
            <Item key={s.slug} className={`${span[i]} min-h-[220px]`}>
              <Link href={`/solutions/${s.slug}`} className="group relative block h-full min-h-[220px] overflow-hidden rounded-2xl">
                <Photo k={[0, 1, 4].includes(i) ? s.gallery[0] : s.image} className="absolute inset-0 h-full w-full" sizes="(min-width:1080px) 40vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <Arrow diagonal />
                </span>
                <span className="absolute inset-x-5 bottom-5">
                  <span className="block text-[19px] font-medium tracking-[-0.02em] sm:text-[21px]">{s.title}</span>
                  <span className="mt-1 hidden max-w-[360px] text-[14px] leading-snug text-white/60 sm:block">{s.short.split(":")[0]}</span>
                </span>
              </Link>
            </Item>
          ))}
        </Stagger>
        <div className="mt-12 text-center">
          <Link href="/solutions" className="btn-glass">All solutions <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

/* ── Solar systems ── */
function Solar() {
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="rounded-[28px] border border-white/10 bg-night-2 p-3">
            <SolarPoleScene className="block h-auto w-full" />
          </div>
        </Reveal>
        <Reveal className="lg:col-span-6" delay={0.1}>
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-white/45">Solar signal systems</p>
          <h2 className="mt-5 text-[clamp(2.25rem,4.2vw,3.6rem)] font-light leading-[1.05] tracking-[-0.035em]">
            No power at the junction? <span className="font-semibold text-gold">Bring the sun.</span>
          </h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/60">
            Complete off-grid signal systems for three- and four-way junctions. Solar panels, batteries and a wireless controller on every pole, so the lights keep running whatever the grid is doing.
          </p>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {KITS.map((k) => (
              <li key={k.slug}>
                <Link
                  href={`/solar#${k.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] transition-colors hover:border-gold/50 hover:bg-white/[0.06]"
                >
                  <span>{k.name}</span>
                  <span className="text-[13px] text-white/45">{k.type}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-9"><Link href="/solar" className="btn-signal">Explore solar systems <Arrow /></Link></div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Control room film ── */
function ControlRoom() {
  return (
    <section className="relative isolate overflow-hidden">
      <Parallax>
        <Film video="controlVideo" poster="controlPoster" className="h-full w-full" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/70 to-night/20" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-night to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-night to-transparent" />
      <div className="wrap flex min-h-[760px] flex-col justify-center py-28">
        <Reveal className="max-w-[640px]">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-white/50">Monitoring and control</p>
          <h2 className="mt-5 text-[clamp(2.25rem,4.4vw,3.9rem)] font-light leading-[1.05] tracking-[-0.035em]">
            One control room <span className="font-semibold text-gold">for every junction you own.</span>
          </h2>
          <p className="mt-7 max-w-[520px] text-[17px] leading-relaxed text-white/65">
            Phase state, queues and faults for the whole network on one screen. Engineers re-time a corridor or push an incident plan in seconds, without a site visit.
          </p>
          <div className="mt-9"><Link href="/solutions/monitoring" className="btn-light">How monitoring works <Arrow /></Link></div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── How a project runs ── */
function Process() {
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap">
        <Heading a="From the first count" b="to years of operation" />
        <Stagger as="ol" gap={0.1} className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Item as="li" key={p.title} className="rounded-2xl border border-white/10 bg-night-2 p-3">
              <Photo k={p.image} className="aspect-[4/3] rounded-xl" sizes="(min-width:1080px) 23vw, 45vw" />
              <div className="px-3 pb-4 pt-6">
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-gold">Step {i + 1}</p>
                <h3 className="mt-2 text-[24px] font-light tracking-[-0.03em]">{p.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-white/60">{p.text}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── Leadership ── */
function Leadership() {
  return (
    <section className="border-t border-white/[0.07] py-24 sm:py-32">
      <div className="wrap">
        <Heading a="Led by people who have" b="built and governed infrastructure" />
        <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {TEAM.map((p) => (
            <Item key={p.slug}>
              <Link href="/about#leadership" className="group block text-center">
                <div className="frame aspect-[4/5] rounded-2xl !bg-night-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={`Portrait of ${p.name}`} loading="lazy" decoding="async" className="lg:grayscale lg:transition-[filter,transform] lg:duration-700 lg:group-hover:grayscale-0" />
                </div>
                <p className="mt-4 text-[17px] leading-tight tracking-[-0.02em]">{p.name}</p>
                <p className="mt-1 text-[13.5px] text-white/50">{p.role}</p>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function Questions() {
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-[clamp(2rem,3.4vw,3rem)] font-light leading-[1.05] tracking-[-0.035em]">
            What clients <span className="font-semibold text-gold">ask us first</span>
          </h2>
          <p className="mt-6 max-w-[320px] text-[16px] text-white/60">
            Something else? <Link href="/enquiry" className="link-u text-white">Send us an enquiry</Link>
          </p>
        </div>
        <div className="lg:col-span-8"><Faq items={FAQ} dark /></div>
      </div>
    </section>
  );
}
