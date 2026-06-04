import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LINES = [
  { text: "Maintenant", accent: false },
  { text: "tu sais ce", accent: false },
  { text: "que je fais quand", accent: false },
  { text: "je veux", accent: false },
  { text: "quelque chose.", accent: true },
];

const DOTS = [
  { right: "9%", top: "22%", delay: 0 },
  { right: "15%", top: "40%", delay: 0.8 },
  { right: "7%", top: "58%", delay: 1.6 },
  { right: "20%", top: "28%", delay: 2.2 },
];

export default function Outro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: false, margin: "-60px" });

  return (
    <>
      <section
        id="outro"
        style={{
          minHeight: "100vh",
          padding: "5rem clamp(24px,8vw,96px) 4rem",
          borderTop: "1px solid var(--border)",
          backgroundColor: "var(--bg)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 55% 50% at 50% 65%, rgba(249,115,22,0.06) 0%, transparent 65%)",
          }}
        />

        {/* Floating dots */}
        {DOTS.map((d, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3.5 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: d.delay,
            }}
            style={{
              position: "absolute",
              right: d.right,
              top: d.top,
              width: i === 0 ? 6 : 4,
              height: i === 0 ? 6 : 4,
              borderRadius: "50%",
              background: "var(--orange)",
              opacity: i === 0 ? 0.45 : 0.22,
              boxShadow: "0 0 12px rgba(249,115,22,0.5)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ── Label ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">06 — La clôture</div>
        </motion.div>

        {/* ── Main text ── */}
        <div
          ref={ref}
          style={{ flex: 1, display: "flex", alignItems: "center" }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 5.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                margin: 0,
              }}
            >
              {LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                  transition={{ duration: 0.75, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "block",
                    color: line.accent ? "var(--orange)" : "var(--text)",
                    textShadow: line.accent ? "0 0 60px rgba(249,115,22,0.45)" : "none",
                  }}
                >
                  {line.text}
                </motion.div>
              ))}
            </h1>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem clamp(24px,8vw,96px)",
          textAlign: "center",
        }}
      >
        Site conçu par Douae Zouak pour Kamal Maarouf
      </footer>
    </>
  );
}
