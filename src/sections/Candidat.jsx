import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "../components/AnimatedText";
import { useIsMobile } from "../hooks/useIsMobile";

function Reveal({ children, delay = 0, fromX = 0, fromY = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: fromY, x: fromX }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: fromY, x: fromX }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

const POINTS = [
  { text: <>Theodo recrute des profils IT pointus. Je suis <strong style={{color:"var(--orange)",fontWeight:500}}>l'un de ces profils</strong> — avec la double casquette software & IA.</> },
  { text: <>Votre culture de l'excellence technique correspond à ma façon de travailler : <strong style={{color:"var(--orange)",fontWeight:500}}>pas de code jetable</strong>, tout est pensé, testé, documenté.</> },
  { text: <>L'IA générative transforme les projets IT. J'ai les compétences pour <strong style={{color:"var(--orange)",fontWeight:500}}>intégrer cette couche intelligente</strong> dans vos livrables clients.</> },
  { text: <>En 2 mois, je ne veux pas observer. Je veux <strong style={{color:"var(--orange)",fontWeight:500}}>livrer quelque chose de réel</strong> dont votre équipe sera fière.</> },
];

export default function Candidat() {
  const isMobile     = useIsMobile();
  const quoteRef     = useRef(null);
  const quoteInView  = useInView(quoteRef, { once: false, margin: "-60px" });
  const pointsRef    = useRef(null);
  const pointsInView = useInView(pointsRef, { once: false, margin: "-60px" });

  return (
    <section id="candidat" style={{
      backgroundColor: "var(--bg)",
      padding: "8rem clamp(24px,8vw,96px)",
      borderTop: "1px solid var(--border)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glows */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 55% 70% at 0% 50%, rgba(249,115,22,0.07) 0%, transparent 65%)",
      }}/>
      <div style={{
        position:"absolute", right:"-5%", top:"10%",
        width:400, height:400, borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
        filter:"blur(60px)",
      }}/>

      {/* Label */}
      <Reveal>
        <div className="section-label">02 — Pourquoi Theodo</div>
      </Reveal>

      {/* Heading */}
      <AnimatedText
        text="Ce n'est pas un choix par défaut."
        as="h2" delay={0.1} stagger={0.06}
        style={{
          fontSize:"clamp(2rem,4vw,3.5rem)", fontWeight:800,
          letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:"1.5rem",
        }}
      />

      <div style={{
        display:"grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap:"clamp(2rem,6vw,6rem)", marginTop:"4rem", alignItems:"start",
      }}>

        {/* ── LEFT — quote card ───────────────────────────────────────── */}
        <motion.div
          ref={quoteRef}
          initial={{ opacity:0, x:-48 }}
          animate={quoteInView ? { opacity:1, x:0 } : { opacity:0, x:-48 }}
          transition={{ duration:0.8, delay:0.15, ease:[0.16,1,0.3,1] }}
          whileHover={{ y:-5, boxShadow:"0 20px 60px rgba(0,0,0,0.6), -6px 0 32px rgba(249,115,22,0.18)" }}
          style={{
            position:"relative",
            background:"#0f0f0f",
            border:"1px solid #222",
            borderLeft:"3px solid var(--orange)",
            borderRadius:6,
            padding:"2rem 2rem 1.75rem",
            overflow:"hidden",
            boxShadow:"-4px 0 24px rgba(249,115,22,0.1), 0 8px 32px rgba(0,0,0,0.4)",
            cursor:"default",
          }}
        >
          {/* Decorative large quote mark */}
          <span style={{
            position:"absolute", top:-16, left:18,
            fontFamily:"Georgia, serif", fontSize:140, lineHeight:1,
            color:"rgba(249,115,22,0.07)", pointerEvents:"none", userSelect:"none",
          }}>"</span>

          {/* Animated orange top-edge line */}
          <motion.div
            initial={{ scaleX:0 }}
            animate={quoteInView ? { scaleX:1 } : { scaleX:0 }}
            transition={{ duration:0.9, delay:0.5, ease:[0.16,1,0.3,1] }}
            style={{
              position:"absolute", top:0, left:0, right:0, height:1,
              background:"linear-gradient(90deg, var(--orange), transparent)",
              transformOrigin:"left",
            }}
          />

          <p style={{
            fontSize:"clamp(1.1rem,2vw,1.5rem)", fontWeight:700,
            letterSpacing:"-0.02em", lineHeight:1.35,
            color:"var(--text)", margin:0,
          }}>
            Theodo construit des logiciels qui durent — avec des équipes qui pensent profondément.
          </p>
          <span style={{
            display:"block", marginTop:"1.25rem", fontSize:13,
            fontFamily:"var(--mono)", color:"var(--muted)",
            fontWeight:400, lineHeight:1.8,
          }}>
            C'est exactement l'environnement dans lequel je m'épanouis et progresse le plus vite.
          </span>
        </motion.div>

        {/* ── RIGHT — point cards ──────────────────────────────────────── */}
        <div ref={pointsRef} style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
          {POINTS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:48 }}
              animate={pointsInView ? { opacity:1, x:0, transition:{ duration:0.65, delay:i*0.12, ease:[0.16,1,0.3,1] } } : { opacity:0, x:48 }}
              whileHover={{
                x: 5,
                backgroundColor: "rgba(249,115,22,0.04)",
                borderColor: "rgba(249,115,22,0.6)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), -2px 0 16px rgba(249,115,22,0.1)",
                transition: { duration:0.22 },
              }}
              style={{
                display:"flex", gap:"1rem", alignItems:"flex-start",
                background:"transparent",
                border:"1px solid #1e1e1e",
                borderLeft:"2px solid #2a2a2a",
                borderRadius:4,
                padding:"1rem 1.25rem",
                cursor:"default",
              }}
            >
              <motion.span
                whileHover={{ x:3, color:"#f97316" }}
                style={{ fontFamily:"var(--mono)", fontSize:12, color:"var(--orange)", flexShrink:0, paddingTop:2 }}
              >→</motion.span>
              <span style={{ fontSize:13, lineHeight:1.75, fontFamily:"var(--mono)", color:"var(--muted)" }}>
                {p.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
