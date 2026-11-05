"use client";

/* Motion primitives. One easing curve for the whole site, transform/opacity only,
   everything plays once, and MotionConfig (in Providers) honours reduced motion. */

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
const VIEW = { once: true, amount: 0.25 } as const;

/** Fade and rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" }) {
  const C = motion[as];
  return (
    <C className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </C>
  );
}

/** Container whose <Item> children enter one after another. */
export function Stagger({ children, className = "", gap = 0.07, as = "div" }: { children: React.ReactNode; className?: string; gap?: number; as?: "div" | "ol" | "ul" | "dl" }) {
  const C = motion[as];
  return (
    <C className={className} initial="hide" whileInView="show" viewport={{ once: true, amount: 0.12 }} transition={{ staggerChildren: gap }}>
      {children}
    </C>
  );
}
export function Item({ children, className = "", as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" }) {
  const C = motion[as];
  return (
    <C className={className} variants={{ hide: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}>
      {children}
    </C>
  );
}

/** Photo reveal: the frame opens upward while the image settles from a slight zoom. */
export function ClipReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.div className="h-full w-full" initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.5, ease: EASE }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Background media that drifts slower than the page. Wrap the absolutely-positioned media. */
export function Parallax({ children, className = "", distance = 10 }: { children: React.ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`]);
  return (
    <div ref={ref} className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-12%_0]" style={{ y: reduce ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Statement whose words fill from quiet to ink as it scrolls through the viewport. */
export function ScrollFill({ text, quietFrom = 0, className = "" }: { text: string; quietFrom?: number; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce} keepQuiet={quietFrom > 0 && i >= quietFrom}>
          {w}
        </Word>
      ))}
    </p>
  );
}
function Word({ children, progress, range, still, keepQuiet }: { children: string; progress: MotionValue<number>; range: [number, number]; still: boolean; keepQuiet: boolean }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity: still ? 1 : opacity }} className={keepQuiet ? "text-muted" : ""}>
      {children}{" "}
    </motion.span>
  );
}

/** Hero scroll-away: media zooms in slightly while the copy lifts and fades. */
export function HeroScroll({ media, children }: { media: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <div ref={ref} className="relative flex flex-1 flex-col">
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { scale }}>
        {media}
      </motion.div>
      <motion.div className="flex flex-1 flex-col" style={reduce ? undefined : { y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Slow ticker. Duplicated track so the loop is seamless; pauses on hover. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const track = (
    <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {items.map((t) => (
        <span key={t} className="flex items-center gap-10 whitespace-nowrap">
          {t}
          <span className="h-2.5 w-2.5 rounded-full bg-signal" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <p className="sr-only">{items.join(", ")}</p>
      <div className="flex animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track}
        {track}
      </div>
    </div>
  );
}

/** A line that draws itself across when scrolled into view. */
export function DrawLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}
