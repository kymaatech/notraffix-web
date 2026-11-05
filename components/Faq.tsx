"use client";

import { useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const on = open === i;
        const id = `faq-${i}`;
        return (
          <div key={it.q} className="border-b border-line">
            <h3>
              <button
                onClick={() => setOpen(on ? null : i)}
                className="flex min-h-[72px] w-full items-center justify-between gap-6 py-5 text-left"
                aria-expanded={on}
                aria-controls={id}
              >
                <span className="text-[20px] tracking-[-0.025em] sm:text-[22px]">{it.q}</span>
                <span className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${on ? "bg-ink text-white" : "bg-stone text-ink"}`}>
                  <span className="absolute h-[1.5px] w-3.5 bg-current" />
                  <span className={`absolute h-3.5 w-[1.5px] bg-current transition-transform duration-200 ${on ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <div id={id} hidden={!on} className="pb-7">
              <p className="max-w-[640px] text-[17px] leading-relaxed text-body">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
