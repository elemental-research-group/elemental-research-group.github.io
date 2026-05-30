import { useState, useEffect, useRef } from "react";

function useRevealSection(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const s = ref.current; if (!s) return;
    const els = s.querySelectorAll(".reveal, .reveal-scale");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const projects = [
  {
    id: "wml", num: "I",
    label: "Flagship Project",
    title: "WorldModelLens",
    subtitle: "World Model Observability",
    status: "Active",
    desc: "An open-source observability layer for analyzing, debugging, and understanding world models—built specifically for AI safety and interpretability research.",
    detail: "Currently targeting Meta's I-JEPA (Image-based Joint-Embedding Predictive Architecture) as its initial subject. The framework will scale to other architectures as it matures. Researchers can inspect how world models build internal representations, where those representations diverge from ground truth, and how prediction errors propagate through the network.",
    href: "https://github.com/Bhavith-Chandra/WorldModelLens",
    linkLabel: "github · WorldModelLens",
    features: ["Observability tooling", "Replay analysis", "Representation inspection", "Error propagation tracking"],
    pipeline: null,
  },
  {
    id: "aaf", num: "II",
    label: "Diagnostic Framework",
    title: "AAF",
    subtitle: "Attribution-Attention Faithfulness",
    status: "Active",
    desc: "A rigorous diagnostic that asks an uncomfortable question: is the model actually using the information it claims to attend to?",
    detail: "AAF separates causal reality (what the model uses, measured by Integrated Gradients) from the model's own claim (its attention weights). The faithfulness gap between these signals is a key diagnostic for trust in deployed systems—and one that is rarely measured.",
    href: null, linkLabel: null,
    features: ["Integrated Gradients computation", "Attention weight extraction", "Faithfulness comparison metrics", "Causal attribution mapping"],
    pipeline: [
      { n: "1", title: "Causal Attribution",   desc: "Compute Integrated Gradients per patch against Latent MSE—revealing what actually drove the prediction." },
      { n: "2", title: "Attention Extraction", desc: "Extract raw attention weights from the audited layer—the model's own claim about where it is looking." },
      { n: "3", title: "Faithfulness Audit",   desc: "Bipartite comparison between IG map and attention map using two distinct faithfulness metrics." },
    ],
  },
  {
    id: "eval", num: "III",
    label: "In Development",
    title: "Eval Suite",
    subtitle: "Evaluation & Diagnostic Tooling",
    status: "Development",
    desc: "A broader suite of evaluation tools providing standardized, reproducible metrics for assessing model internals.",
    detail: "Focused on re-introducing rigorous evaluation benchmarks into the interpretability workflow. All tooling will be released as open-source as projects mature.",
    href: null, linkLabel: null,
    features: ["Standardized interpretability metrics", "Reproducible benchmarks", "Model internals assessment", "Open-source release pipeline"],
    pipeline: null,
  },
];

export default function Research() {
  const [active, setActive] = useState("wml");
  const ref = useRef<HTMLElement>(null);
  useRevealSection(ref);
  const proj = projects.find(p => p.id === active)!;

  return (
    <section id="research" ref={ref} className="bg-[#efeae0] bg-blueprint py-14 lg:py-16 border-t border-[#d6d0c4] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14 relative z-10">

        {/* Section opener */}
        <div className="reveal grid lg:grid-cols-12 gap-10 mb-10 lg:mb-12 items-end">
          <div className="lg:col-span-3">
            <div className="sc-label mb-2 text-[#1a00cc]">§ 02</div>
            <div className="font-mono text-[11px] text-[#8a8580] uppercase tracking-wider">Work</div>
          </div>
          <div className="lg:col-span-9 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.05] text-[#18181b]">
              Three projects.<br />
              One <em className="italic font-normal text-[#1a00cc]">shared</em> goal.
            </h2>
          </div>
        </div>

        {/* Project list — paper-citation style */}
        <div className="reveal grid lg:grid-cols-12 gap-x-8 gap-y-4 mb-12">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`lg:col-span-4 text-left group transition-colors duration-200 border-t-2 pt-5 ${
                active === p.id ? "border-[#1a00cc]" : "border-[#d6d0c4] hover:border-[#18181b]"
              }`}
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className={`font-display italic text-[14px] ${active === p.id ? "text-[#1a00cc]" : "text-[#8a8580]"}`}>{p.num}.</span>
                <span className={`font-mono text-[10px] uppercase tracking-[0.15em] ${
                  p.status === "Active" ? "text-[#1a00cc]" : "text-[#8a8580]"
                }`}>
                  {p.status === "Active" ? "● Active" : "○ In development"}
                </span>
              </div>
              <h3 className={`font-display text-[28px] font-medium leading-tight transition-colors ${
                active === p.id ? "text-[#1a00cc]" : "text-[#18181b] group-hover:text-[#1a00cc]"
              }`}>
                {p.title}
              </h3>
              <div className="text-[#6b6b70] text-[14px] mt-1.5 italic font-display">{p.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Active project detail — paper layout */}
        <div className="reveal-scale border-t border-[#d6d0c4] pt-6 lg:pt-8 grid lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Left: main body */}
          <div className="lg:col-span-7 lg:col-start-2">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono text-[11px] text-[#1a00cc] uppercase tracking-[0.18em]">{proj.label}</span>
              <span className="text-[#d6d0c4]">·</span>
              <span className="font-display text-[14px] italic text-[#6b6b70]">{proj.subtitle}</span>
            </div>

            <h3 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-[1.05] text-[#18181b] mb-5">
              {proj.title}
            </h3>

            <p className="font-display text-[20px] leading-[1.5] text-[#3a3a40] font-light mb-4">
              {proj.desc}
            </p>

            <p className="text-[#3a3a40] text-[15px] leading-[1.75] mb-6 max-w-[60ch]">
              {proj.detail}
            </p>

            {proj.href && (
              <a href={proj.href} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 text-[#1a00cc] text-[14px] font-medium">
                <span className="ed-link">{proj.linkLabel}</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-4">
            {proj.pipeline ? (
              <>
                <div className="sc-label mb-4 text-[#1a00cc]">Pipeline</div>
                <ol className="space-y-0">
                  {proj.pipeline.map((s, i) => (
                    <li key={i} className={`flex gap-4 py-5 ${i < proj.pipeline!.length - 1 ? "border-b border-[#d6d0c4]" : ""}`}>
                      <span className="font-display text-[28px] font-medium italic text-[#1a00cc] leading-none w-7 flex-shrink-0">{s.n}</span>
                      <div>
                        <div className="font-display text-[16px] text-[#18181b] font-medium mb-1">{s.title}</div>
                        <div className="text-[#6b6b70] text-[13px] leading-[1.6]">{s.desc}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <>
                <div className="sc-label mb-4 text-[#1a00cc]">Capabilities</div>
                <ul className="space-y-0">
                  {proj.features.map((f, i) => (
                    <li key={i}
                      className="flex items-baseline gap-3 py-3 border-b border-[#d6d0c4] last:border-0">
                      <span className="font-mono text-[10px] text-[#1a00cc]">{String(i+1).padStart(2,"0")}</span>
                      <span className="text-[#3a3a40] text-[14px]">{f}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>

        </div>
      </div>
    </section>
  );
}
