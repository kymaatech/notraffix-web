/* A week of timing plans, as the controller stores them:
   weekday, weekend and special-day schedules, each split into time bands. */

const PLANS = {
  night: { label: "Night flash", cls: "bg-signal/70" },
  off: { label: "Off-peak", cls: "bg-[#C9D6E8]" },
  am: { label: "Morning peak", cls: "bg-ink" },
  mid: { label: "Midday", cls: "bg-[#7FA7D9]" },
  pm: { label: "Evening peak", cls: "bg-[#3B4250]" },
  market: { label: "Market day", cls: "bg-go" },
} as const;
type P = keyof typeof PLANS;

// 24 one-hour bands per row
const row = (spec: [number, P][]): P[] => {
  const out: P[] = [];
  spec.forEach(([until, p], i) => {
    const from = i === 0 ? 0 : spec[i - 1][0];
    for (let h = from; h < until; h++) out.push(p);
  });
  return out;
};

const ROWS: { day: string; bands: P[] }[] = [
  { day: "Mon–Fri", bands: row([[5, "night"], [6, "off"], [10, "am"], [16, "mid"], [20, "pm"], [22, "off"], [24, "night"]]) },
  { day: "Saturday", bands: row([[6, "night"], [9, "off"], [18, "market"], [22, "off"], [24, "night"]]) },
  { day: "Sunday", bands: row([[7, "night"], [12, "off"], [15, "mid"], [21, "off"], [24, "night"]]) },
  { day: "Holiday", bands: row([[7, "night"], [22, "off"], [24, "night"]]) },
];

export function PlanWeek() {
  return (
    <figure className="rounded-xl bg-white p-6 sm:p-8">
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[560px]">
          <div className="ml-24 flex justify-between pb-2 text-[12.5px] text-muted">
            {["00", "06", "12", "18", "24"].map((h) => <span key={h}>{h}:00</span>)}
          </div>
          <div className="space-y-2">
            {ROWS.map((r) => (
              <div key={r.day} className="flex items-center gap-4">
                <span className="w-20 shrink-0 text-[14px] text-body">{r.day}</span>
                <div className="flex h-9 flex-1 gap-[2px] overflow-hidden rounded-md">
                  {r.bands.map((p, i) => <span key={i} title={`${String(i).padStart(2, "0")}:00 ${PLANS[p].label}`} className={`flex-1 ${PLANS[p].cls}`} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-body">
        {(Object.keys(PLANS) as P[]).map((p) => (
          <span key={p} className="flex items-center gap-2"><span className={`h-3 w-3 rounded-sm ${PLANS[p].cls}`} />{PLANS[p].label}</span>
        ))}
      </figcaption>
    </figure>
  );
}
