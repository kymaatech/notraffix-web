import Link from "next/link";
import type { Metadata } from "next";
import { SOLUTIONS } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Arrow, Photo } from "@/components/ui";
import { Closing } from "@/components/Closing";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Solutions", description: "Signal installation, adaptive control, bus and emergency priority, monitoring, roadworks signalling and parking guidance." };

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        image="signalMast"
        label="Solutions"
        a="Six ways we get"
        b="traffic moving again."
        text="Each one works on its own or alongside the others, from portable roadworks lights to adaptive control across a whole city."
      />
      <section className="py-20 sm:py-28">
        <div className="wrap space-y-5">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.slug}>
            <Link href={`/solutions/${s.slug}`} className="group grid overflow-hidden rounded-xl bg-white md:grid-cols-12">
              <Photo k={s.image} className={`aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-[340px] ${i % 2 ? "md:order-2" : ""}`} sizes="(min-width:820px) 42vw, 100vw" />
              <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 md:col-span-7">
                <div>
                  <h2 className="text-title">{s.title}</h2>
                  <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-body">{s.short}</p>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <ul className="flex flex-wrap gap-2">
                    {s.uses.map((u) => <li key={u} className="rounded-full bg-paper px-3.5 py-1.5 text-[14px] text-body">{u}</li>)}
                  </ul>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-signal group-hover:text-ink">
                    <Arrow diagonal className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
