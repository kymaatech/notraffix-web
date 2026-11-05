import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SOLUTIONS, getSolution } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Closing } from "@/components/Closing";
import { Arrow, Photo, Tone } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSolution((await params).slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function SolutionPage({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const next = SOLUTIONS[(SOLUTIONS.indexOf(s) + 1) % SOLUTIONS.length];

  return (
    <>
      <PageHero image={s.image} label={s.title} a={s.heading[0]} b={s.heading[1]} text={s.short}>
        <div className="hero-in mt-9 flex flex-wrap gap-3 [animation-delay:.24s]">
          <Link href={`/enquiry?service=${s.slug}`} className="btn-signal">Ask about {s.title.toLowerCase()} <Arrow /></Link>
          <a href="#specs" className="btn-glass">Specifications</a>
        </div>
      </PageHero>

      <section className="py-24 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label">Overview</p>
            <p className="mt-5 text-[22px] leading-[1.45] tracking-[-0.02em] text-ink sm:text-[26px]">{s.intro}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <Photo k={s.gallery[0]} className="aspect-[3/4] rounded-xl" sizes="(min-width:1080px) 28vw, 50vw" />
            <Photo k={s.gallery[1]} className="mt-12 aspect-[3/4] rounded-xl" sizes="(min-width:1080px) 28vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="wrap">
          <Tone className="max-w-[760px] text-title" a="What's included." b="Every system is configured to the site." />
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {s.features.map((f) => (
              <div key={f.title} className="border-t border-ink pt-6">
                <h3 className="text-[22px] tracking-[-0.03em]">{f.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-body">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="scroll-mt-24 py-24 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Tone className="text-title" a="At a glance." b="Full datasheets on request." />
            <p className="mt-6 text-[14px] text-muted">Used for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.uses.map((u) => <li key={u} className="rounded-full bg-white px-4 py-2 text-[15px]">{u}</li>)}
            </ul>
          </div>
          <dl className="border-t border-ink lg:col-span-7">
            {s.specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-2 gap-6 border-b border-line py-5 text-[17px]">
                <dt className="text-body">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-5">
        <div className="wrap">
          <Link href={`/solutions/${next.slug}`} className="group grid items-center gap-6 overflow-hidden rounded-xl bg-white p-3 sm:grid-cols-12">
            <Photo k={next.image} className="aspect-[16/9] rounded-lg sm:col-span-4" sizes="33vw" />
            <div className="px-3 pb-3 sm:col-span-7 sm:p-0">
              <p className="text-[14px] text-muted">Next solution</p>
              <p className="mt-1 text-[32px] tracking-[-0.04em]">{next.title}</p>
            </div>
            <span className="hidden h-14 w-14 items-center justify-center justify-self-end rounded-full bg-ink text-white transition-colors group-hover:bg-signal group-hover:text-ink sm:col-span-1 sm:mr-4 sm:flex">
              <Arrow className="h-5 w-5" />
            </span>
          </Link>
        </div>
      </section>
      <Closing />
    </>
  );
}
