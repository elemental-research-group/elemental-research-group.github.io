import { useEffect, useRef, useState } from "react";
import IcosahedronCanvas from "./IcosahedronCanvas";

function Counter({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      setTimeout(() => {
        let start: number | null = null;
        const tick = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1400, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, delay]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Hero() {
  return (
    <section id="hero" className="relative bg-[#f8f5ee] bg-radar pt-24 lg:pt-24 pb-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14">

        {/* Top context row */}
        <div className="flex items-center justify-between gap-6 pb-5 mb-8 border-b border-[#d6d0c4]"
          style={{ animation: "fadeUp 0.6s ease both" }}>
          <div className="flex items-center gap-5 text-[11px] text-[#8a8580]">
            <span className="font-mono uppercase tracking-[0.2em] text-[#1a00cc]">Elemental Research Lab</span>
            <span className="text-[#d6d0c4] hidden md:inline">·</span>
            <span className="hidden md:inline font-mono uppercase tracking-[0.2em]">Non-Profit · New York</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a00cc] animate-pulse" />
            <span className="font-mono uppercase tracking-[0.2em] text-[10px] text-[#1a00cc]">Active</span>
          </div>
        </div>

        {/* Main hero grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left — headline + lede */}
          <div className="lg:col-span-8">
            <h1 className="font-display font-medium leading-[1.04] tracking-[-0.02em] text-[#18181b]"
              style={{
                fontSize: "clamp(2.2rem, 4.6vw, 4rem)",
                animation: "fadeUp 0.8s 0.1s ease both", opacity: 0, animationFillMode: "forwards",
              }}>
              Reverse-engineering the <BlackBox /><br />
              of <em className="italic font-normal text-[#1a00cc]">modern AI</em>.
            </h1>

            <p className="font-display text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.5] text-[#3a3a40] font-light mt-6 max-w-[58ch]"
              style={{ animation: "fadeUp 0.8s 0.25s ease both", opacity: 0, animationFillMode: "forwards" }}>
              Elemental Research Lab is a non-profit group building open-source tools that make neural networks auditable. We work on interpretability, model diagnostics, and safety evaluation.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-7"
              style={{ animation: "fadeUp 0.8s 0.4s ease both", opacity: 0, animationFillMode: "forwards" }}>
              <button
                onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#18181b] text-[#f8f5ee] text-[12px] font-medium hover:bg-[#1a00cc] transition-colors duration-200"
              >
                Explore the research
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a
                href="https://github.com/Bhavith-Chandra/WorldModelLens" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 border border-[#d6d0c4] text-[#18181b] text-[12px] font-medium hover:border-[#1a00cc] hover:text-[#1a00cc] transition-colors duration-200 bg-transparent"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                WorldModelLens
                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — focus + stats + 3D ico */}
          <aside className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-[#d6d0c4] space-y-5"
            style={{ animation: "fadeUp 0.8s 0.5s ease both", opacity: 0, animationFillMode: "forwards" }}>

            {/* 3D icosahedron */}
            <div className="relative h-32 bg-[#f3eee2] border border-[#d6d0c4] overflow-hidden">
              <IcosahedronCanvas className="w-full h-full" />
              <div className="absolute bottom-2 left-2 text-[9px] text-[#8a8580] font-mono uppercase tracking-[0.15em]">
                Live · interpretability
              </div>
            </div>

            <div>
              <div className="sc-label text-[#1a00cc] mb-2">Currently building</div>
              <a href="https://github.com/Bhavith-Chandra/WorldModelLens" target="_blank" rel="noopener noreferrer"
                className="group block">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-[19px] text-[#18181b] font-medium group-hover:text-[#1a00cc] transition-colors leading-tight">
                    WorldModelLens
                  </h3>
                  <svg className="w-3.5 h-3.5 text-[#b0aca3] group-hover:text-[#1a00cc] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div className="text-[#6b6b70] text-[12px] leading-[1.5] mt-1">
                  Observability tooling for world models. Currently studying Meta&rsquo;s I-JEPA.
                </div>
              </a>
            </div>

            <div className="border-t border-[#d6d0c4] pt-4">
              <div className="sc-label text-[#1a00cc] mb-2">At a glance</div>
              <ul className="space-y-0">
                {[
                  { label: "Team size",         value: "Small (1)" },
                  { label: "Active project",    value: "1" },
                  { label: "Established",       value: "2025" },
                  { label: "License",           value: "MIT · Open source" },
                ].map((s, i) => (
                  <li key={s.label}
                    className={`flex items-baseline justify-between gap-4 py-2 ${i < 3 ? "border-b border-[#d6d0c4]" : ""}`}>
                    <span className="text-[#6b6b70] text-[12px]">{s.label}</span>
                    <span className="font-display text-[15px] font-medium text-[#18181b] leading-none">
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}

// Compact "black box" treatment
function BlackBox() {
  return (
    <span className="relative inline-flex items-center px-[0.32em] py-[0.04em] bg-[#18181b] text-[#f8f5ee] font-display italic align-baseline group hover:bg-[#1a00cc] transition-colors duration-300 cursor-default">
      <span className="absolute top-0 left-0 w-[6px] h-[6px] border-t-[1.5px] border-l-[1.5px] border-[#1a00cc] -translate-x-[3px] -translate-y-[3px] group-hover:border-[#f8f5ee] transition-colors" />
      <span className="absolute top-0 right-0 w-[6px] h-[6px] border-t-[1.5px] border-r-[1.5px] border-[#1a00cc] translate-x-[3px] -translate-y-[3px] group-hover:border-[#f8f5ee] transition-colors" />
      <span className="absolute bottom-0 left-0 w-[6px] h-[6px] border-b-[1.5px] border-l-[1.5px] border-[#1a00cc] -translate-x-[3px] translate-y-[3px] group-hover:border-[#f8f5ee] transition-colors" />
      <span className="absolute bottom-0 right-0 w-[6px] h-[6px] border-b-[1.5px] border-r-[1.5px] border-[#1a00cc] translate-x-[3px] translate-y-[3px] group-hover:border-[#f8f5ee] transition-colors" />
      black&nbsp;box
    </span>
  );
}

const s = document.createElement("style");
s.textContent = `@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }`;
document.head.appendChild(s);
