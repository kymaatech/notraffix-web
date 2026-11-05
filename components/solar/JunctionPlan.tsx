"use client";

import { useEffect, useMemo, useState } from "react";
import type { HeadStyle, JunctionType, PoleStyle } from "@/lib/solar";

/* Animated top-down plan of a solar junction system.
   Drawn for one arm (traffic arriving from the south, right-hand traffic)
   and rotated for the others. 0° = south arm, 90° = west, 180° = north, 270° = east. */

type Arm = "S" | "W" | "N" | "E";
const ROT: Record<Arm, number> = { S: 0, W: 90, N: 180, E: 270 };
const C = 300; // centre
const HW = 72; // road half-width
const BOX0 = C - HW;
const BOX1 = C + HW;

type Stage = { green: Arm[]; amber: Arm[]; walk: boolean; t: number; label: string };

function cycle(type: JunctionType): Stage[] {
  return type === "4-way"
    ? [
        { green: ["N", "S"], amber: [], walk: false, t: 9, label: "North–south green" },
        { green: [], amber: ["N", "S"], walk: false, t: 3, label: "North–south amber" },
        { green: ["E", "W"], amber: [], walk: false, t: 9, label: "East–west green" },
        { green: [], amber: ["E", "W"], walk: false, t: 3, label: "East–west amber" },
        { green: [], amber: [], walk: true, t: 6, label: "Pedestrian phase" },
      ]
    : [
        { green: ["E", "W"], amber: [], walk: false, t: 9, label: "Main road green" },
        { green: [], amber: ["E", "W"], walk: false, t: 3, label: "Main road amber" },
        { green: ["S"], amber: [], walk: false, t: 7, label: "Side road green" },
        { green: [], amber: ["S"], walk: false, t: 3, label: "Side road amber" },
        { green: [], amber: [], walk: true, t: 6, label: "Pedestrian phase" },
      ];
}

export function JunctionPlan({ type, head, pole, className = "", onStage }: { type: JunctionType; head: HeadStyle; pole: PoleStyle; className?: string; onStage?: (label: string) => void }) {
  const arms: Arm[] = type === "4-way" ? ["S", "W", "N", "E"] : ["S", "W", "E"];
  const stages = useMemo(() => cycle(type), [type]);
  const total = stages.reduce((a, s) => a + s.t, 0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    setSec(0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const i = setInterval(() => setSec((s) => (s + 1) % total), 1000);
    return () => clearInterval(i);
  }, [total, type]);

  // where are we in the cycle?
  let acc = 0;
  let idx = 0;
  for (let i = 0; i < stages.length; i++) {
    if (sec < acc + stages[i].t) { idx = i; break; }
    acc += stages[i].t;
  }
  const st = stages[idx];
  const left = acc + st.t - sec;

  useEffect(() => onStage?.(st.label), [st.label, onStage]);

  const state = (a: Arm): "go" | "caution" | "stop" => (st.green.includes(a) ? "go" : st.amber.includes(a) ? "caution" : "stop");
  // seconds until this arm's state changes (shown on countdowns)
  const countdown = (a: Arm) => {
    if (st.green.includes(a) || st.amber.includes(a)) return left;
    let t = left;
    for (let k = 1; k < stages.length; k++) {
      const s = stages[(idx + k) % stages.length];
      if (s.green.includes(a)) return t;
      t += s.t;
    }
    return t;
  };

  return (
    <svg viewBox="50 50 500 500" className={className} role="img" aria-label={`Plan of a ${type} junction showing pole positions and signal phases`}>
      <defs>
        <pattern id="zebra-v" width="12" height="6" patternUnits="userSpaceOnUse"><rect width="12" height="3" fill="rgb(255 255 255 / .55)" /></pattern>
        <pattern id="zebra-h" width="6" height="12" patternUnits="userSpaceOnUse"><rect width="3" height="12" fill="rgb(255 255 255 / .55)" /></pattern>
        <radialGradient id="jp-go"><stop offset="0" stopColor="#2FB36B" stopOpacity=".5" /><stop offset="1" stopColor="#2FB36B" stopOpacity="0" /></radialGradient>
        <radialGradient id="jp-stop"><stop offset="0" stopColor="#E5483B" stopOpacity=".45" /><stop offset="1" stopColor="#E5483B" stopOpacity="0" /></radialGradient>
        <radialGradient id="jp-caution"><stop offset="0" stopColor="#F5A300" stopOpacity=".5" /><stop offset="1" stopColor="#F5A300" stopOpacity="0" /></radialGradient>
      </defs>

      {/* verges */}
      <rect width="600" height="600" fill="#1B1E23" />
      <g fill="rgb(255 255 255 / .025)" stroke="rgb(255 255 255 / .06)">
        <rect x="14" y="14" width={BOX0 - 34} height={BOX0 - 34} rx="18" />
        <rect x={BOX1 + 20} y="14" width={600 - BOX1 - 34} height={BOX0 - 34} rx="18" />
        <rect x="14" y={BOX1 + 20} width={BOX0 - 34} height={600 - BOX1 - 34} rx="18" />
        <rect x={BOX1 + 20} y={BOX1 + 20} width={600 - BOX1 - 34} height={600 - BOX1 - 34} rx="18" />
      </g>

      {type === "3-way" && <rect x="14" y="14" width="572" height={BOX0 - 34} rx="18" fill="#1F2227" stroke="rgb(255 255 255 / .06)" />}
      {/* carriageways */}
      <rect x="0" y={BOX0} width="600" height={HW * 2} fill="#2A2E35" />
      <rect x={BOX0} y={type === "4-way" ? 0 : BOX0} width={HW * 2} height={type === "4-way" ? 600 : 600 - BOX0} fill="#2A2E35" />
      {type === "3-way" && <rect x={BOX0} y={BOX0 - 30} width={HW * 2} height="30" fill="#1B1E23" />}

      {/* per-arm markings, poles and signals */}
      {arms.map((a) => (
        <g key={a} transform={`rotate(${ROT[a]} ${C} ${C})`}>
          {/* centre line */}
          <line x1={C} y1={BOX1 + 40} x2={C} y2="600" stroke="rgb(255 255 255 / .35)" strokeWidth="2" strokeDasharray="14 12" />
          {/* lane divider on inbound side */}
          <line x1={C + HW / 2} y1={BOX1 + 60} x2={C + HW / 2} y2="600" stroke="rgb(255 255 255 / .18)" strokeWidth="1.5" strokeDasharray="8 14" />
          {/* stop line */}
          <rect x={C + 2} y={BOX1 + 36} width={HW - 2} height="3.5" fill="rgb(255 255 255 / .8)" />
          {/* zebra */}
          <rect x={BOX0 + 4} y={BOX1 + 8} width={HW * 2 - 8} height="22" fill="url(#zebra-h)" />
          {/* lane arrows */}
          <path d={`M${C + HW / 4} ${BOX1 + 110} v-30 m-6 8 l6 -8 l6 8`} stroke="rgb(255 255 255 / .35)" strokeWidth="2" fill="none" />
          <path d={`M${C + (HW * 3) / 4} ${BOX1 + 110} v-30 m-6 8 l6 -8 l6 8`} stroke="rgb(255 255 255 / .35)" strokeWidth="2" fill="none" />

          {/* vehicles flowing on green */}
          {state(a) === "go" && (
            <g key={`${a}-${idx}`}>
              {[0, 1, 2].map((n) => (
                <rect key={n} x={C + HW / 4 + (n % 2) * (HW / 2) - 9} y="0" width="18" height="32" rx="5" fill={n === 1 ? "#F5A300" : "#D9DBDF"}>
                  <animate attributeName="y" from={560 + n * 60} to={type === "3-way" && a === "S" ? BOX0 + 40 : -60} dur={`${3.2 + n * 0.5}s`} begin={`${n * 0.7}s`} fill="freeze" />
                  <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.85;1" dur={`${3.2 + n * 0.5}s`} begin={`${n * 0.7}s`} fill="freeze" />
                </rect>
              ))}
            </g>
          )}
          {/* queue on red */}
          {state(a) === "stop" && (
            <g>
              {[0, 1].map((n) => (
                <rect key={n} x={C + HW / 4 + n * (HW / 2) - 9} y={BOX1 + 48 + n * 10} width="18" height="32" rx="5" fill="#D9DBDF" opacity=".85" />
              ))}
            </g>
          )}

          {/* signal pole on the near-side kerb */}
          <Pole style={pole} head={head} s={state(a)} n={countdown(a)} walk={st.walk} rot={ROT[a]} turn={type === "3-way" && a === "S"} />
        </g>
      ))}

      {/* T-junction head: kerb line where the north arm would be */}
      {type === "3-way" && <line x1={BOX0 - 20} y1={BOX0} x2={BOX1 + 20} y2={BOX0} stroke="rgb(255 255 255 / .12)" strokeWidth="2" />}
    </svg>
  );
}

function Pole({ style, head, s, n, walk, rot, turn }: { style: PoleStyle; head: HeadStyle; s: "go" | "caution" | "stop"; n: number; walk: boolean; rot: number; turn: boolean }) {
  const px = BOX1 + 18; // pole position, near-side kerb
  const py = BOX1 + 62;
  const colour = { go: "#2FB36B", caution: "#F5A300", stop: "#E5483B" }[s];
  const headX = style === "cantilever" ? C + HW / 2 : px;
  const headY = style === "cantilever" ? py : py - 2;
  return (
    <g>
      {/* glow */}
      <circle cx={headX} cy={headY} r="34" fill={`url(#jp-${s})`} />
      {/* cantilever arm over the lanes */}
      {style === "cantilever" && <line x1={px} y1={py} x2={C + 8} y2={py} stroke="#9AA0A8" strokeWidth="5" strokeLinecap="round" />}
      {/* pole + solar panel */}
      <circle cx={px} cy={py} r="8" fill="#9AA0A8" />
      <g transform={`translate(${px + 10} ${py + 8})`}>
        <rect width="34" height="22" rx="2" fill="#1F3B63" stroke="#7FA7D9" strokeWidth="1" />
        <path d="M11.3 0v22M22.6 0v22M0 11h34" stroke="#7FA7D9" strokeOpacity=".7" strokeWidth=".8" />
      </g>
      {/* signal head (seen from above as a lit block) */}
      <g transform={`translate(${headX - 16} ${headY - 7})`}>
        <rect width="32" height="14" rx="4" fill="#0E1013" stroke="rgb(255 255 255 / .2)" />
        {head === "arrow" ? (
          // ahead arrow points along the direction of travel; the T stem gets a turn arrow
          <path d={turn ? "M10 10V6h12m-4-3.5L22 6l-4 3.5" : "M16 12V3m-4 4l4-4 4 4"} stroke={colour} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <circle cx="16" cy="7" r="4.6" fill={colour} />
        )}
      </g>
      {/* countdown (separate display for ball/arrow heads, integrated for timer heads) */}
      <g transform={`translate(${headX + (style === "cantilever" ? 20 : -48)} ${headY - 9})`}>
        <rect width="28" height="18" rx="3" fill="#0E1013" stroke="rgb(255 255 255 / .2)" />
        {/* counter-rotate so digits always read upright */}
        <text x="14" y="9" textAnchor="middle" dominantBaseline="central" transform={`rotate(${-rot} 14 9)`} fill={colour} style={{ font: "600 12px ui-monospace, monospace" }}>{String(n).padStart(2, "0")}</text>
      </g>
      {/* pedestrian signal at the crossing */}
      <g transform={`translate(${BOX0 - 18} ${BOX1 + 6})`}>
        <circle r="6" fill={walk ? "#2FB36B" : "#E5483B"} opacity=".95" />
        <circle r="13" fill={walk ? "#2FB36B" : "#E5483B"} opacity=".14" />
      </g>
    </g>
  );
}
