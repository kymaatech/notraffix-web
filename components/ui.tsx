import Link from "next/link";
import { MEDIA, m, type MediaKey } from "@/lib/media";
import { ClipReveal, Reveal } from "./motion";

export function Arrow({ className = "h-4 w-4", diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      {diagonal ? (
        <path d="M6 14 14 6M7.5 6H14v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

/** Two-tone heading: first part in ink, second quieter. */
export function Tone({ a, b, as: Tag = "h2", className = "text-title" }: { a: string; b?: string; as?: "h1" | "h2" | "h3"; className?: string }) {
  return (
    <Tag className={className}>
      {a}
      {b && <> <span className="tone">{b}</span></>}
    </Tag>
  );
}

/** Local photo with a fixed frame (no layout shift) and a stone fallback. */
export function Photo({
  k,
  className = "",
  priority = false,
  sizes,
  reveal,
}: {
  k: MediaKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
}) {
  // In-flow photos open with a clip reveal; backgrounds and above-the-fold images don't.
  const animate = reveal ?? (!priority && !className.includes("absolute"));
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={m(k)} alt={MEDIA[k].alt} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : "auto"} sizes={sizes} />;
  return (
    <div className={`frame ${className}`}>
      {animate ? <ClipReveal className="absolute inset-0">{img}</ClipReveal> : img}
    </div>
  );
}

/** Muted looping background video with a poster; static poster under reduced motion. */
export function Film({ video, poster, className = "" }: { video: MediaKey; poster: MediaKey; className?: string }) {
  return (
    <div className={`frame ${className}`}>
      <video
        className="motion-reduce:hidden"
        src={m(video)}
        poster={m(poster)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={m(poster)} alt={MEDIA[poster].alt} className="hidden motion-reduce:block" />
    </div>
  );
}

export function SectionTop({ label, children, action, dark = false }: { label: string; children: React.ReactNode; action?: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 ${dark ? "on-dark" : ""}`}>
      <Reveal className="lg:col-span-3 lg:pt-3"><p className="label">{label}</p></Reveal>
      <Reveal className="lg:col-span-9" delay={0.08}>
        {children}
        {action && <div className="mt-8">{action}</div>}
      </Reveal>
    </div>
  );
}

export function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`link-u group/l text-[15px] ${dark ? "text-white" : "text-ink"}`}>
      {children}
      <Arrow className="h-4 w-4 transition-transform duration-200 group-hover/l:translate-x-0.5" />
    </Link>
  );
}
