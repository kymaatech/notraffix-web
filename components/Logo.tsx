/** Notraffix wordmark: an N drawn as one continuous lane line, then the name. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${light ? "text-white" : "text-ink"}`}>
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden>
        <rect width="28" height="28" rx="8" fill={light ? "#FFFFFF" : "#15171B"} />
        <path d="M8.5 19.5v-11l11 11v-11" fill="none" stroke="#F5A300" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[18px] font-semibold tracking-[-0.03em]">Notraffix</span>
    </span>
  );
}
