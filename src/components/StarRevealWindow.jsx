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

function buildStars(W, H, layout = "line") {
  if (layout === "cluster") {
    const cx = W * 0.5;
    const cy = H * 0.5;
    // Proportional to the wrap size (140px is the reference size the
    // offsets/sizes below were tuned at) so the cluster scales with its
    // container instead of staying a fixed pixel size.
    const s = Math.min(W, H) / 140;
    return [
      pathMeta(buildStarPath(cx - 27 * s, cy - 19 * s, 19 * s)),
      pathMeta(buildStarPath(cx + 27 * s, cy - 3 * s, 15 * s)),
      pathMeta(buildStarPath(cx - 5 * s, cy + 30 * s, 14 * s)),
    ];
  }

  const cy = H * 0.5;
  const spacing = W * 0.26;
  const cx = W * 0.5;
  return [
    pathMeta(buildStarPath(cx - spacing, cy, 18)),
    pathMeta(buildStarPath(cx, cy, 18)),
    pathMeta(buildStarPath(cx + spacing, cy, 18)),
  ];
}

// Fills the canvas with a palette gradient — this is the "ground truth"
// colorful fill the star dabs reveal.
function drawPaletteFill(ctx, W, H) {
  ctx.clearRect(0, 0, W, H);
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#A7CECB");
  grad.addColorStop(0.5, "#8BA6A9");
  grad.addColorStop(1, "#CACC90");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

// Paints one soft, feathered dab onto the reveal mask — additive, so
// overlapping dabs along a path build up a smooth painted stroke.
function addDab(maskCtx, x, y, radius) {
  const grad = maskCtx.createRadialGradient(x, y, 0, x, y, radius);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  maskCtx.fillStyle = grad;
  maskCtx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}

export default function StarRevealWindow({ layout = "line" }) {
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const vividCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    vividCanvasRef.current = document.createElement("canvas");
    maskCanvasRef.current = document.createElement("canvas");
    let cancelled = false;

    const composite = (W, H) => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(vividCanvasRef.current, 0, 0);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskCanvasRef.current, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    };

    const setup = () => {
      const W = wrap.offsetWidth;
      const H = wrap.offsetHeight;
      if (W === 0 || H === 0) {
        stateRef.current = null;
        return false;
      }
      canvas.width = W;
      canvas.height = H;
      vividCanvasRef.current.width = W;
      vividCanvasRef.current.height = H;
      maskCanvasRef.current.width = W;
      maskCanvasRef.current.height = H;

      drawPaletteFill(vividCanvasRef.current.getContext("2d"), W, H);

      stateRef.current = {
        W,
        H,
        stars: buildStars(W, H, layout),
        starIndex: 0,
        t: 0,
        done: false,
        lastTime: null,
      };

      composite(W, H);
      return true;
    };

    const frame = (now) => {
      const st = stateRef.current;
      if (!st || st.done) return;
      if (st.lastTime == null) st.lastTime = now;
      const dt = now - st.lastTime;
      st.lastTime = now;

      const maskCtx = maskCanvasRef.current.getContext("2d");
      const star = st.stars[st.starIndex];
      const prevT = st.t;
      const newT = Math.min(1, prevT + dt * 0.0009);

      // Sub-sample the new segment so fast frames don't leave gaps in the
      // painted trail.
      const steps = Math.max(1, Math.ceil((newT - prevT) * 200));
      for (let i = 1; i <= steps; i++) {
        const tt = prevT + (newT - prevT) * (i / steps);
        const point = pointAtT(star, tt);
        const pressure = 3.5 + 2.5 * Math.abs(Math.sin(tt * Math.PI * 6));
        addDab(maskCtx, point.x, point.y, pressure);
      }
      st.t = newT;

      composite(st.W, st.H);

      if (newT >= 1) {
        st.starIndex += 1;
        st.t = 0;
        st.lastTime = null;
        if (st.starIndex >= st.stars.length) {
          // Pause briefly, then clear the mask and regenerate stars so the
          // reveal restarts fresh.
          const W = st.W;
          const H = st.H;
          setTimeout(() => {
            if (cancelled) return;
            maskCanvasRef.current.getContext("2d").clearRect(0, 0, W, H);
            st.stars = buildStars(W, H, layout);
            st.starIndex = 0;
            st.t = 0;
            st.lastTime = null;
            composite(W, H);
            rafRef.current = requestAnimationFrame(frame);
          }, 10000);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    const start = () => {
      if (setup()) {
        rafRef.current = requestAnimationFrame(frame);
      }
    };

    start();

    // A plain `resize` listener only fires on viewport changes — it misses
    // the case where the wrap itself has zero size at mount (e.g. a brief
    // 0-width frame during initial layout/font settling) and never
    // recovers. ResizeObserver catches that too, since it reports the
    // current size as soon as it starts observing.
    let resizeTimeout;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (cancelled) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        start();
      }, 150);
    });
    ro.observe(wrap);

    return () => {
      cancelled = true;
      ro.disconnect();
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
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <div role="img" aria-label="Decorative star reveal animation" style={{ width: "100%", height: "100%" }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block", willChange: "transform" }}
        />
      </div>
    </div>
  );
}
