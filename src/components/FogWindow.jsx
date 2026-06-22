import React, { useEffect, useRef, useState } from "react";

function rand(min, max) {
  return min + Math.random() * (max - min);
}

// Builds a messy, hand-drawn-looking 5-point star as a closed polyline.
function buildStarPath(cx, cy, size) {
  const points = [];
  const N = 10;
  for (let i = 0; i < N; i++) {
    const isOuter = i % 2 === 0;
    const baseAngle = -Math.PI / 2 + (i * Math.PI) / 5;
    const angle = baseAngle + rand(-0.32, 0.32);
    const radiusFactor = isOuter ? rand(0.82, 1.18) : rand(0.22, 0.44);
    const r = size * radiusFactor;
    points.push({
      x: cx + Math.cos(angle) * r + rand(-1.5, 1.5),
      y: cy + Math.sin(angle) * r + rand(-1.5, 1.5),
    });
  }
  points.push({ ...points[0] });
  return points;
}

function pathMeta(points) {
  let total = 0;
  const cum = [0];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
    cum.push(total);
  }
  return { points, total, cum };
}

function pointAtT(meta, t) {
  const { points, cum, total } = meta;
  const target = Math.max(0, Math.min(1, t)) * total;
  for (let i = 1; i < cum.length; i++) {
    if (target <= cum[i] || i === cum.length - 1) {
      const segLen = cum[i] - cum[i - 1];
      const segT = segLen === 0 ? 0 : (target - cum[i - 1]) / segLen;
      return {
        x: points[i - 1].x + (points[i].x - points[i - 1].x) * segT,
        y: points[i - 1].y + (points[i].y - points[i - 1].y) * segT,
      };
    }
  }
  return points[points.length - 1];
}

// One tiny irregular speck of condensation: a rotated ellipse, a small blob,
// or a short smear stroke.
function drawSpeck(ctx, x, y) {
  const kind = Math.random();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rand(0, Math.PI * 2));
  ctx.fillStyle = `rgba(255,255,255,${rand(0.04, 0.14)})`;
  if (kind < 0.4) {
    const rx = rand(0.4, 2.2);
    const ry = rx * rand(0.4, 0.9);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind < 0.7) {
    ctx.beginPath();
    ctx.arc(0, 0, rand(0.4, 1.6), 0, Math.PI * 2);
    ctx.fill();
  } else {
    const len = rand(0.6, 2.2);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = rand(0.3, 0.7);
    ctx.beginPath();
    ctx.moveTo(-len / 2, 0);
    ctx.lineTo(len / 2, 0);
    ctx.stroke();
  }
  ctx.restore();
}

function buildFogLayer(fogCanvas, W, H) {
  fogCanvas.width = W;
  fogCanvas.height = H;
  const ctx = fogCanvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over";

  // The cloud is centered on the star cluster itself and fades to nothing
  // well before the canvas edges (the nearest edge is ~0.36*min(W,H) away),
  // so there's contrast for the stars to appear against without ever
  // showing a hard box boundary.
  const cx = W * 0.64;
  const cy = H * 0.64;
  const cloudRadius = Math.min(W, H) * 0.3;
  const cloud = ctx.createRadialGradient(cx, cy, 0, cx, cy, cloudRadius);
  cloud.addColorStop(0, "rgba(182,186,192,0.5)");
  cloud.addColorStop(0.55, "rgba(182,186,192,0.22)");
  cloud.addColorStop(1, "rgba(182,186,192,0)");
  ctx.fillStyle = cloud;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 200; i++) {
    const angle = rand(0, Math.PI * 2);
    const dist = Math.sqrt(Math.random()) * 100;
    drawSpeck(ctx, cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist);
  }
}

function eraseAt(fogCtx, x, y, radius) {
  fogCtx.globalCompositeOperation = "destination-out";
  const grad = fogCtx.createRadialGradient(x, y, 0, x, y, radius);
  grad.addColorStop(0, "rgba(0,0,0,1)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  fogCtx.fillStyle = grad;
  fogCtx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  fogCtx.globalCompositeOperation = "source-over";
}

function buildStars(W, H) {
  const cx = W * 0.64;
  const cy = H * 0.64;
  return [
    pathMeta(buildStarPath(cx - 22, cy - 22, 26)),
    pathMeta(buildStarPath(cx + 30, cy - 6, 19)),
    pathMeta(buildStarPath(cx + 3, cy + 30, 14)),
  ];
}

export default function FogWindow() {
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const fogCanvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    fogCanvasRef.current = document.createElement("canvas");

    const setup = () => {
      const W = wrap.offsetWidth;
      const H = wrap.offsetHeight;
      // Hidden via the small-viewport media query (display: none) — nothing
      // to size or draw until it's shown again.
      if (W === 0 || H === 0) {
        stateRef.current = null;
        return false;
      }
      canvas.width = W;
      canvas.height = H;

      buildFogLayer(fogCanvasRef.current, W, H);

      stateRef.current = {
        W,
        H,
        stars: buildStars(W, H),
        starIndex: 0,
        t: 0,
        done: false,
        lastTime: null,
      };

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(fogCanvasRef.current, 0, 0);
      return true;
    };

    const frame = (now) => {
      const st = stateRef.current;
      if (!st || st.done) return;
      if (st.lastTime == null) st.lastTime = now;
      const dt = now - st.lastTime;
      st.lastTime = now;

      const fogCtx = fogCanvasRef.current.getContext("2d");
      const star = st.stars[st.starIndex];
      const prevT = st.t;
      const newT = Math.min(1, prevT + dt * 0.0009);

      // Sub-sample the new segment so fast frames don't leave gaps in the
      // erased trail.
      const steps = Math.max(1, Math.ceil((newT - prevT) * 200));
      let point = null;
      for (let i = 1; i <= steps; i++) {
        const tt = prevT + (newT - prevT) * (i / steps);
        point = pointAtT(star, tt);
        const pressure = 3.5 + 2.5 * Math.abs(Math.sin(tt * Math.PI * 6));
        eraseAt(fogCtx, point.x, point.y, pressure);
      }
      st.t = newT;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, st.W, st.H);
      ctx.drawImage(fogCanvasRef.current, 0, 0);

      if (newT >= 1) {
        st.starIndex += 1;
        st.t = 0;
        st.lastTime = null;
        if (st.starIndex >= st.stars.length) {
          // Instead of finishing, loop: pause briefly, rebuild the fog
          // layer and regenerate stars so the effect restarts fresh.
          const W = st.W;
          const H = st.H;
          setTimeout(() => {
            buildFogLayer(fogCanvasRef.current, W, H);
            st.stars = buildStars(W, H);
            st.starIndex = 0;
            st.t = 0;
            st.lastTime = null;
            // kick off the next frame
            rafRef.current = requestAnimationFrame(frame);
          }, 10000);
          return; // stop this rAF; the setTimeout will restart animation
        }
      }

      if (point) {
        const fgrad = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 14);
        fgrad.addColorStop(0, "rgba(255,255,255,0.35)");
        fgrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = fgrad;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    if (setup()) {
      rafRef.current = requestAnimationFrame(frame);
    }

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const wasDone = stateRef.current?.done;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const sized = setup();
        if (!sized) return; // hidden (e.g. small-viewport media query) — nothing to draw

        if (wasDone) {
          // Redraw the finished stars instantly at the new size — no
          // re-animating, no fog reappearing.
          const st = stateRef.current;
          const fogCtx = fogCanvasRef.current.getContext("2d");
          st.stars.forEach((star) => {
            const N = 300;
            for (let i = 0; i <= N; i++) {
              const p = pointAtT(star, i / N);
              eraseAt(fogCtx, p.x, p.y, 5);
            }
          });
          st.done = true;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, st.W, st.H);
          ctx.drawImage(fogCanvasRef.current, 0, 0);
        } else {
          rafRef.current = requestAnimationFrame(frame);
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={wrapRef}
      className="fog-wrap"
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 320,
        height: 320,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <div role="img" aria-label="Decorative fog animation" style={{ width: "100%", height: "100%" }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block", willChange: "transform" }}
        />
      </div>
    </div>
  );
}
