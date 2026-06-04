import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Splits text into words and staggers them in on scroll.
 * Props:
 *   text      — string
 *   as        — HTML tag ("h1","h2","p","span" …)
 *   style     — inline style object
 *   delay     — base delay (s)
 *   stagger   — delay between words (s)
 *   margin    — IntersectionObserver margin
 */
export default function AnimatedText({
  text,
  as: Tag = "p",
  style = {},
  delay = 0,
  stagger = 0.045,
  margin = "-60px",
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, margin });

  const words = text.split(" ");

  return (
    <Tag ref={ref} style={{ ...style, overflow: "visible" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.65,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
