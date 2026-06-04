import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e) => {
      const el = e.target;
      setHovering(
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        el.closest("button") ||
        el.closest("a") ||
        el.style?.cursor === "pointer"
      );
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousemove", checkHover);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.body.style.cursor = "";
    };
  }, []);

  // Slow trailing dot
  useEffect(() => {
    let frame;
    const animate = () => {
      setTrail((t) => ({
        x: t.x + (pos.x - t.x) * 0.12,
        y: t.y + (pos.y - t.y) * 0.12,
      }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  return (
    <>
      {/* Main dot */}
      <motion.div
        animate={{
          x: pos.x - (clicking ? 3 : hovering ? 0 : 4),
          y: pos.y - (clicking ? 3 : hovering ? 0 : 4),
          width: clicking ? 6 : hovering ? 36 : 8,
          height: clicking ? 6 : hovering ? 36 : 8,
          opacity: hovering ? 0.25 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        style={{
          position: "fixed",
          borderRadius: "50%",
          background: "var(--orange)",
          pointerEvents: "none",
          zIndex: 99999,
          top: 0,
          left: 0,
          border: hovering ? "1.5px solid var(--orange)" : "none",
          boxShadow: "0 0 8px rgba(249,115,22,0.6)",
        }}
      />
      {/* Trail ring */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(249,115,22,0.3)",
          transform: `translate(${trail.x - 14}px, ${trail.y - 14}px)`,
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />
    </>
  );
}
