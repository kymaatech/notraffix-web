import type { Metadata } from "next";
import { PROJECTS } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { Photo } from "@/components/ui";

export const metadata: Metadata = { title: "Projects", description: "Signal installation, adaptive control and roadworks signalling projects." };

export default function ProjectsPage() {
  return (
    <>
      <PageHero image="lagosBridge" label="Projects" a="Junctions, corridors" b="and the work around them." text="A selection of recent and current work." />
      <section className="py-20 sm:py-28">
        <div className="wrap space-y-20">
          {PROJECTS.map((p, i) => (
            <article key={p.name} className="grid items-center gap-10 lg:grid-cols-12">
              <Photo k={p.image} className={`aspect-[16/10] rounded-xl lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`} sizes="(min-width:1080px) 58vw, 100vw" />
              <div className="lg:col-span-5">
                <p className="label">{p.scope}</p>
                <h2 className="mt-3 text-title">{p.name}</h2>
                <p className="mt-5 text-[17px] leading-relaxed text-body">{p.summary}</p>
                <dl className="mt-8 grid grid-cols-3 border-t border-line pt-5">
                  {[["Location", p.place], ["Scale", p.scale], ["Year", p.year]].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[14px] text-muted">{k}</dt>
                      <dd className="mt-1 text-[17px]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
