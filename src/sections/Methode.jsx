import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import AnimatedText from "../components/AnimatedText";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

const PROJECTS = [
  {
    num: "01", side: "left",
    name: "Auto-Scaling Intelligent par RL",
    desc: "Optimisation de l'allocation de serveurs cloud via Reinforcement Learning — Double DQN, Dueling DQN et Prioritized Experience Replay. L'agent apprend à minimiser les coûts tout en maintenant la disponibilité.",
    tags: [
      {label:"RL",hi:true},{label:"Double DQN",hi:true},{label:"Dueling DQN",hi:true},
      {label:"PyTorch"},{label:"Cloud Optimization"},
    ],
    terminal: [
      { t: "Episode  847 / 1000",           c: "text"   },
      { t: "Reward   : +2,847  ↑",          c: "green"  },
      { t: "Cost saved: 34%",               c: "orange" },
      { t: "✓ Agent converged",             c: "green"  },
    ],
  },
  {
    num: "02", side: "right",
    name: "Système RAG & Analyse Documentaire",
    desc: "Pipeline complet : OCR pour extraction de dates d'expiration + assistant conversationnel RAG avec Mistral/Ollama. De l'ingestion à la réponse contextuelle — bout en bout.",
    tags: [
      {label:"RAG",hi:true},{label:"Mistral",hi:true},{label:"OCR",hi:true},
      {label:"LLMs"},{label:"Ollama"},{label:"Python"},
    ],
    terminal: [
      { t: "Searching 142 docs...",         c: "text"   },
      { t: "→ Found : 2024-03-15",          c: "orange" },
      { t: "Context : 3 chunks",            c: "muted"  },
      { t: "Confidence : 97%",             c: "green"  },
    ],
  },
  {
    num: "03", side: "left",
    name: "Transcription & Résumé de Réunions",
    desc: "Transcription audio avec Whisper, diarisation des locuteurs via Pyannote, extraction automatique des action items avec Flan-T5. Exposé via FastAPI.",
    tags: [
      {label:"Whisper",hi:true},{label:"NLP",hi:true},{label:"FastAPI"},
      {label:"Pyannote"},{label:"Hugging Face"},{label:"Flan-T5"},
    ],
    terminal: [
      { t: "[00:00] Locuteur A : ...",       c: "text"   },
      { t: "[00:12] Locuteur B : ...",       c: "text"   },
      { t: "→ 3 action items détectés",      c: "orange" },
      { t: "✓ Résumé généré",               c: "green"  },
    ],
  },
  {
    num: "04", side: "right",
    name: "Détection de Maladies des Plantes — XAI",
    desc: "Benchmark de transfer learning (EfficientNet, ResNet, ViT) + segmentation U-Net/Mask R-CNN + explicabilité XAI via Grad-CAM et Attention Rollout. Un modèle qu'on comprend.",
    tags: [
      {label:"Computer Vision",hi:true},{label:"XAI",hi:true},{label:"PyTorch"},
      {label:"ViT"},{label:"Grad-CAM"},{label:"U-Net"},
    ],
    terminal: [
      { t: "Accuracy  : 96.4%",             c: "green"  },
      { t: "Grad-CAM  : computed",          c: "orange" },
      { t: "Attention : visualized",        c: "text"   },
      { t: "✓ XAI report ready",            c: "green"  },
    ],
  },
];

/* ─── Mini terminal ──────────────────────────────────────────────────────────── */
function MiniTerminal({ lines, inView }) {
  return (
    <div style={{
      background: "#080808", border: "1px solid #1a1a1a",
      borderRadius: 6, overflow: "hidden", marginTop: "1.25rem",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "7px 12px", borderBottom: "1px solid #141414", background: "#050505",
      }}>
        {["#ff5f57","#febc2e","#28c840"].map((c,i) => (
          <div key={i} style={{ width:7,height:7,borderRadius:"50%",background:c,opacity:0.65 }}/>
        ))}
        <span style={{ marginLeft:6, fontFamily:"var(--mono)", fontSize:10,color:"#FFFFFF",letterSpacing:"0.06em" }}>output</span>
      </div>
      <div style={{ padding:"11px 14px", display:"flex", flexDirection:"column", gap:5 }}>
        {lines.map((line,i) => (
          <motion.span key={i}
            initial={{ opacity:0, x:6 }}
            animate={inView ? { opacity:1, x:0 } : { opacity:0, x:6 }}
            transition={{ duration:0.3, delay:0.5 + i*0.12 }}
            style={{
              fontFamily:"var(--mono)", fontSize:11, lineHeight:1.5,
              color:
                line.c==="orange" ? "var(--orange)"
               :line.c==="green"  ? "#4ade80"
               :line.c==="muted"  ? "#333"
               :"rgba(240,237,230,0.7)",
            }}
          >{line.t}</motion.span>
        ))}
      </div>
    </div>
  );
}

/* ─── Timeline card ──────────────────────────────────────────────────────────── */
function TimelineCard({ project, inView }) {
  const fromX = project.side === "left" ? -56 : 56;
  return (
    <motion.div
      initial={{ opacity:0, x:fromX }}
      animate={inView ? { opacity:1, x:0 } : { opacity:0, x:fromX }}
      transition={{ duration:0.75, delay:0.1, ease:[0.16,1,0.3,1] }}
      whileHover={{
        y:-5,
        boxShadow:"0 20px 56px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.2)",
        transition:{ duration:0.22 },
      }}
      style={{
        position:"relative", background:"#0d0d0d",
        border:"1px solid #1a1a1a", borderRadius:8,
        padding:"1.75rem", overflow:"hidden", cursor:"default",
        width:"100%",
      }}
    >
      {/* Top edge line — draws from the side the card comes from */}
      <motion.div
        initial={{ scaleX:0 }}
        animate={inView ? { scaleX:1 } : { scaleX:0 }}
        transition={{ duration:0.85, delay:0.35, ease:[0.16,1,0.3,1] }}
        style={{
          position:"absolute", top:0, left:0, right:0, height:1,
          background: project.side === "left"
            ? "linear-gradient(90deg, var(--orange), transparent 60%)"
            : "linear-gradient(270deg, var(--orange), transparent 60%)",
          transformOrigin: project.side === "left" ? "left" : "right",
        }}
      />

      <motion.span
        initial={{ opacity:0 }} animate={inView?{opacity:1}:{opacity:0}}
        transition={{ duration:0.4, delay:0.2 }}
        style={{ fontFamily:"var(--mono)",fontSize:11,color:"var(--orange)",letterSpacing:"0.14em" }}
      >{project.num}</motion.span>

      <motion.h3
        initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{opacity:0,y:10}}
        transition={{ duration:0.55, delay:0.25, ease:[0.16,1,0.3,1] }}
        style={{
          fontSize:"clamp(1.1rem,2vw,1.45rem)", fontWeight:700,
          letterSpacing:"-0.025em", lineHeight:1.2,
          marginTop:"0.4rem", marginBottom:"0.75rem",
        }}
      >{project.name}</motion.h3>

      <motion.p
        initial={{ opacity:0 }} animate={inView?{opacity:1}:{opacity:0}}
        transition={{ duration:0.5, delay:0.32 }}
        style={{
          fontFamily:"var(--mono)", fontSize:12,
          color:"var(--muted)", lineHeight:1.75,
          marginBottom:"1rem",
        }}
      >{project.desc}</motion.p>

      <motion.div
        initial={{ opacity:0, y:6 }} animate={inView?{opacity:1,y:0}:{opacity:0,y:6}}
        transition={{ duration:0.4, delay:0.4 }}
        style={{ display:"flex", flexWrap:"wrap", gap:6 }}
      >
        {project.tags.map(t => (
          <span key={t.label} className={`tag${t.hi?" highlight":""}`}>{t.label}</span>
        ))}
      </motion.div>

      <MiniTerminal lines={project.terminal} inView={inView} />
    </motion.div>
  );
}

/* ─── Timeline item (one row) ────────────────────────────────────────────────── */
function TimelineItem({ project }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:false, margin:"-80px" });
  const isLeft = project.side === "left";

  return (
    <div ref={ref} style={{
      display:"grid",
      gridTemplateColumns:"1fr 64px 1fr",
      columnGap:"1.5rem",
      alignItems:"center",
    }}>
      {/* Left slot */}
      <div style={{ display:"flex", justifyContent:"flex-end" }}>
        {isLeft && <TimelineCard project={project} inView={inView} />}
      </div>

      {/* Center — dot on the line */}
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative", zIndex:3 }}>
        <motion.div
          initial={{ scale:0, opacity:0 }}
          animate={inView ? { scale:1, opacity:1 } : { scale:0, opacity:0 }}
          transition={{ duration:0.45, delay:0.05, ease:[0.16,1,0.3,1] }}
          style={{
            width:13, height:13, borderRadius:"50%",
            background:"var(--orange)",
            boxShadow:"0 0 0 5px rgba(249,115,22,0.12), 0 0 22px rgba(249,115,22,0.45)",
            flexShrink:0,
          }}
        />
      </div>

      {/* Right slot */}
      <div>
        {!isLeft && <TimelineCard project={project} inView={inView} />}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────────── */
export default function Methode() {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.3"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="methode" style={{
      padding:"8rem clamp(24px,8vw,96px)",
      borderTop:"1px solid var(--border)",
      backgroundColor:"var(--bg)",
      position:"relative", overflow:"hidden",
    }}>
      {/* Ambient */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 50% 40% at 100% 0%, rgba(249,115,22,0.04) 0%, transparent 60%)",
      }}/>

      <Reveal><div className="section-label">03 — Ce que j'ai construit</div></Reveal>
      <AnimatedText
        text="Pas des toy projects. Des vraies solutions."
        as="h2" delay={0.1} stagger={0.045}
        style={{
          fontSize:"clamp(2rem,4vw,3.5rem)", fontWeight:800,
          letterSpacing:"-0.03em", lineHeight:1.05, marginBottom:"1.5rem",
        }}
      />

      {/* Timeline */}
      <div ref={timelineRef} style={{ position:"relative", marginTop:"4rem" }}>

        {/* Track (faint grey) */}
        <div style={{
          position:"absolute", left:"50%", top:0, bottom:0,
          width:1, transform:"translateX(-50%)",
          background:"#1c1c1c", zIndex:0,
        }}/>

        {/* Animated orange line */}
        <motion.div style={{
          position:"absolute", left:"50%", top:0,
          width:1, height:"100%",
          transform:"translateX(-50%)",
          background:"linear-gradient(180deg, var(--orange) 0%, rgba(249,115,22,0.25) 100%)",
          scaleY:lineScaleY, transformOrigin:"top",
          zIndex:1,
        }}/>

        {/* Items */}
        <div style={{
          display:"flex", flexDirection:"column",
          gap:"3.5rem", position:"relative", zIndex:2,
        }}>
          {PROJECTS.map(p => (
            <TimelineItem key={p.num} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
