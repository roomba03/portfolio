import { useEffect, useRef } from "react";

// Anchor position (%) and how strongly each glow drifts toward the cursor —
// lower influence keeps a blob closer to its resting spot, so the cluster
// reshapes around the cursor instead of collapsing onto it.
const GLOWS = [
  { name: "glow1", x: 72, y: 8, influence: 0.22 },
  { name: "glow2", x: 14, y: 30, influence: 0.3 },
  { name: "glow3", x: 85, y: 68, influence: 0.26 },
  { name: "glow4", x: 30, y: 90, influence: 0.18 },
];

export default function BackgroundGlow() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const root = document.documentElement;
    const cursor = { x: 50, y: 50 };
    const pos = GLOWS.map((g) => ({ x: g.x, y: g.y }));

    const handleMove = (e) => {
      cursor.x = (e.clientX / window.innerWidth) * 100;
      cursor.y = (e.clientY / window.innerHeight) * 100;
    };
    window.addEventListener("mousemove", handleMove);

    let raf;
    const tick = () => {
      GLOWS.forEach((g, i) => {
        const targetX = g.x + (cursor.x - g.x) * g.influence;
        const targetY = g.y + (cursor.y - g.y) * g.influence;
        pos[i].x += (targetX - pos[i].x) * 0.04;
        pos[i].y += (targetY - pos[i].y) * 0.04;
        root.style.setProperty(`--${g.name}-x`, `${pos[i].x}%`);
        root.style.setProperty(`--${g.name}-y`, `${pos[i].y}%`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
