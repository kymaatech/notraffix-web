import type { MediaKey } from "@/lib/media";
import { Photo } from "./ui";
import { Parallax } from "./motion";

/** Inner-page hero: a full-width photograph with the heading laid over its lower edge. */
export function PageHero({ image, label, a, b, text, children }: { image: MediaKey; label: string; a: string; b?: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="on-dark relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink text-white">
      <Parallax distance={8}><Photo k={image} priority className="h-full w-full" sizes="100vw" /></Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
      <div className="wrap pb-14 pt-36 sm:pb-16">
        <p className="hero-in label">{label}</p>
        <h1 className="hero-in mt-5 max-w-[1100px] text-display [animation-delay:.08s]">
          {a}
          {b && <> <span className="tone">{b}</span></>}
        </h1>
        {text && <p className="hero-in mt-7 max-w-[600px] text-lead text-white/75 [animation-delay:.16s]">{text}</p>}
        {children}
      </div>
    </section>
  );
}
