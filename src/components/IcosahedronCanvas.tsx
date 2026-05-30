import { useEffect, useRef } from "react";

// Golden ratio icosahedron vertices
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTS: [number, number, number][] = [
  [-1,  PHI, 0], [ 1,  PHI, 0], [-1, -PHI, 0], [ 1, -PHI, 0],
  [ 0, -1,  PHI], [ 0,  1,  PHI], [ 0, -1, -PHI], [ 0,  1, -PHI],
  [ PHI, 0, -1], [ PHI, 0,  1], [-PHI, 0, -1], [-PHI, 0,  1],
];
const EDGES: [number, number][] = [
  [0,1],[0,5],[0,7],[0,10],[0,11],
  [1,5],[1,7],[1,8],[1,9],
  [2,3],[2,4],[2,6],[2,10],[2,11],
  [3,4],[3,6],[3,8],[3,9],
  [4,5],[4,9],[4,11],
  [5,9],[5,11],
  [6,7],[6,8],[6,10],
  [7,8],[7,10],
  [8,9],[10,11],
];

// Normalise vertices to unit sphere
const len = Math.sqrt(1 + PHI * PHI);
const VERTS = RAW_VERTS.map(([x, y, z]) => [x / len, y / len, z / len] as [number, number, number]);

export default function IcosahedronCanvas({ className = "" }: { className?: string }) {
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

    let angleX = 0, angleY = 0, angleZ = 0;
    let animId: number;

    const project = ([x, y, z]: [number, number, number], cx: number, cy: number, r: number): [number, number, number] => {
      // Rotate Y
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
      // Rotate X
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const y2 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX;
      // Rotate Z
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);
      const x3 = x1 * cosZ - y2 * sinZ, y3 = x1 * sinZ + y2 * cosZ;
      // Perspective divide
      const fov = 3.5;
      const scale = fov / (fov + z2);
      return [cx + x3 * r * scale, cy + y3 * r * scale, z2];
    };

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;
      const r  = Math.min(w, h) * 0.38;

      const projected = VERTS.map(v => project(v, cx, cy, r));

      for (const [a, b] of EDGES) {
        const [ax, ay, az] = projected[a];
        const [bx, by, bz] = projected[b];
        const depth = ((az + bz) / 2 + 1) / 2; // 0..1, closer = higher
        const alpha = 0.12 + depth * 0.28;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(26, 0, 204, ${alpha})`;
        ctx.lineWidth   = 0.8 + depth * 0.6;
        ctx.stroke();
      }

      for (const [px, py, pz] of projected) {
        const depth = (pz + 1) / 2;
        const alpha = 0.2 + depth * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, 1.5 + depth * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 0, 204, ${alpha})`;
        ctx.fill();
      }

      angleY += 0.004;
      angleX += 0.0025;
      angleZ += 0.001;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ display: "block" }} />;
}
