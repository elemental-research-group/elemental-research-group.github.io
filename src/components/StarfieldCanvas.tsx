import { useEffect, useRef } from "react";

// Deep-space starfield with constellation connections
// Parallaxes gently with mouse

type Star = { x: number; y: number; z: number; size: number; twinkle: number; phase: number };

export default function StarfieldCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const N_STARS = 140;
    let mouseX = 0.5, mouseY = 0.5;

    const stars: Star[] = Array.from({ length: N_STARS }, () => ({
      x:       Math.random(),
      y:       Math.random(),
      z:       Math.random(),            // depth 0=far, 1=close
      size:    Math.random() * 1.8 + 0.3,
      twinkle: Math.random() * 0.5 + 0.5,
      phase:   Math.random() * Math.PI * 2,
    }));

    // Build constellation edges between nearby stars
    const constellations: [number, number][] = [];
    for (let i = 0; i < N_STARS; i++) {
      let closest = -1, minD = 0.14;
      for (let j = i + 1; j < N_STARS; j++) {
        if (stars[j].z < 0.35) continue; // only connect bright (close) stars
        const d = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
        if (d < minD && constellations.filter(([a, b]) => a === i || b === i).length < 3) {
          minD = d; closest = j;
        }
      }
      if (closest >= 0) constellations.push([i, closest]);
    }

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width;
      mouseY = (e.clientY - r.top)  / r.height;
    });

    let t = 0, animId: number;

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.012;

      const px = (mouseX - 0.5) * 18;
      const py = (mouseY - 0.5) * 10;

      // Constellation lines first
      constellations.forEach(([a, b]) => {
        const sa = stars[a], sb = stars[b];
        const ax = (sa.x * w) + px * sa.z, ay = (sa.y * h) + py * sa.z;
        const bx = (sb.x * w) + px * sb.z, by = (sb.y * h) + py * sb.z;
        const alpha = Math.min(sa.z, sb.z) * 0.12;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(26,0,204,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      });

      // Stars
      stars.forEach(star => {
        const sx = star.x * w + px * star.z;
        const sy = star.y * h + py * star.z;
        const twinkle = star.twinkle * (0.7 + 0.3 * Math.sin(t * 1.1 + star.phase));
        const r = star.size * (0.5 + star.z * 0.5);
        const alpha = (0.15 + star.z * 0.65) * twinkle;

        // Glow for bright stars
        if (star.z > 0.6) {
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 5);
          grd.addColorStop(0, `rgba(100,80,255,${alpha * 0.4})`);
          grd.addColorStop(1, "rgba(26,0,204,0)");
          ctx.beginPath();
          ctx.arc(sx, sy, r * 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = star.z > 0.7
          ? `rgba(200,195,255,${alpha})`
          : `rgba(26,0,204,${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={className} style={{ display: "block" }} />;
}
