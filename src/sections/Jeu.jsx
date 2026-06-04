import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

// ── Script (100% français, phrases complètes, infos vérifiées) ───────────────
const SCRIPT = [
  {
    char: "kamal",
    text: "Lui, c'est Kamal Maarouf.",
    note: "Kamal Maarouf",
  },
  {
    char: "kamal",
    text: "Le genre de recruteur qui lit ton CV avant même que tu cliques sur « Envoyer ».",
    note: "Il lit ton CV avant l'envoi",
  },
  {
    char: "kamal",
    text: "Diplômé en Gestion des Ressources Humaines à l'ENCG Casablanca.",
    note: "RH · ENCG Casablanca",
  },
  {
    char: "kamal",
    text: "Aujourd'hui Spécialiste Acquisition de Talents IT chez Theodo — devs, DevOps, data, chefs de projet… il gère tout.",
    note: "Acquisition IT · Theodo",
  },
  {
    char: "kamal",
    text: "Il vit en mode SCRUM : chaque recrutement est un sprint, chaque candidat une user story.",
    note: "Recrute en mode SCRUM",
  },
  {
    char: "kamal",
    text: "Son super-pouvoir ? Connecter les meilleurs talents aux bonnes organisations. Chaque fois.",
    note: "Connecte talent & orga ✓",
  },
  {
    char: "douae",
    text: "Elle, c'est Douae Zouak.",
    note: "Zouak Douae",
  },
  {
    char: "douae",
    text: "Étudiante en Génie Informatique & Intelligence Artificielle à l'ENSA.",
    note: "Génie Info & IA · ENSA",
  },
  {
    char: "douae",
    text: "Elle code des réseaux de neurones le matin et déploie des APIs Restful l'après-midi.",
    note: "IA le matin, APIs le soir",
  },
  {
    char: "douae",
    text: "Curieuse, rigoureuse, et elle ne s'arrête jamais à la première solution qui marche.",
    note: "Curieuse · Rigoureuse · Tenace",
  },
  {
    char: "douae",
    text: "Et aujourd'hui, elle a construit ce site entier juste pour te demander 2 mois de stage chez Theodo.",
    note: "Stage PFA · 2 mois · Theodo",
  },
];

const KAMAL_COUNT = SCRIPT.filter((b) => b.char === "kamal").length;
const TYPING_SPEED = 50;

// ── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, active, onDone) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    setDisplayed("");
    if (!active || !text) return;
    let i = 0;
    ref.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(ref.current);
        setTimeout(() => onDone?.(), 550);
      }
    }, TYPING_SPEED);
    return () => clearInterval(ref.current);
  }, [text, active]);

  return displayed;
}

// ── Stars (generated once) ───────────────────────────────────────────────────
function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 65,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.55 + 0.15,
        twinkle: Math.random() > 0.6,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            backgroundColor: "#fff",
            opacity: s.opacity,
          }}
          animate={
            s.twinkle
              ? { opacity: [s.opacity, s.opacity * 0.3, s.opacity] }
              : {}
          }
          transition={
            s.twinkle
              ? {
                  repeat: Infinity,
                  duration: 2 + Math.random() * 3,
                  ease: "easeInOut",
                }
              : {}
          }
        />
      ))}
    </div>
  );
}

// ── Background ───────────────────────────────────────────────────────────────
function Background() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Sky gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #06060f 0%, #0a0a1a 40%, #0d0a10 70%, #100808 100%)",
        }}
      />

      {/* Nebula blob top-center */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "30%",
          width: "40%",
          height: "55%",
          background:
            "radial-gradient(ellipse, rgba(249,115,22,0.04) 0%, rgba(120,40,200,0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle city silhouette */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: 68,
          left: 0,
          right: 0,
          width: "100%",
          height: 180,
          opacity: 0.18,
        }}
      >
        {/* Buildings */}
        <rect x="0" y="80" width="60" height="120" fill="#1a1a2e" />
        <rect x="55" y="110" width="40" height="90" fill="#1a1a2e" />
        <rect x="90" y="50" width="80" height="150" fill="#16213e" />
        <rect x="165" y="90" width="50" height="110" fill="#1a1a2e" />
        <rect x="210" y="60" width="35" height="140" fill="#16213e" />
        <rect x="240" y="100" width="55" height="100" fill="#1a1a2e" />

        <rect x="1100" y="70" width="90" height="130" fill="#1a1a2e" />
        <rect x="1185" y="100" width="50" height="100" fill="#16213e" />
        <rect x="1230" y="55" width="70" height="145" fill="#1a1a2e" />
        <rect x="1295" y="85" width="45" height="115" fill="#16213e" />
        <rect x="1335" y="65" width="60" height="135" fill="#1a1a2e" />
        <rect x="1390" y="90" width="50" height="110" fill="#1a1a2e" />

        {/* Windows */}
        {[100, 115, 130, 145, 160].map((y) =>
          [95, 110, 125, 140].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="8"
              height="6"
              fill="rgba(249,115,22,0.3)"
            />
          )),
        )}
        {[75, 90, 105, 120, 135].map((y) =>
          [1105, 1120, 1135, 1150].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="8"
              height="6"
              fill="rgba(249,115,22,0.25)"
            />
          )),
        )}
        {[60, 75, 90, 105, 120, 135].map((y) =>
          [1235, 1250, 1265].map((x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="8"
              height="6"
              fill="rgba(249,115,22,0.2)"
            />
          )),
        )}
      </svg>

      {/* Orange horizon glow */}
      <div
        style={{
          position: "absolute",
          bottom: 65,
          left: 0,
          right: 0,
          height: 60,
          background:
            "linear-gradient(to top, rgba(249,115,22,0.12) 0%, transparent 100%)",
        }}
      />

      <StarField />
    </div>
  );
}

// ── Road ─────────────────────────────────────────────────────────────────────
function Road() {
  return (
    <div
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 68 }}
    >
      {/* Asphalt */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #1a1a1a 0%, #111 100%)",
          borderTop: "2px solid #2a2a2a",
        }}
      />
      {/* Center line */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: 0,
          right: 0,
          height: 3,
          background:
            "repeating-linear-gradient(90deg, var(--orange) 0, var(--orange) 44px, transparent 44px, transparent 88px)",
          opacity: 0.5,
          transform: "translateY(-50%)",
        }}
      />
      {/* Shoulder lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(249,115,22,0.3) 20%, rgba(249,115,22,0.3) 80%, transparent)",
        }}
      />
    </div>
  );
}

// ── Sticky notes stack ───────────────────────────────────────────────────────
const ROTATIONS = [-2.5, 1.8, -1.2, 3, -2, 1.5, -3, 2.2];
const OFFSETS = [
  { x: 0, y: 0 },
  { x: 5, y: -4 },
  { x: -4, y: -8 },
  { x: 7, y: -12 },
  { x: -2, y: -16 },
  { x: 6, y: -20 },
];

function NotesStack({ notes, side }) {
  if (!notes.length) return null;
  return (
    <div
      style={{
        position: "relative",
        width: 260,
        height: 90,
        marginBottom: 14,
      }}
    >
      {notes.map((note, i) => {
        const off = OFFSETS[i] || { x: i * 3, y: -(i * 4) };
        const rot = ROTATIONS[i % ROTATIONS.length];
        const isFirst = i === 0;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7, y: -30, rotate: rot - 8 }}
            animate={{ opacity: 1, scale: 1, y: off.y, rotate: rot }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.05,
            }}
            style={{
              position: "absolute",
              left: side === "right" ? "auto" : off.x,
              right: side === "right" ? off.x : "auto",
              top: 0,
              zIndex: i + 1,
              background: isFirst
                ? "var(--orange)"
                : i % 3 === 1
                  ? "#1e1e2e"
                  : "#1a1a1a",
              border: `1px solid ${isFirst ? "var(--orange)" : "#2d2d3a"}`,
              color: isFirst ? "#000" : "var(--text)",
              padding: "8px 14px",
              borderRadius: "3px",
              fontSize: isFirst ? 17 : 15,
              fontWeight: isFirst ? 700 : 400,
              whiteSpace: "nowrap",
              maxWidth: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              boxShadow: isFirst
                ? "0 4px 20px rgba(249,115,22,0.35)"
                : "0 3px 12px rgba(0,0,0,0.6)",
              letterSpacing: "0.02em",
              cursor: "default",
            }}
          >
            {note}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Character ────────────────────────────────────────────────────────────────
function Character({ src, flip, height = 340 }) {
  return (
    <img
      src={src}
      alt=""
      style={{
        height,
        width: "auto",
        display: "block",
        objectFit: "contain",
        transform: flip ? "scaleX(-1)" : "none",
        filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.8))",
      }}
    />
  );
}

// ── Cursor ───────────────────────────────────────────────────────────────────
function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 0.85 }}
      style={{ color: "var(--orange)", marginLeft: 2, fontWeight: 300 }}
    >
      │
    </motion.span>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Jeu() {
  const isMobile = useIsMobile();
  const [beatIndex, setBeatIndex] = useState(-1);
  const [typingActive, setTypingActive] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [kamalNotes, setKamalNotes] = useState([]);
  const [douaeNotes, setDouaeNotes] = useState([]);
  const [kamalIn, setKamalIn] = useState(false);
  const [douaeIn, setDouaeIn] = useState(false);
  const [showCta, setShowCta] = useState(false);

  // Lock scroll until animation is done (only when starting from the top)
  useEffect(() => {
    if (window.scrollY > 50) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (showCta) document.body.style.overflow = "";
  }, [showCta]);

  // Kamal glisse depuis la gauche, puis la frappe démarre
  useEffect(() => {
    const t1 = setTimeout(() => setKamalIn(true), 400);
    const t2 = setTimeout(() => {
      setBeatIndex(0);
      setCurrentText(SCRIPT[0].text);
      setTypingActive(true);
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleDone = () => {
    const beat = SCRIPT[beatIndex];
    if (beat.char === "kamal") setKamalNotes((n) => [...n, beat.note]);
    else setDouaeNotes((n) => [...n, beat.note]);

    setTypingActive(false);
    const next = beatIndex + 1;

    if (next >= SCRIPT.length) {
      setTimeout(() => setShowCta(true), 900);
      return;
    }

    const nextBeat = SCRIPT[next];
    const switchNow = beat.char === "kamal" && nextBeat.char === "douae";

    if (switchNow) {
      setTimeout(() => {
        setCurrentText("");
        setDouaeIn(true);
        setTimeout(() => {
          setBeatIndex(next);
          setCurrentText(nextBeat.text);
          setTypingActive(true);
        }, 2000);
      }, 600);
    } else {
      setTimeout(() => {
        setBeatIndex(next);
        setCurrentText(nextBeat.text);
        setTypingActive(true);
      }, 450);
    }
  };

  const displayed = useTypewriter(currentText, typingActive, handleDone);

  const isBig = beatIndex === 0 || beatIndex === KAMAL_COUNT;

  return (
    <section
      id="jeu"
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
    >
      <Background />
      <Road />

      {/* ── Theodo badge ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "var(--orange)",
            boxShadow: "0 0 10px var(--orange)",
          }}
        />
        <span
          style={{
            color: "var(--text)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
          }}
        >
          THEODO
        </span>
      </motion.div>

      {/* ── Dédicace ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          position: "absolute",
          top: 22,
          left: 24,
          zIndex: 30,
          color: "var(--muted)",
          fontSize: 11,
          letterSpacing: "0.1em",
          fontStyle: "italic",
        }}
      >
        pour Kamal. rien que pour toi.
      </motion.p>

      {/* ── Zone de frappe centrale ── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: isMobile ? 180 : 260,
          paddingTop: 80,
        }}
      >
        <AnimatePresence mode="wait">
          {(typingActive || displayed) && (
            <motion.div
              key={beatIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ textAlign: "center", padding: "0 24px", maxWidth: 620 }}
            >
              <p
                style={{
                  fontSize: isBig
                    ? "clamp(36px, 5.5vw, 64px)"
                    : "clamp(18px, 2.6vw, 26px)",
                  fontWeight: isBig ? 800 : 400,
                  color: isBig ? "var(--orange)" : "var(--text)",
                  letterSpacing: isBig ? "-0.02em" : "0.01em",
                  lineHeight: isBig ? 1.1 : 1.65,
                }}
              >
                {displayed}
                <Cursor />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Personnages + notes ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: isMobile ? 180 : 260,
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        {/* Kamal (gauche) */}
        <AnimatePresence>
          {kamalIn && (
            <motion.div
              key="kamal-char"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                left: "6%",
                bottom: 68,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <NotesStack notes={kamalNotes} side="left" />
              <Character src="/man.png" flip={false} height={isMobile ? 180 : 340} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Douae (droite) */}
        <AnimatePresence>
          {douaeIn && (
            <motion.div
              key="douae-char"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                right: "6%",
                bottom: 68,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <NotesStack notes={douaeNotes} side="right" />
              <Character src="/girl.png" flip={true} height={isMobile ? 180 : 340} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bouton CTA ── */}
      <AnimatePresence>
        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 30,
            }}
          >
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 40px rgba(249,115,22,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById("methode")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                background: "var(--orange)",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                padding: "13px 36px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 0 28px rgba(249,115,22,0.4)",
              }}
            >
              Découvrir mes projets →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
