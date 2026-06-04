import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ORBITS = [
  { label: "React",   radius: 78,  period: 9,  startAngle: 0,   dot: true  },
  { label: "Spring",  radius: 78,  period: 9,  startAngle: 180, dot: false },
  { label: "Python",  radius: 130, period: 16, startAngle: 60,  dot: true  },
  { label: "NLP",     radius: 130, period: 16, startAngle: 200, dot: false },
  { label: "RAG",     radius: 130, period: 16, startAngle: 310, dot: false },
  { label: "IA",      radius: 185, period: 24, startAngle: 30,  dot: true  },
  { label: "DevOps",  radius: 185, period: 24, startAngle: 160, dot: false },
  { label: "Vision",  radius: 185, period: 24, startAngle: 270, dot: false },
];

// ── Single orbiting skill node ────────────────────────────────────────────────
function OrbitNode({ label, radius, period, startAngle }) {
  const [angle, setAngle] = useState(startAngle);
  const startRef = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      setAngle(startAngle + (elapsed / period) * 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const rad = (angle * Math.PI) / 180;
  const x   = Math.cos(rad) * radius;
  const y   = Math.sin(rad) * radius;

  return (
    <>
      {/* Connection line */}
      <line
        x1="0" y1="0"
        x2={x} y2={y}
        stroke="rgba(249,115,22,0.12)"
        strokeWidth="1"
      />
      {/* Node dot */}
      <circle cx={x} cy={y} r="4" fill="var(--orange)" opacity="0.9" />
      {/* Glow */}
      <circle cx={x} cy={y} r="8" fill="var(--orange)" opacity="0.12" />
      {/* Label */}
      <text
        x={x + (x > 0 ? 12 : -12)}
        y={y + 4}
        textAnchor={x > 0 ? "start" : "end"}
        fill="rgba(245,245,245,0.55)"
        fontSize="10"
        fontFamily="'Courier New', monospace"
        letterSpacing="0.08em"
      >
        {label}
      </text>
    </>
  );
}

// ── Scanning line animation ───────────────────────────────────────────────────
function ScanLine() {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      setAngle((elapsed / 5) * 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const rad = (angle * Math.PI) / 180;
  const x   = Math.cos(rad) * 200;
  const y   = Math.sin(rad) * 200;

  return (
    <>
      {/* Sweep gradient sector — approximate with a wide blurred line */}
      <line
        x1="0" y1="0" x2={x} y2={y}
        stroke="rgba(249,115,22,0.18)"
        strokeWidth="40"
        strokeLinecap="round"
        style={{ filter: "blur(6px)" }}
      />
      <line
        x1="0" y1="0" x2={x} y2={y}
        stroke="rgba(249,115,22,0.5)"
        strokeWidth="1.5"
      />
    </>
  );
}

// ── Main visualization ────────────────────────────────────────────────────────
export default function AIViz() {
  const SIZE = 420;
  const C    = SIZE / 2;

  return (
    <div style={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}>

      {/* Grid background */}
      <svg
        width={SIZE} height={SIZE}
        style={{ position: "absolute", inset: 0, opacity: 0.18 }}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`v${i}`}
            x1={i * 30} y1={0} x2={i * 30} y2={SIZE}
            stroke="#F97316" strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`h${i}`}
            x1={0} y1={i * 30} x2={SIZE} y2={i * 30}
            stroke="#F97316" strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Main SVG — centered at 0,0 via transform */}
      <svg
        width={SIZE} height={SIZE}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
        viewBox={`${-C} ${-C} ${SIZE} ${SIZE}`}
      >
        {/* Orbit ring 1 */}
        <circle cx="0" cy="0" r="78"
          fill="none" stroke="rgba(249,115,22,0.12)" strokeWidth="1" strokeDasharray="4 6" />
        {/* Orbit ring 2 */}
        <circle cx="0" cy="0" r="130"
          fill="none" stroke="rgba(249,115,22,0.1)" strokeWidth="1" strokeDasharray="4 8" />
        {/* Orbit ring 3 */}
        <circle cx="0" cy="0" r="185"
          fill="none" stroke="rgba(249,115,22,0.08)" strokeWidth="1" strokeDasharray="4 10" />

        {/* Crosshair */}
        <line x1="-200" y1="0" x2="200" y2="0"
          stroke="rgba(249,115,22,0.15)" strokeWidth="1" />
        <line x1="0" y1="-200" x2="0" y2="200"
          stroke="rgba(249,115,22,0.15)" strokeWidth="1" />

        {/* Scanning sweep */}
        <ScanLine />

        {/* Orbiting nodes */}
        {ORBITS.map((o) => (
          <OrbitNode key={o.label} {...o} />
        ))}

        {/* Center — core node */}
        <motion.circle
          cx="0" cy="0" r="18"
          fill="rgba(249,115,22,0.15)"
          animate={{ r: [18, 22, 18] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="0" cy="0" r="30"
          fill="none"
          stroke="rgba(249,115,22,0.25)"
          strokeWidth="1"
          animate={{ r: [30, 38, 30], opacity: [0.25, 0, 0.25] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
        <circle cx="0" cy="0" r="8" fill="var(--orange)" />
        <circle cx="0" cy="0" r="14"
          fill="none" stroke="rgba(249,115,22,0.5)" strokeWidth="1" />

        {/* Name tag */}
        <text
          x="0" y="210"
          textAnchor="middle"
          fill="rgba(245,245,245,0.3)"
          fontSize="10"
          fontFamily="'Courier New', monospace"
          letterSpacing="0.22em"
        >
          DOUAE . ZOUAK
        </text>

        {/* Corner brackets */}
        {[[-195,-195],[185,-195],[-195,185],[185,185]].map(([x,y], i) => {
          const dx = x > 0 ? -1 : 1;
          const dy = y > 0 ? -1 : 1;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x + dx * 16} y2={y}
                stroke="rgba(249,115,22,0.35)" strokeWidth="1.5" />
              <line x1={x} y1={y} x2={x} y2={y + dy * 16}
                stroke="rgba(249,115,22,0.35)" strokeWidth="1.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
