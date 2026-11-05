import Link from "next/link";
import type { Metadata } from "next";
import { Arrow, Photo, SectionTop, Tone } from "@/components/ui";
import { Item, Reveal, ScrollFill, Stagger } from "@/components/motion";
import { Closing } from "@/components/Closing";
import { KitExplorer } from "@/components/solar/KitExplorer";
import { PlanWeek } from "@/components/solar/PlanWeek";
import { ArrowHeadArt, BallHeadArt, ControllerArt, CountdownArt, PedArt, SolarPoleScene, TimerHeadArt } from "@/components/solar/Art";
import { COMPONENTS, CONTROLLER_FEATURES, KITS, SHARED_SPECS } from "@/lib/solar";

export const metadata: Metadata = {
  title: "Solar traffic signal systems",
  description: "Off-grid solar LED traffic signal systems for 3-way and 4-way junctions, with wireless controllers, countdown timers and pedestrian signals.",
};

const ART = { ball: BallHeadArt, arrow: ArrowHeadArt, timer: TimerHeadArt, countdown: CountdownArt, ped: PedArt, controller: ControllerArt };

const FLOW = [
  { t: "Solar panel", d: "100–150 Wp on every pole, angled to the sun.", icon: "M3 7h18v10H3zM9 7v10M15 7v10M3 12h18" },
  { t: "Charge controller", d: "Regulates charging and protects the batteries.", icon: "M5 5h14v14H5zM9 9h6v2H9zM9 13h6" },
  { t: "Battery bank", d: "Sealed batteries carry the junction through the night and cloudy days.", icon: "M6 7h12v12H6zM10 4h4v3h-4zM9 13h6M12 10v6" },
  { t: "Wireless controller", d: "Runs the timing plan and talks to every pole by radio.", icon: "M7 10h10v8H7zM9 10V6M15 10V6M4 6a8 8 0 0 1 16 0" },
  { t: "Signals", d: "Vehicle, countdown and pedestrian signals at 24 V DC.", icon: "M9 3h6v18H9zM12 7v0M12 12v0M12 17v0" },
];

export default function SolarPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="on-dark relative isolate overflow-hidden bg-ink pb-16 pt-28 text-white sm:pt-32 lg:min-h-[100svh] lg:pb-10">
        <div className="wrap grid items-center gap-12 lg:min-h-[calc(100svh-180px)] lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="hero-in label">Solar traffic signal systems</p>
            <h1 className="hero-in mt-5 text-display [animation-delay:.08s]">
              Signals that run on sunlight. <span className="tone">No grid, no generator, no cable across the road.</span>
            </h1>
            <p className="hero-in mt-7 max-w-[520px] text-lead text-white/70 [animation-delay:.16s]">
              Complete off-grid junction systems for three- and four-way junctions: LED signals, countdown timers, pedestrian crossings and a wireless controller, all powered by the sun.
            </p>
            <div className="hero-in mt-9 flex flex-wrap gap-3 [animation-delay:.24s]">
              <a href="#systems" className="btn-signal">Choose a system <Arrow /></a>
              <Link href="/enquiry?service=solar-systems" className="btn-glass">Request a quote</Link>
            </div>
            <dl className="hero-in mt-12 grid grid-cols-3 gap-4 border-t border-white/15 pt-6 [animation-delay:.32s]">
              {[["6", "ready-designed systems"], ["0", "grid connection needed"], ["24/7", "on battery and sun"]].map(([k, v]) => (
                <div key={v}>
                  <dt className="text-[32px] tracking-[-0.04em] text-white">{k}</dt>
                  <dd className="text-[14px] leading-snug text-white/55">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="hero-in lg:col-span-6 [animation-delay:.2s]">
            <SolarPoleScene className="mx-auto block h-auto w-full max-w-[560px] drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ── Why solar ── */}
      <section className="py-24 sm:py-32">
        <div className="wrap">
          <SectionTop label="Why solar">
            <ScrollFill
              className="text-display max-w-[1000px]"
              quietFrom={9}
              text="The junctions that need signals most often have the least reliable power. Our solar systems bring their own."
            />
          </SectionTop>
          <div className="mt-16 grid gap-5 lg:grid-cols-12">
            <Photo k="solarInstaller" className="aspect-[4/3] rounded-xl lg:col-span-7" sizes="(min-width:1080px) 58vw, 100vw" />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {[
                ["Keeps working through outages", "Every pole charges its own batteries, so a grid failure never turns the junction dark."],
                ["No trench across the road", "The controller reaches each pole by radio. Install with minimal digging and no lane closures for cabling."],
                ["Low running cost", "No electricity bills and no generator fuel. LEDs rated for 50,000+ hours."],
              ].map(([t, d]) => (
                <Item key={t} className="rounded-xl bg-white p-6">
                  <h3 className="text-[20px] tracking-[-0.025em]">{t}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-body">{d}</p>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── Systems explorer ── */}
      <section id="systems" className="scroll-mt-24 bg-stone py-24 sm:py-32">
        <div className="wrap">
          <SectionTop label="Choose a system">
            <Tone className="text-display max-w-[900px]" a={`${KITS.length} systems,`} b="designed around the junction you have." />
            <p className="mt-6 max-w-[560px] text-lead text-body">Pick a junction type, then a system. The plan shows where each pole goes and how the signals run.</p>
          </SectionTop>
          <div className="mt-14"><KitExplorer /></div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 sm:py-32">
        <div className="wrap">
          <SectionTop label="How it works">
            <Tone className="text-display max-w-[900px]" a="From sunlight to green light," b="on every pole." />
          </SectionTop>
          <div className="relative mt-16">
            <div className="absolute left-[10%] right-[10%] top-8 hidden h-[2px] overflow-hidden rounded bg-line lg:block">
              <div className="h-full w-full animate-[flow_3s_linear_infinite] bg-[linear-gradient(90deg,transparent_0,transparent_40%,#F5A300_50%,transparent_60%,transparent_100%)] bg-[length:50%_100%]" />
            </div>
            <Stagger as="ol" gap={0.1} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {FLOW.map((f, i) => (
                <Item as="li" key={f.t} className="relative">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-ink ring-1 ring-line">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={f.icon} /></svg>
                  </span>
                  <p className="mt-5 text-[14px] text-muted">Step {i + 1}</p>
                  <h3 className="mt-1 text-[21px] tracking-[-0.03em]">{f.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{f.d}</p>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── Controller ── */}
      <section className="on-dark bg-ink py-24 text-white sm:py-32">
        <div className="wrap">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="label">Wireless junction controller</p>
              <Tone className="mt-4 text-display" a="A different plan" b="for every hour of the week." />
              <p className="mt-6 max-w-[520px] text-lead text-white/65">
                The controller stores 18 timing plans and switches between them on a weekday, weekend and special-day schedule, each split into 24 time bands.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={0.1}>
              <div className="flex justify-center rounded-xl bg-white/[0.06] p-8"><ControllerArt /></div>
            </Reveal>
          </div>
          <Reveal className="mt-12"><PlanWeek /></Reveal>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {CONTROLLER_FEATURES.map((f) => (
              <Item key={f.title} className="bg-ink p-6">
                <h3 className="text-[18px] tracking-[-0.02em]">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{f.text}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Components ── */}
      <section className="py-24 sm:py-32">
        <div className="wrap">
          <SectionTop label="Components">
            <Tone className="text-display max-w-[900px]" a="Every part," b="specified for heat, dust and rain." />
          </SectionTop>
          <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMPONENTS.map((c) => {
              const A = ART[c.key];
              return (
                <Item key={c.key} className="flex flex-col overflow-hidden rounded-xl bg-white">
                  <div className="flex h-[260px] items-center justify-center bg-[#E9E6DF] p-6">
                    <div className="flex h-full items-center justify-center"><A /></div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[22px] tracking-[-0.03em]">{c.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{c.text}</p>
                    <dl className="mt-5 border-t border-line text-[14.5px]">
                      {c.specs.map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 border-b border-line py-2.5">
                          <dt className="text-body">{k}</dt>
                          <dd className="text-right">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Item>
              );
            })}
          </Stagger>

          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            <Photo k="solarPanels" className="aspect-[16/10] rounded-xl lg:col-span-7" sizes="(min-width:1080px) 58vw, 100vw" />
            <Reveal className="rounded-xl bg-white p-7 lg:col-span-5">
              <h3 className="text-[22px] tracking-[-0.03em]">Across every system</h3>
              <dl className="mt-5 border-t border-ink text-[15.5px]">
                {SHARED_SPECS.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line py-3">
                    <dt className="text-body">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[14px] leading-relaxed text-muted">Full datasheets and wiring diagrams are included with every quotation.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}
