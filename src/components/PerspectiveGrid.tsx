import { useEffect, useRef } from "react";

export default function PerspectiveGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    let offset = 0;
    let animId: number;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cols  = 14;
      const rows  = 10;
      const vp    = { x: w / 2, y: -h * 0.2 };   // vanishing point above canvas
      const step  = w / cols;

      // Fade mask: transparent at top, visible at bottom
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0,   "rgba(26,0,204,0)");
      grad.addColorStop(0.4, "rgba(26,0,204,0.06)");
      grad.addColorStop(1,   "rgba(26,0,204,0.13)");

      ctx.strokeStyle = grad as unknown as string;
      ctx.lineWidth   = 0.7;

      // Horizontal lines — evenly spaced along the bottom, converging to vp
      for (let r = 0; r <= rows; r++) {
        const t    = (r / rows);
        const ease = Math.pow(t, 1.5);           // denser near horizon
        const y    = h * ease;
        // Each horizontal line is drawn from left edge to right edge at this y
        // The x coordinates are found by lerping between left/right vanishing points
        const lx = vp.x + (0 - vp.x) * (y - vp.y) / (h * 0.9 - vp.y);
        const rx = vp.x + (w - vp.x) * (y - vp.y) / (h * 0.9 - vp.y);

        const alpha = ease * 0.35;
        ctx.beginPath();
        ctx.globalAlpha = alpha;
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.stroke();
      }

      // Vertical lines — from vanishing point, radiating downward, with scrolling offset
      const scrolledOffset = (offset % step);
      for (let c = -2; c <= cols + 2; c++) {
        const bx = c * step + scrolledOffset;   // bottom x
        const alpha = 0.12 + 0.08 * Math.abs(Math.sin(c * 0.4));
        ctx.beginPath();
        ctx.globalAlpha = alpha;
        ctx.moveTo(vp.x, vp.y);
        ctx.lineTo(bx, h);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      offset += 0.3;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
