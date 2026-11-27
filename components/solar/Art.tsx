"use client";

import { useEffect, useState } from "react";

/* Hand-drawn product illustrations (no supplier photos or marks). */

const COL = { stop: "#E5483B", caution: "#F5A300", go: "#2FB36B", off: "#24282F" };

function useTick(ms: number, n: number) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const i = setInterval(() => setT((x) => (x + 1) % n), ms);
    return () => clearInterval(i);
  }, [ms, n]);
  return t;
}

/** LED dot texture inside an aspect. */
function Leds({ cx, cy, r, color, lit }: { cx: number; cy: number; r: number; color: string; lit: boolean }) {
  const dots = [];
  for (let y = -r + 3; y <= r - 3; y += 5) for (let x = -r + 3; x <= r - 3; x += 5) if (x * x + y * y < (r - 3) ** 2) dots.push([cx + x, cy + y]);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={lit ? color : COL.off} opacity={lit ? 0.25 : 1} />
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.5" fill={lit ? color : "#2E333B"} />)}
      {lit && <circle cx={cx} cy={cy} r={r + 14} fill={color} opacity=".1" />}
    </g>
  );
}

function Housing({ h, children }: { h: number; children: React.ReactNode }) {
  return (
    <g>
      <rect x="20" y="10" width="80" height={h} rx="16" fill="#111418" stroke="rgb(255 255 255 / .18)" />
      {children}
    </g>
  );
}

export function BallHeadArt() {
  const t = useTick(1100, 6);
  const s = t < 3 ? "go" : t < 4 ? "caution" : "stop";
  return (
    <svg viewBox="0 0 120 260" className="h-full w-auto" aria-hidden>
      <Housing h={240}>
        <Leds cx={60} cy={55} r={30} color={COL.stop} lit={s === "stop"} />
        <Leds cx={60} cy={130} r={30} color={COL.caution} lit={s === "caution"} />
        <Leds cx={60} cy={205} r={30} color={COL.go} lit={s === "go"} />
      </Housing>
    </svg>
  );
}

export function ArrowHeadArt() {
  const t = useTick(1100, 6);
  const s = t < 3 ? "go" : t < 4 ? "caution" : "stop";
  const arrow = (cy: number, c: string, lit: boolean) => (
    <g>
      <circle cx="60" cy={cy} r="30" fill={COL.off} />
      {lit && <circle cx="60" cy={cy} r="44" fill={c} opacity=".1" />}
      <path d={`M76 ${cy}H44m12 -13L43 ${cy}l13 13`} stroke={lit ? c : "#3A3F47"} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
  return (
    <svg viewBox="0 0 120 260" className="h-full w-auto" aria-hidden>
      <Housing h={240}>
        {arrow(55, COL.stop, s === "stop")}
        {arrow(130, COL.caution, s === "caution")}
        {arrow(205, COL.go, s === "go")}
      </Housing>
    </svg>
  );
}

export function TimerHeadArt() {
  const t = useTick(1000, 16);
  const green = t < 10;
  const n = green ? 10 - t : 16 - t;
  return (
    <svg viewBox="0 0 120 260" className="h-full w-auto" aria-hidden>
      <Housing h={240}>
        <Leds cx={60} cy={55} r={30} color={COL.stop} lit={!green} />
        <rect x="32" y="102" width="56" height="56" rx="8" fill={COL.off} />
        <text x="60" y="143" textAnchor="middle" fill={green ? COL.go : COL.stop} style={{ font: "700 34px ui-monospace, monospace" }}>{String(n).padStart(2, "0")}</text>
        <Leds cx={60} cy={205} r={30} color={COL.go} lit={green} />
      </Housing>
    </svg>
  );
}

export function CountdownArt() {
  const t = useTick(1000, 30);
  const n = 30 - t;
  const c = n > 8 ? COL.go : COL.stop;
  return (
    <svg viewBox="0 0 200 160" className="h-auto w-full max-w-[220px]" aria-hidden>
      <rect x="10" y="10" width="180" height="140" rx="14" fill="#111418" stroke="rgb(255 255 255 / .18)" />
      <rect x="24" y="24" width="152" height="112" rx="8" fill={COL.off} />
      <text x="100" y="114" textAnchor="middle" fill={c} style={{ font: "700 86px ui-monospace, monospace", letterSpacing: "-4px" }}>{String(n).padStart(2, "0")}</text>
    </svg>
  );
}

export function PedArt() {
  const t = useTick(1200, 6);
  const walk = t < 3;
  return (
    <svg viewBox="0 0 120 230" className="h-full w-auto" aria-hidden>
      <rect x="20" y="10" width="80" height="210" rx="12" fill="#111418" stroke="rgb(255 255 255 / .18)" />
      <rect x="30" y="20" width="60" height="90" rx="6" fill={COL.off} />
      <rect x="30" y="120" width="60" height="90" rx="6" fill={COL.off} />
      {/* standing figure */}
      <g fill={walk ? "#3A3F47" : COL.stop} transform="translate(60 34)">
        <circle cx="0" cy="6" r="7" />
        <path d="M-10 16h20l2 30h-6l-2 24h-8l-2-24h-6z" />
      </g>
      {/* walking figure */}
      <g fill="none" stroke={walk ? COL.go : "#3A3F47"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" transform="translate(60 134)">
        <circle cx="2" cy="6" r="5" fill={walk ? COL.go : "#3A3F47"} stroke="none" />
        <path d="M0 16l-3 26M-3 42l-10 20M-3 42l12 20M0 22l-14 12M0 22l14 8" />
      </g>
    </svg>
  );
}

export function ControllerArt() {
  const t = useTick(700, 3);
  const slave = (x: number, y: number) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="64" height="44" rx="6" fill="#C9CDD3" stroke="#8D939B" />
      {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={8 + i * 9} y="8" width="3" height="28" fill="#A7ADB5" />)}
      <line x1="48" y1="0" x2="48" y2="-18" stroke="#2A2E35" strokeWidth="2.5" />
      <circle cx="48" cy="-20" r="3" fill="#2A2E35" />
    </g>
  );
  return (
    <svg viewBox="0 0 260 200" className="h-auto w-full max-w-[300px]" aria-hidden>
      {/* master */}
      <g transform="translate(80 20)">
        <rect width="100" height="56" rx="6" fill="#15171B" stroke="rgb(255 255 255 / .2)" />
        <rect x="10" y="12" width="36" height="22" rx="2" fill="#24282F" />
        {[0, 1, 2].map((i) => <circle key={i} cx={60 + i * 12} cy="22" r="3.5" fill={[COL.stop, COL.caution, COL.go][i]} opacity={t === i ? 1 : 0.35} />)}
        <line x1="10" y1="0" x2="4" y2="-16" stroke="#2A2E35" strokeWidth="2.5" />
        <line x1="90" y1="0" x2="96" y2="-16" stroke="#2A2E35" strokeWidth="2.5" />
      </g>
      {/* radio arcs */}
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${90 - k * 14} ${96 + k * 10} q40 ${18 + k * 6} 80 0`} fill="none" stroke={COL.caution} strokeOpacity={t === k ? 0.9 : 0.25} strokeWidth="2" strokeDasharray="4 4" />
      ))}
      {slave(20, 140)}
      {slave(98, 150)}
      {slave(176, 140)}
    </svg>
  );
}

/** Hero scene: a compact solar signal pole that cycles through day and night. */
export function SolarPoleScene({ className = "" }: { className?: string }) {
  const t = useTick(120, 400); // 48 s loop
  const phase = t / 400; // 0..1
  const day = phase < 0.55;
  // sun / moon arc
  const ang = Math.PI * (day ? phase / 0.55 : (phase - 0.55) / 0.45);
  const bx = 70 + 380 * (1 - Math.cos(ang)) * 0.5 * 1.0;
  const by = 300 - Math.sin(ang) * 230;
  const charge = day ? 40 + 60 * (phase / 0.55) : 100 - 40 * ((phase - 0.55) / 0.45);
  const sig = t % 50 < 22 ? "go" : t % 50 < 28 ? "caution" : "stop";
  const sky = day ? ["#E9E4D8", "#F6F3EC"] : ["#0E1320", "#1A2233"];
  return (
    <svg viewBox="0 0 520 560" className={className} role="img" aria-label="Illustration of a solar-powered traffic signal pole charging by day and running on battery at night">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} style={{ transition: "stop-color 2s" }} />
          <stop offset="1" stopColor={sky[1]} style={{ transition: "stop-color 2s" }} />
        </linearGradient>
        <radialGradient id="sunglow"><stop offset="0" stopColor="#F5A300" stopOpacity=".45" /><stop offset="1" stopColor="#F5A300" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="520" height="560" rx="28" fill="url(#sky)" />
      {/* sun or moon */}
      {day ? (
        <g>
          <circle cx={bx} cy={by} r="70" fill="url(#sunglow)" />
          <circle cx={bx} cy={by} r="22" fill="#F5A300" />
          {/* rays towards panel */}
          <line x1={bx} y1={by} x2="318" y2="96" stroke="#F5A300" strokeWidth="2" strokeDasharray="5 7" opacity=".7">
            <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
          </line>
        </g>
      ) : (
        <g>
          <circle cx={bx} cy={by} r="18" fill="#E7E4DD" />
          <circle cx={bx + 8} cy={by - 5} r="16" fill={sky[0]} />
          {[[60, 60], [150, 110], [420, 70], [470, 160], [250, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="#fff" opacity=".7" />)}
        </g>
      )}
      {/* ground */}
      <rect x="0" y="470" width="520" height="90" rx="0" fill={day ? "#D9D5CC" : "#141821"} />
      <rect x="0" y="500" width="520" height="60" fill={day ? "#3A3F47" : "#23272E"} />
      <line x1="0" y1="530" x2="520" y2="530" stroke="#F2F0EB" strokeWidth="3" strokeDasharray="26 18" opacity=".6" />

      {/* pole */}
      <rect x="292" y="110" width="14" height="362" fill="#9AA0A8" />
      <rect x="280" y="466" width="38" height="10" rx="2" fill="#7B828B" />
      {/* solar panel */}
      <g transform="translate(250 64) rotate(-14)">
        <rect width="120" height="56" rx="4" fill="#1F3B63" stroke="#7FA7D9" strokeWidth="1.5" />
        <path d="M30 0v56M60 0v56M90 0v56M0 18.6h120M0 37.3h120" stroke="#7FA7D9" strokeOpacity=".6" />
      </g>
      {/* cabinet with battery meter */}
      <g transform="translate(312 300)">
        <rect width="66" height="88" rx="6" fill={day ? "#C9C4B8" : "#2E333B"} stroke="rgb(0 0 0 / .15)" />
        <rect x="14" y="20" width="38" height="56" rx="4" fill="#15171B" />
        <rect x="27" y="14" width="12" height="6" rx="1" fill="#15171B" />
        <rect x="19" y={25 + (46 * (100 - charge)) / 100} width="28" height={(46 * charge) / 100} rx="2" fill={charge > 50 ? "#2FB36B" : "#F5A300"} />
      </g>
      {/* energy flow line */}
      <path d={day ? "M320 120 C 360 180, 360 240, 345 300" : "M330 300 C 280 260, 250 240, 236 214"} fill="none" stroke={day ? "#F5A300" : "#2FB36B"} strokeWidth="3" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      {/* arm + head */}
      <rect x="120" y="190" width="180" height="8" rx="4" fill="#9AA0A8" />
      <g transform="translate(176 150)">
        <rect width="46" height="122" rx="10" fill="#111418" />
        {(["stop", "caution", "go"] as const).map((k, i) => (
          <g key={k}>
            <circle cx="23" cy={22 + i * 39} r="14" fill={sig === k ? COL[k] : COL.off} />
            {sig === k && <circle cx="23" cy={22 + i * 39} r="26" fill={COL[k]} opacity={day ? 0.12 : 0.3} />}
          </g>
        ))}
      </g>
      <g transform="translate(124 170)">
        <rect width="44" height="34" rx="5" fill="#111418" />
        <text x="22" y="25" textAnchor="middle" fill={sig === "go" ? COL.go : COL.stop} style={{ font: "700 20px ui-monospace, monospace" }}>{String(50 - (t % 50)).padStart(2, "0").slice(-2)}</text>
      </g>
      {/* pedestrian signal */}
      <g transform="translate(306 392)">
        <rect width="26" height="46" rx="5" fill="#111418" />
        <circle cx="13" cy="13" r="7" fill={sig === "go" ? COL.stop : COL.off} />
        <circle cx="13" cy="33" r="7" fill={sig === "stop" ? COL.go : COL.off} />
      </g>
      {/* caption */}
      <g transform="translate(28 30)">
        <rect width="196" height="52" rx="12" fill={day ? "rgb(255 255 255 / .75)" : "rgb(255 255 255 / .08)"} />
        <circle cx="20" cy="26" r="6" fill={day ? "#F5A300" : "#2FB36B"} />
        <text x="36" y="22" fill={day ? "#15171B" : "#FFFFFF"} style={{ font: "500 13px var(--font-geist-sans), sans-serif" }}>{day ? "Day" : "Night"}</text>
        <text x="36" y="39" fill={day ? "#585C63" : "rgb(255 255 255 / .6)"} style={{ font: "400 12px var(--font-geist-sans), sans-serif" }}>{day ? "Panel charging the battery" : "Battery running the signals"}</text>
      </g>
    </svg>
  );
}
