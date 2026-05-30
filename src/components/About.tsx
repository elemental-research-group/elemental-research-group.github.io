import { useEffect, useRef } from "react";

function useRevealSection(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const s = ref.current; if (!s) return;
    const els = s.querySelectorAll(".reveal, .reveal-left, .reveal-scale");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useRevealSection(ref);

  return (
    <section id="about" ref={ref} className="relative bg-[#f8f5ee] bg-contour py-14 lg:py-16 border-t border-[#d6d0c4] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14 relative z-10">

        {/* Section opener — editorial style */}
        <div className="reveal grid lg:grid-cols-12 gap-10 mb-10 lg:mb-12 items-end">
          <div className="lg:col-span-3">
            <div className="sc-label mb-2 text-[#1a00cc]">§ 01</div>
            <div className="font-mono text-[11px] text-[#8a8580] uppercase tracking-wider">About</div>
          </div>
          <h2 className="lg:col-span-9 font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.05] text-[#18181b]">
            We believe understanding<br />
            comes <em className="italic font-normal text-[#1a00cc]">before</em> deployment.
          </h2>
        </div>

        {/* Editorial body */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Main column */}
          <div className="lg:col-span-7 lg:col-start-2 reveal">
            <p className="font-display text-[22px] lg:text-[26px] leading-[1.45] text-[#18181b] font-light mb-12">
              Elemental Research Lab is a non-profit research group based in New York, dedicated to advancing AI safety through mechanistic interpretability.
            </p>

            <div className="space-y-6 text-[#3a3a40] text-[16px] leading-[1.75] max-w-[60ch]">
              <p>
                We bring together researchers and engineers from leading institutions worldwide to build open-source tools that reverse-engineer neural networks. The aim is simple: make them auditable so we can understand what they actually compute.
              </p>
              <p>
                The lab operates at the intersection of <em className="italic text-[#18181b]">interpretability tooling</em>, <em className="italic text-[#18181b]">model diagnostics</em>, and <em className="italic text-[#18181b]">safety evaluation</em>. Our work is unencumbered by commercial pressure. Every artifact we produce remains free and open to the broader AI safety community.
              </p>
              <p>
                We are not a startup. We are not a product company. We are a small group of researchers who think that understanding the systems we are building matters more than racing ahead of that understanding.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[#d6d0c4] flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="sc-label">Founded by</span>
              <span className="font-display text-[18px] text-[#18181b] italic">Bhavith &amp; Team</span>
              <span className="text-[#d6d0c4]">·</span>
              <span className="sc-label">Based in</span>
              <span className="font-display text-[18px] text-[#18181b] italic">New York, NY</span>
            </div>
          </div>

          {/* Right sidebar: index */}
          <aside className="lg:col-span-4 reveal delay-200">
            <div className="sticky top-28">
              <div className="sc-label mb-5">Three pillars</div>
              <ol className="space-y-0">
                {[
                  { num: "01", title: "Interpretability Tooling", body: "Open-source frameworks that dissect what neural networks compute internally." },
                  { num: "02", title: "Model Diagnostics",       body: "Rigorous tests for whether models actually use what they appear to attend to." },
                  { num: "03", title: "Safety Evaluation",       body: "Reproducible benchmarks for assessing the behaviour of frontier models." },
                ].map((p, i) => (
                  <li key={p.num}
                    className={`flex gap-5 py-6 group ${i < 2 ? "border-b border-[#d6d0c4]" : ""}`}>
                    <span className="font-mono text-[11px] text-[#1a00cc] pt-1 flex-shrink-0">{p.num}</span>
                    <div>
                      <div className="font-display text-[17px] text-[#18181b] font-medium mb-1.5 group-hover:text-[#1a00cc] transition-colors">{p.title}</div>
                      <div className="text-[#6b6b70] text-[14px] leading-[1.6]">{p.body}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
