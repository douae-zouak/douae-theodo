import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Title lines with their colors ─────────────────────────────────────────── */
const TITLE_LINES = [
  { text: "Donnez-moi",    color: "var(--muted)"  },
  { text: "2 mois.",       color: "var(--orange)" },
  { text: "Je vous donne", color: "var(--muted)"  },
  { text: "le reste.",     color: "var(--text)"   },
];
const TITLE_FULL = TITLE_LINES.map(l => l.text).join("\n");

/* Split flat displayed string into colored lines */
function renderTitle(displayed) {
  const parts = displayed.split("\n");
  return parts.map((part, i) => (
    <span key={i}>
      <span style={{ color: TITLE_LINES[i]?.color ?? "var(--text)" }}>{part}</span>
      {i < parts.length - 1 && <br />}
    </span>
  ));
}

/* ─── Description text ───────────────────────────────────────────────────────── */
const DESC = "Un stage PFA. Pas une observation.\nUn vrai projet, une vraie contribution, un vrai résultat.\nSi à la fin vous n'êtes pas convaincus —\nvous aurez quand même livré quelque chose.";

/* ─── Main section ───────────────────────────────────────────────────────────── */
export default function Close() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const [titleDisplayed, setTitleDisplayed] = useState("");
  const [afterTitle, setAfterTitle]         = useState(false);
  const timer = useRef(null);
  const start = useRef(null);

  useEffect(() => {
    clearTimeout(start.current);
    clearInterval(timer.current);

    if (!inView) {
      setTitleDisplayed("");
      setAfterTitle(false);
      return;
    }

    start.current = setTimeout(() => {
      let i = 0;
      timer.current = setInterval(() => {
        i++;
        setTitleDisplayed(TITLE_FULL.slice(0, i));
        if (i >= TITLE_FULL.length) {
          clearInterval(timer.current);
          setTimeout(() => setAfterTitle(true), 350);
        }
      }, 55);
    }, 300);

    return () => {
      clearTimeout(start.current);
      clearInterval(timer.current);
    };
  }, [inView]);

  const isTyping = titleDisplayed.length < TITLE_FULL.length;

  return (
    <section id="close" ref={ref} style={{
      padding: "10rem clamp(24px,8vw,96px)",
      borderTop: "1px solid var(--border)",
      textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(249,115,22,0.07) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            05 — La demande
          </div>
        </motion.div>

        {/* Title — typewriter */}
        <h1 style={{
          fontSize: "clamp(2.5rem,7vw,6rem)",
          fontWeight: 800, letterSpacing: "-0.04em",
          lineHeight: 0.95, marginBottom: "2.5rem", marginTop: "1rem",
          minHeight: "4.2em",
        }}>
          {renderTitle(titleDisplayed)}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror", ease: "linear" }}
              style={{ color: "var(--orange)", fontWeight: 300, marginLeft: 3 }}
            >|</motion.span>
          )}
        </h1>

        {/* Everything after title — appears once typing is done */}
        <AnimatePresence>
          {afterTitle && (
            <motion.div
              key="after"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Description */}
              <p style={{
                fontFamily: "var(--mono)", fontSize: 14,
                color: "var(--muted)", maxWidth: 480,
                margin: "0 auto 3rem", lineHeight: 1.8,
              }}>
                {DESC.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>

              {/* CTA */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=douaezouak6@gmail.com&su=Stage%20PFA%20Theodo%20%E2%80%94%20Douae%20Zouak"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: "var(--orange)", color: "#000",
                    fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700,
                    letterSpacing: "0.05em", padding: "14px 28px",
                    textDecoration: "none",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translate(-2px,-2px)";
                    e.currentTarget.style.boxShadow = "4px 4px 0 var(--orange-deep)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Écrire à Douae →
                </a>
              </motion.div>

              {/* Contacts */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                style={{ display: "flex", justifyContent: "center", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}
              >
                {[
                  { label: "Email",     value: "douaezouak6@gmail.com",    href: "https://mail.google.com/mail/?view=cm&to=douaezouak6@gmail.com", newTab: true  },
                  { label: "Téléphone", value: "+212 7 20 22 16 78",       href: "tel:+212720221678",                                            newTab: false },
                  { label: "LinkedIn",  value: "Douae Zouak",              href: "https://linkedin.com/in/douae-zouak",                          newTab: true  },
                ].map(c => (
                  <div key={c.label} style={{ textAlign: "left" }}>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: 10,
                      color: "var(--muted)", letterSpacing: "0.15em",
                      textTransform: "uppercase", marginBottom: "0.4rem",
                    }}>{c.label}</div>
                    <a href={c.href} target={c.newTab ? "_blank" : undefined} rel={c.newTab ? "noopener noreferrer" : undefined} style={{
                      fontSize: 15, fontWeight: 600, color: "var(--text)",
                      textDecoration: "none", transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--orange)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
                    >{c.value}</a>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
