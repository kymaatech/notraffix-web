"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE, tel } from "@/lib/site";
import { Logo } from "./Logo";
import { Arrow } from "./ui";

/* Floating pill nav (Falcon-style). Sits over the photo/video heroes,
   turns opaque once the page scrolls. */
export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const dark = path === "/";

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // hide while reading downwards, return on any upward scroll
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-out sm:px-5 sm:pt-4 ${hidden && !open ? "-translate-y-[120%]" : ""}`}
    >
      <div
        className={`mx-auto flex h-[60px] max-w-site items-center justify-between rounded-full pl-5 pr-2 transition-all duration-300 ${
          dark && !open
            ? `border border-white/10 backdrop-blur-xl ${scrolled ? "bg-night-2/90 shadow-[0_10px_40px_-12px_rgb(0_0_0/.8)]" : "bg-night-2/60"}`
            : scrolled || open
              ? "bg-white/95 shadow-[0_8px_30px_-12px_rgb(0_0_0/.25)] backdrop-blur-md"
              : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Logo light={dark && !open} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = path === n.href || path.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-[15px] transition-colors ${
                  dark ? (active ? "bg-white/10 text-white" : "text-white/70 hover:text-white") : active ? "bg-stone text-ink" : "text-body hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/enquiry" className={`${dark ? "btn-signal" : "btn-ink"} hidden !min-h-[44px] !px-5 sm:inline-flex`}>
            Make an enquiry <Arrow />
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`relative flex h-11 w-11 items-center justify-center rounded-full md:hidden ${dark && !open ? "bg-white/10" : "bg-stone"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`absolute h-[1.5px] w-4 transition ${dark && !open ? "bg-white" : "bg-ink"} ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute h-[1.5px] w-4 transition ${dark && !open ? "bg-white" : "bg-ink"} ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-3 bottom-3 top-[84px] flex flex-col rounded-2xl bg-white p-6 shadow-2xl md:hidden">
          {[...NAV, { href: "/enquiry", label: "Make an enquiry" }].map((n) => (
            <Link key={n.href} href={n.href} className="flex items-center justify-between border-b border-line py-5 text-[28px] tracking-[-0.03em]">
              {n.label} <Arrow className="h-5 w-5 text-muted" />
            </Link>
          ))}
          <div className="mt-auto text-[15px] text-body">
            <p>Call us, {SITE.hours}</p>
            <a href={tel(SITE.phone)} className="text-[20px] text-ink">{SITE.phone}</a>
          </div>
        </div>
      )}
    </header>
  );
}
