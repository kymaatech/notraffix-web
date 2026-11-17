"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/enquiry";
import { Arrow } from "@/components/ui";

/* The hero's "search bar": pick a service, say where, go straight to a prefilled enquiry. */
export function HeroBar() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (service) q.set("service", service);
    if (location.trim()) q.set("location", location.trim());
    router.push(`/enquiry${q.size ? `?${q}` : ""}#form`);
  };

  return (
    <form
      onSubmit={go}
      aria-label="Start an enquiry"
      className="mx-auto grid w-full max-w-[860px] gap-2 rounded-[22px] border border-white/10 bg-night/75 p-2 shadow-[0_30px_80px_-30px_rgb(0_0_0/.8)] backdrop-blur-xl sm:grid-cols-[1.1fr_1fr_auto] sm:rounded-full"
    >
      <label className="relative flex min-h-[56px] items-center rounded-full px-5 transition-colors focus-within:bg-white/[0.06] hover:bg-white/[0.04]">
        <span className="sr-only">What do you need?</span>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent pr-8 text-[15px] text-white outline-none [&>option]:bg-night-2"
        >
          <option value="">What do you need?</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s.slug} value={s.slug}>{s.title}</option>
          ))}
        </select>
        <svg viewBox="0 0 20 20" className="pointer-events-none absolute right-5 h-4 w-4 text-white/50" aria-hidden>
          <path d="m5 8 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </label>
      <label className="flex min-h-[56px] items-center rounded-full px-5 transition-colors focus-within:bg-white/[0.06] hover:bg-white/[0.04] sm:border-l sm:border-white/10">
        <span className="sr-only">Where is the site?</span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or junction"
          className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/45"
        />
      </label>
      <button type="submit" className="btn-signal !min-h-[56px] !px-7">
        Start an enquiry <Arrow />
      </button>
    </form>
  );
}
