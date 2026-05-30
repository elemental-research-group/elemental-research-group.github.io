import { useEffect, useRef } from "react";

// Interactive 3D neuron connectome — click to trigger cascade activations
// Space + neuroscience aesthetic

type Vec3 = [number, number, number];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

export default function NeuronCluster({ className = "" }: { className?: string }) {
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

    const N = 55;

    // Nodes on sphere surface with Fibonacci lattice
    const nodes: Vec3[] = Array.from({ length: N }, (_, i) => {
      const golden = Math.PI * (3 - Math.sqrt(5));
      const y   = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const phi = golden * i;
      return [Math.cos(phi) * rad, y, Math.sin(phi) * rad] as Vec3;
    });

    // Connect nearby nodes
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        if (Math.sqrt(dx*dx + dy*dy + dz*dz) < 0.65) edges.push([i, j]);
      }
    }

    // Build adjacency list
    const adj: number[][] = Array.from({ length: N }, () => []);
    edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });

    let camY = 0, camX = 0.15;
    let mouseX = 0.5, mouseY = 0.5;
    const activation  = new Float32Array(N);
    const firing      = new Float32Array(N);      // 0..1 flash
    const axonT       = new Map<string, number>(); // "a-b" -> 0..1
    const axonDir     = new Map<string, number>(); // direction node idx

    const triggerCascade = (start: number) => {
      const visited = new Set<number>();
      const queue: { n: number; depth: number }[] = [{ n: start, depth: 0 }];
      const fire = (n: number, delay: number) => {
        setTimeout(() => {
          firing[n] = 1;
          activation[n] = Math.min(1, activation[n] + 0.8);
          adj[n].forEach(nb => {
            if (!visited.has(nb)) {
              visited.add(nb);
              const key = `${Math.min(n, nb)}-${Math.max(n, nb)}`;
              axonT.set(key, 0);
              axonDir.set(key, n);
              fire(nb, 200 + Math.random() * 300);
            }
          });
        }, delay);
      };
      visited.add(start);
      fire(start, 0);
    };

    const onClick = (e: MouseEvent) => {
      const r  = canvas.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width;
      const my = (e.clientY - r.top)  / r.height;
      const w  = canvas.offsetWidth, h = canvas.offsetHeight;
      const R  = Math.min(w, h) * 0.38;
      const cx = w / 2, cy = h / 2;

      let best = -1, bestD = 20;
      nodes.forEach((n, i) => {
        let [x, y, z] = n;
        const cosY = Math.cos(camY), sinY = Math.sin(camY);
        const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
        const cosX = Math.cos(camX), sinX = Math.sin(camX);
        const y2 = y * cosX - z1 * sinX;
        const fov = 3.5, scale = fov / (fov + z1) * R;
        const px = cx + x1 * scale, py = cy - y2 * scale;
        const d = Math.hypot(mx * w - px, my * h - py);
        if (d < bestD) { bestD = d; best = i; }
      });
      if (best >= 0) triggerCascade(best);
      else triggerCascade(Math.floor(Math.random() * N));
    };

    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width;
      mouseY = (e.clientY - r.top)  / r.height;
    });

    // Auto-fire random cascades
    let autoTimer = 0;

    let animId: number;
    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Camera
      const ty = (mouseX - 0.5) * 0.4;
      const tx = (mouseY - 0.5) * -0.2 + 0.15;
      camY += (ty - camY) * 0.03;
      camX += (tx - camX) * 0.03;
      camY += 0.003;

      const R  = Math.min(w, h) * 0.38;
      const cx = w / 2, cy = h / 2;

      // Project
      const proj = nodes.map(([x, y, z]) => {
        const cosY = Math.cos(camY), sinY = Math.sin(camY);
        const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
        const cosX = Math.cos(camX), sinX = Math.sin(camX);
        const y2 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX;
        const fov = 3.5, scale = fov / (fov + z2) * R;
        return [cx + x1 * scale, cy - y2 * scale, z2] as Vec3;
      });

      // Draw edges + axon pulses
      edges.forEach(([a, b]) => {
        const [ax, ay, az] = proj[a];
        const [bx, by, bz] = proj[b];
        const depth = ((az + bz) / 2 + 1) / 2;
        const act   = (activation[a] + activation[b]) / 2;
        const alpha = 0.05 + depth * 0.08 + act * 0.25;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(26,0,204,${alpha})`;
        ctx.lineWidth   = 0.5 + act * 1.2;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();

        // Axon signal
        const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
        const t   = axonT.get(key);
        if (t !== undefined) {
          const dir = axonDir.get(key)!;
          const [sx, sy] = dir === a ? [ax, ay] : [bx, by];
          const [ex, ey] = dir === a ? [bx, by] : [ax, ay];
          const px = sx + (ex - sx) * easeOut(t);
          const py = sy + (ey - sy) * easeOut(t);

          const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
          grd.addColorStop(0, "rgba(160,140,255,0.95)");
          grd.addColorStop(1, "rgba(26,0,204,0)");
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          axonT.set(key, t + 0.025);
          if (t >= 1) axonT.delete(key);
        }
      });

      // Draw nodes
      nodes.forEach((_, i) => {
        const [px, py, pz] = proj[i];
        const depth = (pz + 1) / 2;
        const act   = activation[i];
        const fire  = firing[i];
        const r     = 2.5 + depth * 2.5 + act * 3 + fire * 4;

        if (act > 0.05 || fire > 0.05) {
          const grd = ctx.createRadialGradient(px, py, 0, px, py, r * 4);
          grd.addColorStop(0, `rgba(100,80,255,${0.35 * (act + fire * 0.5)})`);
          grd.addColorStop(1, "rgba(26,0,204,0)");
          ctx.beginPath();
          ctx.arc(px, py, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,0,204,${0.2 + depth * 0.35 + act * 0.4 + fire * 0.3})`;
        ctx.fill();
      });

      // Decay
      for (let i = 0; i < N; i++) {
        activation[i] *= 0.97;
        firing[i]     *= 0.88;
      }

      autoTimer++;
      if (autoTimer > 180) {
        triggerCascade(Math.floor(Math.random() * N));
        autoTimer = 0;
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: "block", cursor: "pointer" }}
      title="Click anywhere to trigger an activation cascade"
    />
  );
}
