import { useEffect, useRef } from "react";

// Layered neural network — interpretability themed
// Mouse influences camera rotation; hover near a node highlights its fan-in/fan-out

const LAYERS = [3, 5, 7, 7, 5, 3];
const BLUE   = { r: 26,  g: 0,   b: 204 };
const ACTIVE = { r: 90,  g: 120, b: 255 };
const PULSE  = { r: 180, g: 160, b: 255 };

type Vec3 = [number, number, number];

function buildNetwork() {
  const nodes: { pos: Vec3; layer: number; idx: number }[] = [];
  const edges: { a: number; b: number }[] = [];

  LAYERS.forEach((count, li) => {
    const xSpread = (LAYERS.length - 1) * 0.9;
    const x = (li / (LAYERS.length - 1)) * xSpread - xSpread / 2;
    for (let i = 0; i < count; i++) {
      const y = (i / (count - 1 || 1)) * 1.4 - 0.7;
      const z = (Math.random() - 0.5) * 0.18;
      nodes.push({ pos: [x, y, z], layer: li, idx: nodes.length });
    }
  });

  // Connect adjacent layers
  let offset = 0;
  LAYERS.forEach((count, li) => {
    if (li < LAYERS.length - 1) {
      const nextOffset = offset + count;
      const nextCount  = LAYERS[li + 1];
      for (let a = offset; a < offset + count; a++) {
        for (let b = nextOffset; b < nextOffset + nextCount; b++) {
          edges.push({ a, b });
        }
      }
    }
    offset += count;
  });

  return { nodes, edges };
}

function rotateY([x, y, z]: Vec3, a: number): Vec3 {
  return [x * Math.cos(a) - z * Math.sin(a), y, x * Math.sin(a) + z * Math.cos(a)];
}
function rotateX([x, y, z]: Vec3, a: number): Vec3 {
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
function project([x, y, z]: Vec3, w: number, h: number): [number, number, number] {
  const fov  = 4.5;
  const scale = fov / (fov + z) * Math.min(w, h) * 0.38;
  return [w / 2 + x * scale, h / 2 - y * scale, z];
}

export default function NeuralNetCanvas({ className = "" }: { className?: string }) {
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

    const { nodes, edges } = buildNetwork();

    // Camera state
    let camY = 0, camX = 0.12;
    let targetY = 0, targetX = 0.12;
    let mouseX = 0.5, mouseY = 0.5;
    let hoveredNode = -1;

    // Activation pulses: { edgeIdx, progress, alpha }
    type Pulse = { path: number[]; t: number; speed: number };
    const pulses: Pulse[] = [];
    let fireTimer = 0;

    // Node activations (brightness boost 0..1)
    const nodeActivation = new Float32Array(nodes.length);

    const firePulse = () => {
      // Pick random starting layer-0 node
      const startIdx = Math.floor(Math.random() * LAYERS[0]);
      const path: number[] = [startIdx];
      let cur = startIdx;
      let layerOffset = 0;
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const nextLayerStart = layerOffset + LAYERS[li];
        const nextLayerEnd   = nextLayerStart + LAYERS[li + 1];
        cur = nextLayerStart + Math.floor(Math.random() * LAYERS[li + 1]);
        path.push(cur);
        layerOffset += LAYERS[li];
      }
      pulses.push({ path, t: 0, speed: 0.004 + Math.random() * 0.003 });
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width;
      mouseY = (e.clientY - r.top)  / r.height;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    let animId: number;

    const draw = (ts: number) => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Camera ease
      targetY = (mouseX - 0.5) *  0.55;
      targetX = (mouseY - 0.5) * -0.25 + 0.12;
      camY += (targetY - camY) * 0.04;
      camX += (targetX - camX) * 0.04;

      // Auto rotation drift
      camY += 0.0012;

      // Project all nodes
      const proj = nodes.map(n => {
        let p = n.pos as Vec3;
        p = rotateY(p, camY);
        p = rotateX(p, camX);
        return project(p, w, h);
      });

      // Find hovered node
      let hov = -1;
      let minD = 28;
      proj.forEach(([px, py], i) => {
        const mx = mouseX * w, my = mouseY * h;
        const d = Math.hypot(px - mx, py - my);
        if (d < minD) { minD = d; hov = i; }
      });
      hoveredNode = hov;

      // Draw edges
      edges.forEach(({ a, b }) => {
        const [ax, ay, az] = proj[a];
        const [bx, by, bz] = proj[b];
        const depth = ((az + bz) / 2 + 1.5) / 3;
        const act   = (nodeActivation[a] + nodeActivation[b]) / 2;
        const isHovEdge = hoveredNode === a || hoveredNode === b;

        let alpha = 0.04 + depth * 0.06 + act * 0.3;
        let r = BLUE.r, g = BLUE.g, bl = BLUE.b;
        if (act > 0.1) { r = ACTIVE.r; g = ACTIVE.g; bl = ACTIVE.b; alpha += 0.2; }
        if (isHovEdge) { alpha = 0.55; r = ACTIVE.r; g = ACTIVE.g; bl = ACTIVE.b; }

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
        ctx.lineWidth   = isHovEdge ? 1.2 : 0.5 + act * 1;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      });

      // Draw pulse particles along edges
      pulses.forEach(pulse => {
        const segCount = pulse.path.length - 1;
        const globalT  = pulse.t * segCount;
        const segIdx   = Math.min(Math.floor(globalT), segCount - 1);
        const segT     = globalT - segIdx;

        const a = pulse.path[segIdx], b = pulse.path[segIdx + 1];
        const [ax, ay] = proj[a];
        const [bx, by] = proj[b];
        const px = ax + (bx - ax) * segT;
        const py = ay + (by - ay) * segT;

        // Activate destination node
        if (segT > 0.8) nodeActivation[b] = Math.min(1, nodeActivation[b] + 0.6);

        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 10);
        grd.addColorStop(0, `rgba(${PULSE.r},${PULSE.g},${PULSE.b},0.9)`);
        grd.addColorStop(1, "rgba(90,120,255,0)");
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,235,255,0.95)`;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n, i) => {
        const [px, py, pz] = proj[i];
        const depth = (pz + 1.5) / 3;
        const act   = nodeActivation[i];
        const isHov = hoveredNode === i;
        const r     = 3.5 + depth * 2 + act * 4 + (isHov ? 5 : 0);

        if (isHov || act > 0.05) {
          const grd = ctx.createRadialGradient(px, py, 0, px, py, r * 3.5);
          grd.addColorStop(0, `rgba(90,120,255,${0.3 + act * 0.4})`);
          grd.addColorStop(1, "rgba(26,0,204,0)");
          ctx.beginPath();
          ctx.arc(px, py, r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        const alpha = 0.25 + depth * 0.4 + act * 0.35 + (isHov ? 0.4 : 0);
        ctx.fillStyle = `rgba(26,0,204,${alpha})`;
        ctx.fill();
      });

      // Decay activations
      for (let i = 0; i < nodeActivation.length; i++) {
        nodeActivation[i] *= 0.975;
      }

      // Advance pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }

      // Schedule new pulse
      fireTimer += 16;
      if (fireTimer > 1800 + Math.random() * 1200) {
        firePulse();
        fireTimer = 0;
      }

      animId = requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: "block", cursor: "crosshair" }}
    />
  );
}
