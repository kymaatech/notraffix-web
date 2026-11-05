"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* Appears after the first screen. The ring fills with page progress. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="top"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/.5)] transition-colors hover:bg-signal hover:text-ink sm:bottom-8 sm:right-8"
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <circle cx="28" cy="28" r="26" fill="none" stroke="rgb(255 255 255 / .15)" strokeWidth="2" />
            <motion.circle cx="28" cy="28" r="26" fill="none" stroke="#F5A300" strokeWidth="2" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          <svg viewBox="0 0 20 20" className="relative h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden>
            <path d="M10 16V4M5 9l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
