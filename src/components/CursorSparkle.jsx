import { useEffect, useRef } from "react";

const COLORS = ["#F4D35E", "#048BA8", "#CACC90", "#332F1C"];
const SPECK_COLORS = ["#E0A93A", "#8A6FB0", "#3E8FA0"];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

// Smooth rise-and-fall envelope (0 → 1 → 0) so a sparkle pops in fast,
// holds near full brightness, then dies away — a twinkle, not a fade.
function twinkleEnvelope(t) {
  return Math.pow(Math.sin(Math.min(t, 1) * Math.PI), 0.6);
}

function drawSparkle(ctx, x, y, size, rotation, alpha, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 1.8;

  ctx.lineWidth = Math.max(1, size * 0.2);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(0, size);
  ctx.moveTo(-size, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  const d = size * 0.55;
  ctx.lineWidth *= 0.65;
  ctx.beginPath();
  ctx.moveTo(-d, -d);
  ctx.lineTo(d, d);
  ctx.moveTo(-d, d);
  ctx.lineTo(d, -d);
  ctx.stroke();

  ctx.restore();
}

function drawSpeck(ctx, x, y, radius, alpha, color) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = radius * 4;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Sparkle trail that follows the cursor — purely decorative, sits in a
// fixed full-viewport canvas above content but never intercepts pointer
// events.
export default function CursorSparkle() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || isTouch) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    let lastSpawn = 0;
    let lastTime = performance.now();
    let rafId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e) => {
      const suppressed = !!(
        e.target &&
        e.target.closest &&
        e.target.closest(
          'a, button, p, span, h1, h2, h3, h4, h5, h6, li, label, [data-sparkle-suppress="true"]'
        )
      );
      if (suppressed) {
        particles.length = 0;
        return;
      }

      const now = performance.now();
      if (now - lastSpawn < 75) return;
      lastSpawn = now;
      const count = Math.random() < 0.5 ? 1 : 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          kind: "cross",
          x: e.clientX + rand(-12, 12),
          y: e.clientY + rand(-12, 12),
          size: rand(3, 7),
          rotation: rand(0, Math.PI),
          spin: rand(-0.004, 0.004),
          life: 0,
          maxLife: rand(420, 650),
          driftX: rand(-4, 4),
          driftY: rand(-10, -2),
          color: COLORS[Math.floor(rand(0, COLORS.length))],
        });
      }

      const speckCount = 1 + Math.floor(rand(0, 2));
      for (let i = 0; i < speckCount; i++) {
        particles.push({
          kind: "speck",
          x: e.clientX + rand(-20, 20),
          y: e.clientY + rand(-20, 20),
          size: rand(0.7, 1.8),
          life: 0,
          maxLife: rand(400, 650),
          driftX: rand(-4, 4),
          driftY: rand(-8, -1),
          color: SPECK_COLORS[Math.floor(rand(0, SPECK_COLORS.length))],
          twinklePhase: rand(0, Math.PI * 2),
          twinkleSpeed: rand(0.025, 0.05),
        });
      }
    };
    window.addEventListener("mousemove", handleMove);

    const tick = (now) => {
      const dt = now - lastTime;
      lastTime = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        const t = p.life / p.maxLife;
        p.x += p.driftX * (dt / 1000);
        p.y += p.driftY * (dt / 1000);

        if (p.kind === "speck") {
          const shimmer = 0.3 + 0.7 * Math.abs(Math.sin(p.life * p.twinkleSpeed + p.twinklePhase));
          const envelope = twinkleEnvelope(t);
          drawSpeck(ctx, p.x, p.y, p.size, envelope * shimmer, p.color);
        } else {
          p.rotation += p.spin * dt;
          const envelope = twinkleEnvelope(t);
          const size = p.size * (0.7 + 0.3 * envelope);
          drawSparkle(ctx, p.x, p.y, size, p.rotation, envelope, p.color);
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
