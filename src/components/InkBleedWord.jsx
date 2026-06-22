import React, { useEffect, useRef } from "react";

const PINK = "#CACC90";
const PAGE_BG = "#FAF8EF";
const REACH = 130; // px radius the bleed grows to — scoped to a single word

// Same cursor-chasing pink-reveal effect as the old full-headline version,
// but scoped to one inline word so the rest of a sentence stays plain text.
export default function InkBleedWord({ text }) {
  const wrapRef = useRef(null);
  const eraserRef = useRef(null);
  const pinkRef = useRef(null);
  const rafRef = useRef(null);
  const state = useRef({ bx: 50, by: 50, radius: 0, targetRadius: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const s = state.current;

    const handleMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      s.bx = ((e.clientX - rect.left) / rect.width) * 100;
      s.by = ((e.clientY - rect.top) / rect.height) * 100;
      s.targetRadius = REACH;
    };
    const handleLeave = () => { s.targetRadius = 0; };
    const handleTap = () => {
      s.bx = 50;
      s.by = 50;
      s.targetRadius = s.targetRadius > 0 ? 0 : REACH;
    };

    // Attach both hover and tap handling unconditionally — relying on
    // matchMedia to pick "the right" input mode can misfire on hybrid
    // devices (trackpads, some touchscreens) and silently kill the effect.
    wrap.addEventListener("mousemove", handleMove);
    wrap.addEventListener("mouseleave", handleLeave);
    wrap.addEventListener("click", handleTap);

    const tick = () => {
      s.radius += reduceMotion ? s.targetRadius - s.radius : (s.targetRadius - s.radius) * 0.12;
      const clip = `circle(${Math.max(s.radius, 0)}px at ${s.bx}% ${s.by}%)`;
      if (pinkRef.current) pinkRef.current.style.clipPath = clip;
      if (eraserRef.current) eraserRef.current.style.clipPath = clip;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("mousemove", handleMove);
      wrap.removeEventListener("mouseleave", handleLeave);
      wrap.removeEventListener("click", handleTap);
    };
  }, []);

  return (
    <span ref={wrapRef} className="relative inline-block" data-sparkle-suppress="true" style={{ cursor: "default" }}>
      <span style={{ color: "#000000" }}>{text}</span>
      <span
        ref={eraserRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: PAGE_BG,
          pointerEvents: "none",
          clipPath: "circle(0px at 50% 50%)",
        }}
      />
      <span
        ref={pinkRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: "-4px",
          width: "100%",
          height: "100%",
          color: PINK,
          fontFamily: "'Ka Blam', sans-serif",
          fontWeight: 400,
          textTransform: "uppercase",
          pointerEvents: "none",
          clipPath: "circle(0px at 50% 50%)",
          textShadow: "3px 3px 0 #332F1C, 5px 5px 0 rgba(51,47,28,0.25)",
        }}
      >
        {text}
      </span>
    </span>
  );
}
