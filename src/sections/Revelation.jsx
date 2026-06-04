import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "../components/AnimatedText";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

const VALUES = [
  {
    num: "01",
    stat: "×3",
    badge: "PROFILS EN UN",
    title: "Full-stack + IA dans un seul profil",
    text: "Je conçois l'API, construis le front et intègre la couche IA — sans trois personnes différentes.",
  },
  {
    num: "02",
    stat: "J.1",
    badge: "PRÊTE À LIVRER",
    title: "Opérationnelle dès le premier jour",
    text: "Spring Boot, Angular, Python, Docker — ce sont mes outils quotidiens. Zéro semaine d'onboarding tech.",
  },
  {
    num: "03",
    stat: "<1%",
    badge: "DES JUNIORS",
    title: "RL & LLMs : compétences rares",
    text: "Peu de profils juniors ont touché au Reinforcement Learning ou aux pipelines RAG. Introuvable sur une offre classique.",
  },
];

function Row({ v, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 48 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "48px 200px 1fr 32px",
        gap: "0 3rem",
        alignItems: "center",
        padding: "2.75rem 0",
        borderBottom: "1px solid #1c1c1c",
        cursor: "default",
        transition: "background 0.2s",
        background: hovered ? "rgba(249,115,22,0.02)" : "transparent",
      }}
    >
      {/* Row number */}
      <span style={{
        fontFamily: "var(--mono)", fontSize: 11,
        color: hovered ? "rgba(249,115,22,0.5)" : "#282828",
        letterSpacing: "0.1em",
        transition: "color 0.25s",
      }}>{v.num}</span>

      {/* Stat + badge */}
      <div>
        <motion.div
          animate={hovered
            ? { textShadow: "0 0 28px rgba(249,115,22,0.55)" }
            : { textShadow: "0 0 0px transparent" }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
            fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1,
            color: "var(--orange)",
          }}
        >{v.stat}</motion.div>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 9, fontWeight: 700,
          letterSpacing: "0.18em", color: "rgba(249,115,22,0.4)",
          textTransform: "uppercase", marginTop: "0.35rem",
        }}>{v.badge}</div>
      </div>

      {/* Title + description */}
      <div>
        <div style={{
          fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
          fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25,
          marginBottom: "0.6rem", color: "var(--text)",
          transition: "color 0.2s",
        }}>{v.title}</div>
        <div style={{
          fontFamily: "var(--mono)", fontSize: 12.5,
          color: "var(--muted)", lineHeight: 1.75, maxWidth: 520,
        }}>{v.text}</div>
      </div>

      {/* Arrow */}


      {/* Orange underline draws left → right on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", bottom: -1, left: 0, right: 0,
          height: 1, background: "var(--orange)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

export default function Revelation() {
  return (
    <section id="revelation" style={{
      padding: "8rem clamp(24px,8vw,96px)",
      borderTop: "1px solid var(--border)",
      background: "var(--surface)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 40% at 100% 100%, rgba(249,115,22,0.05) 0%, transparent 60%)",
      }} />

      <Reveal><div className="section-label">04 — Ce que vous gagnez</div></Reveal>
      <AnimatedText
        text="La valeur ajoutée en clair."
        as="h2" delay={0.1} stagger={0.05}
        style={{
          fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800,
          letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.5rem",
        }}
      />

      {/* Top border of the list */}
      <div style={{ borderTop: "1px solid #1c1c1c", marginTop: "3.5rem" }}>
        {VALUES.map((v, i) => (
          <Row key={v.num} v={v} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
