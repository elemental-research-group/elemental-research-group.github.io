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
              Elemental Research Lab is an independent open-source project exploring tools related to mechanistic interpretability of neural networks.
            </p>

            <div className="space-y-6 text-[#3a3a40] text-[16px] leading-[1.75] max-w-[60ch]">
              <p>
                We work on small open-source experiments that try to reverse-engineer how neural networks build internal representations. The aim is simple: explore tools that may help make models more interpretable, and share whatever we learn.
              </p>
              <p>
                The project sits at the intersection of <em className="italic text-[#18181b]">interpretability tooling</em>, <em className="italic text-[#18181b]">model diagnostics</em>, and <em className="italic text-[#18181b]">safety evaluation</em>. Everything we publish is open-source under the MIT license; there is no commercial product behind this page.
              </p>
              <p>
                We are not a startup, not a registered organisation, and not affiliated with any university. We are a small group that thinks understanding the systems we are building matters more than racing ahead of that understanding.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[#d6d0c4] flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span className="sc-label">Maintained by</span>
              <span className="font-display text-[18px] text-[#18181b] italic">Bhavith Chandra</span>
              <span className="text-[#d6d0c4]">·</span>
              <span className="sc-label">Licence</span>
              <span className="font-display text-[18px] text-[#18181b] italic">MIT (open source)</span>
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
                  { num: "03", title: "Safety Evaluation",       body: "Small experiments and reproducible notebooks for interpretability research." },
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
