"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { KITS, kitsByType, type JunctionType } from "@/lib/solar";
import { JunctionPlan } from "./JunctionPlan";
import { Arrow } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function KitExplorer() {
  const [type, setType] = useState<JunctionType>("4-way");
  const [slug, setSlug] = useState("crossroad-standard");
  const [stage, setStage] = useState("");
  const kit = KITS.find((k) => k.slug === slug)!;
  const listRef = useRef<HTMLDivElement>(null);

  // keep the selected card visible in the horizontal list on small screens
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-kit="${slug}"]`);
    const list = listRef.current;
    if (el && list && list.scrollWidth > list.clientWidth) list.scrollTo({ left: el.offsetLeft - list.offsetLeft - 4, behavior: "smooth" });
  }, [slug]);

  // deep link: /solar#t-junction-compact
  useEffect(() => {
    const h = window.location.hash.slice(1);
    const k = KITS.find((x) => x.slug === h);
    if (k) { setType(k.type); setSlug(k.slug); }
  }, []);

  const pickType = (t: JunctionType) => {
    setType(t);
    setSlug(kitsByType(t)[0].slug);
  };
  const pick = (s: string) => {
    setSlug(s);
    history.replaceState(null, "", `#${s}`);
  };
  const onStage = useCallback((l: string) => setStage(l), []);

  return (
    <div>
      {/* junction type switch */}
      <div role="tablist" aria-label="Junction type" className="inline-flex rounded-full bg-white p-1 ring-1 ring-line">
        {(["4-way", "3-way"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={type === t}
            onClick={() => pickType(t)}
            className={`relative min-h-[44px] rounded-full px-6 text-[15px] transition-colors ${type === t ? "text-white" : "text-body hover:text-ink"}`}
          >
            {type === t && <motion.span layoutId="type-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.4, ease: EASE }} />}
            <span className="relative">{t === "4-way" ? "4-way crossroads" : "3-way T-junctions"}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-12">
        {/* kit list */}
        <div ref={listRef} className="flex snap-x gap-3 overflow-x-auto pb-2 no-scrollbar lg:col-span-3 lg:flex-col lg:overflow-visible lg:pb-0">
          {kitsByType(type).map((k) => {
            const on = k.slug === slug;
            return (
              <button
                key={k.slug}
                data-kit={k.slug}
                onClick={() => pick(k.slug)}
                aria-pressed={on}
                className={`min-w-[240px] snap-start rounded-xl p-5 text-left transition-colors lg:min-w-0 ${on ? "bg-ink text-white" : "bg-white text-ink hover:bg-stone"}`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-[18px] tracking-[-0.025em]">{k.name}</span>
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${on ? "bg-signal" : "bg-line"}`} />
                </span>
                <span className={`mt-2 block text-[14px] leading-snug ${on ? "text-white/65" : "text-body"}`}>{k.tagline}</span>
              </button>
            );
          })}
        </div>

        {/* plan */}
        <div className="relative overflow-hidden rounded-xl bg-[#1B1E23] lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div key={kit.slug} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
              <JunctionPlan type={kit.type} head={kit.head} pole={kit.pole} onStage={onStage} className="block h-auto w-full" />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 text-[13px]">
            <span className="rounded-full bg-ink/85 px-3 py-1.5 text-white backdrop-blur" aria-live="polite">{stage}</span>
            <span className="flex items-center gap-3 rounded-full bg-ink/85 px-3 py-1.5 text-white/75 backdrop-blur">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-3.5 rounded-[2px] bg-[#1F3B63] ring-1 ring-[#7FA7D9]" /> Solar pole</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-go" /> Pedestrian signal</span>
            </span>
          </div>
        </div>

        {/* details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={kit.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col rounded-xl bg-white p-6 sm:p-7 lg:col-span-4"
          >
            <p className="text-[14px] text-muted">{kit.type === "4-way" ? "4-way crossroad system" : "3-way T-junction system"}</p>
            <h3 className="mt-1 text-[28px] tracking-[-0.04em]">{kit.name}</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-body">{kit.summary}</p>
            <ul className="mt-5 space-y-2">
              {kit.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[15px]">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-go" aria-hidden><path d="M5 10.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-3 text-[14px]">
              <div className="rounded-lg bg-paper p-3"><p className="text-muted">Solar</p><p className="mt-0.5">{kit.power.panels}</p></div>
              <div className="rounded-lg bg-paper p-3"><p className="text-muted">Storage</p><p className="mt-0.5">{kit.power.batteries}</p></div>
            </div>
            <p className="mt-5 text-[14px] text-muted">Best for</p>
            <ul className="mt-2 flex flex-wrap gap-2">{kit.bestFor.map((b) => <li key={b} className="rounded-full bg-paper px-3 py-1.5 text-[13.5px]">{b}</li>)}</ul>
            <div className="mt-auto pt-7">
              <Link href={`/enquiry?service=solar-systems&kit=${kit.slug}`} className="btn-signal w-full">Request a quote for this system <Arrow /></Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bill of materials */}
      <AnimatePresence mode="wait">
        <motion.div key={kit.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-5 rounded-xl bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-[22px] tracking-[-0.03em]">What&apos;s in the {kit.name} system</h3>
            <p className="text-[14px] text-muted">Supplied, installed and commissioned by Notraffix</p>
          </div>
          <table className="mt-6 w-full text-left text-[15px]">
            <caption className="sr-only">Components in the {kit.name} system</caption>
            <thead>
              <tr className="border-b border-ink text-[13.5px] text-muted">
                <th scope="col" className="w-14 pb-3 font-normal">Qty</th>
                <th scope="col" className="pb-3 font-normal">Component</th>
                <th scope="col" className="hidden pb-3 font-normal sm:table-cell">Specification</th>
              </tr>
            </thead>
            <tbody>
              {kit.items.map((it) => (
                <tr key={it.name} className="border-b border-line">
                  <td className="py-3.5 tabular-nums text-ink">{it.qty}×</td>
                  <td className="py-3.5">
                    {it.name}
                    <span className="mt-0.5 block text-[13.5px] text-body sm:hidden">{it.spec}</span>
                  </td>
                  <td className="hidden py-3.5 text-body sm:table-cell">{it.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
