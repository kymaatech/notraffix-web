import Link from "next/link";
import { Arrow, Photo } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <Photo k="signalRed" className="!absolute inset-0 -z-10" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      <div className="wrap pb-16">
        <p className="label">Page not found</p>
        <h1 className="mt-4 text-display">This road is closed. <span className="tone">Try another route.</span></h1>
        <Link href="/" className="btn-signal mt-9">Back to the home page <Arrow /></Link>
      </div>
    </section>
  );
}
