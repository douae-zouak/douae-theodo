import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "../components/AnimatedText";
import { useIsMobile } from "../hooks/useIsMobile";

/* ─── Blocks ─────────────────────────────────────────────────────────────────── */
const BLOCKS = [
  { id: "l1", type: "label", number: "01", title: "CANDIDATURE SPONTANÉE" },
  {
    id: "hook",
    type: "lines",
    lines: [
      { text: "Je ne réponds",    color: "white"  },
      { text: "pas à une offre.", color: "dim"    },
      { text: "J'en crée une.",   color: "orange" },
    ],
  },
  {
    id: "door",
    type: "lines",
    size: "medium",
    lines: [
      { text: "J'aurais pu envoyer un email générique.", color: "white" },
      { text: "Moi, J'ai construit un site..",           color: "dim"   },
    ],
  },
];

/* ─── Skills marquee ─────────────────────────────────────────────────────────── */
const SKILLS = [
  "NLP","RL","RAG","React","Spring Boot","Python","Computer Vision",
  "PyTorch","FastAPI","Angular","Docker","Power BI","Whisper","Mistral",
  "LSTM","Double DQN","Scikit-learn","REST API","Postgres",
];

function Marquee() {
  const doubled = [...SKILLS, ...SKILLS];
  return (
    <div style={{
      overflow:"hidden", borderTop:"1px solid var(--border)",
      borderBottom:"1px solid var(--border)", padding:"14px 0",
      background:"rgba(249,115,22,0.03)", position:"relative",
    }}>
      <div style={{ position:"absolute",left:0,top:0,bottom:0,width:80,zIndex:2,
        background:"linear-gradient(90deg,var(--bg),transparent)",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",right:0,top:0,bottom:0,width:80,zIndex:2,
        background:"linear-gradient(270deg,var(--bg),transparent)",pointerEvents:"none" }}/>
      <motion.div
        animate={{ x:["0%","-50%"] }}
        transition={{ duration:28, repeat:Infinity, ease:"linear" }}
        style={{ display:"flex", width:"max-content" }}
      >
        {doubled.map((s,i) => (
          <span key={i} style={{ display:"flex", alignItems:"center" }}>
            <span style={{
              fontFamily:"var(--mono)", fontSize:11, fontWeight:600,
              letterSpacing:"0.14em", whiteSpace:"nowrap", padding:"0 20px",
              textTransform:"uppercase",
              color: i%3===0 ? "var(--orange)" : "rgba(245,245,245,0.3)",
            }}>{s}</span>
            <span style={{ color:"rgba(249,115,22,0.3)", fontSize:10 }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Terminal cards ─────────────────────────────────────────────────────────── */
const TERM_CARDS = [
  {
    title: "initiative.exe", side: "left",
    lines: [
      { t: "> Candidature",     c: "white"  },
      { t: "  Type: spontanée", c: "white"  },
      { t: "  Target: Theodo",  c: "orange" },
    ],
  },
  {
    title: "stack.config", side: "right",
    lines: [
      { t: "Software: React · Spring", c: "white"  },
      { t: "IA: PyTorch · RAG · NLP",  c: "orange" },
      { t: "Tools: Docker · FastAPI",  c: "white"  },
    ],
  },
  {
    title: "ask.md", side: "left",
    lines: [
      { t: "Durée   : 2 mois",         c: "white"  },
      { t: "Dispo   : maintenant",     c: "orange" },
      { t: "Mission : livrer du réel", c: "white"  },
    ],
  },
];

function TermCard({ card, index = 0 }) {
  const fromX = card.side === "left" ? -30 : 30;
  const baseDelay = 0.3 + index * 0.15;
  return (
    <motion.div
      initial={{ opacity:0, x: fromX, y: 10 }}
      animate={{ opacity:1, x:0, y:[0,-7,0] }}
      transition={{
        opacity:{ duration:0.7, delay: baseDelay },
        x:{ duration:0.7, delay: baseDelay, ease:[0.16,1,0.3,1] },
        y:{ delay: baseDelay + 0.6, repeat:Infinity, duration: 3.5 + index * 0.5, ease:"easeInOut" },
      }}
      style={{
        background:"#1a1a1a", border:"1px solid #2a2a2a",
        borderRadius:4, overflow:"hidden", width:200,
        boxShadow:"0 0 28px rgba(249,115,22,0.1), 0 6px 24px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{
        display:"flex", alignItems:"center", gap:6,
        padding:"7px 11px", borderBottom:"1px solid #222", background:"#111",
      }}>
        {["#ff5f57","#febc2e","#28c840"].map((c,i)=>(
          <div key={i} style={{ width:7,height:7,borderRadius:"50%",background:c,opacity:0.7 }}/>
        ))}
        <span style={{ marginLeft:8,fontFamily:"var(--mono)",fontSize:10,color:"var(--muted)",letterSpacing:"0.08em" }}>
          {card.title}
        </span>
      </div>
      <div style={{ padding:"10px 12px", display:"flex", flexDirection:"column", gap:5 }}>
        {card.lines.map((line,i)=>(
          <span key={i} style={{
            fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.04em",
            color:line.c==="orange"?"var(--orange)":line.c==="muted"?"var(--muted)":"var(--text)",
          }}>{line.t}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Block renderer ─────────────────────────────────────────────────────────── */
function Block({ data }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:false, margin:"-60px" });
  const isMed  = data.size === "medium";

  if (data.type === "label") {
    return (
      <motion.div ref={ref}
        initial={{ opacity:0, x:-16 }}
        animate={inView?{opacity:1,x:0}:{opacity:0,x:-16}}
        transition={{ duration:0.5 }}
        style={{ margin:"52px 0 18px" }}
      >
        <div className="section-label">{data.number} — {data.title}</div>
      </motion.div>
    );
  }

  if (isMed) {
    return (
      <div ref={ref} style={{ marginTop:28, marginBottom:8 }}>
        {data.lines.map((line,i) => (
          <motion.p key={i}
            initial={{ opacity:0, y:16 }}
            animate={inView?{opacity:1,y:0}:{opacity:0,y:16}}
            transition={{ duration:0.6, delay:i*0.12, ease:[0.16,1,0.3,1] }}
            style={{
              margin:"0 0 6px 0", fontFamily:"var(--mono)",
              fontSize:"clamp(13px,1.5vw,16px)", lineHeight:1.7,
              color:line.color==="dim"?"rgba(245,245,245,0.35)":"rgba(245,245,245,0.85)",
              fontWeight:line.color==="white"?700:400, letterSpacing:"0.02em",
            }}
          >
            {line.color==="dim"
              ? <span>{line.text}</span>
              : <strong style={{ color:"var(--text)",fontWeight:700,textShadow:"0 0 20px rgba(249,115,22,0.3)" }}>{line.text}</strong>
            }
          </motion.p>
        ))}
      </div>
    );
  }

  /* Big lines — word-by-word animation */
  const isMobile = useIsMobile();
  return (
    <div ref={ref} style={{ marginBottom:6 }}>
      {data.lines.map((line,i) => (
        <AnimatedText key={i} text={line.text} as="p"
          delay={i * 0.08} stagger={0.04} margin="-40px"
          style={{
            margin:0, lineHeight:0.94,
            whiteSpace: isMobile ? "normal" : "nowrap",
            fontSize: isMobile ? "clamp(32px,9vw,60px)" : "clamp(40px,6.5vw,90px)",
            fontWeight:900, letterSpacing:"-0.035em",
            color:
              line.color==="orange"?"var(--orange)"
              :line.color==="dim"?"rgba(245,245,245,0.24)"
              :"var(--text)",
            filter:line.color==="orange"?"drop-shadow(0 0 24px rgba(249,115,22,0.55))":"none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────────── */
export default function Miroir() {
  const isMobile = useIsMobile();
  return (
    <>
      <section id="miroir" style={{
        backgroundColor:"var(--bg)",
        padding: isMobile ? "60px clamp(20px,6vw,48px) 48px" : "100px clamp(24px,8vw,100px) 80px",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse 55% 60% at 50% 50%, rgba(249,115,22,0.07) 0%, transparent 65%)",
        }}/>

        <div style={{
          position:"relative", zIndex:2,
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : "max-content 1fr",
          gap:"clamp(32px,5vw,80px)",
          alignItems:"start",
        }}>
          {/* LEFT — text */}
          <div>
            {BLOCKS.map(b => <Block key={b.id} data={b} />)}
          </div>

          {/* RIGHT — three cards (hidden on mobile) */}
          {!isMobile && (
            <div style={{
              position:"sticky", top:"calc(50vh - 250px)",
              alignSelf:"flex-start",
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:14,
            }}>
              <div style={{ gridColumn:1, gridRow:1 }}>
                <TermCard card={TERM_CARDS[0]} index={0} />
              </div>
              <div style={{ gridColumn:2, gridRow:2 }}>
                <TermCard card={TERM_CARDS[1]} index={1} />
              </div>
              <div style={{ gridColumn:1, gridRow:3 }}>
                <TermCard card={TERM_CARDS[2]} index={2} />
              </div>
            </div>
          )}
        </div>
      </section>

      <Marquee />
    </>
  );
}
