import { useEffect, useRef } from "react";

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

const roles = [
  {
    name: "Researcher",
    desc: "Collaborate on mechanistic interpretability research. Contribute to open problems, co-author papers, and access tooling infrastructure.",
    cta: "Reach out",
  },
  {
    name: "Engineer",
    desc: "Contribute to open-source projects like WorldModelLens and AAF. Help build the tooling that makes neural networks auditable at scale.",
    cta: "Open the repo",
  },
  {
    name: "Policy",
    desc: "Engage with the technical foundations of AI governance. We help bridge interpretability research and the regulatory landscape.",
    cta: "Start a conversation",
  },
];

export default function GetInvolved() {
  const ref = useRef<HTMLElement>(null);
  useRevealSection(ref);

  return (
    <section id="involved" ref={ref} className="relative bg-[#f8f5ee] bg-radar py-14 lg:py-16 border-t border-[#d6d0c4] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14 relative z-10">

        {/* Section opener */}
        <div className="reveal grid lg:grid-cols-12 gap-10 mb-10 lg:mb-12 items-end">
          <div className="lg:col-span-3">
            <div className="sc-label mb-2 text-[#1a00cc]">§ 05</div>
            <div className="font-mono text-[11px] text-[#8a8580] uppercase tracking-wider">Contact</div>
          </div>
          <h2 className="lg:col-span-9 font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.05] text-[#18181b]">
            If this is the work<br />
            you want to do, <em className="italic font-normal text-[#1a00cc]">write</em>.
          </h2>
        </div>

        {/* Three roles — paper style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 border-t border-[#d6d0c4] pt-8 mb-6 lg:mb-10">
          {roles.map((item, i) => (
            <article key={item.name}
              className={`reveal delay-${i * 100} group cursor-default`}>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display italic text-[28px] text-[#1a00cc] leading-none">{String.fromCharCode(97 + i)}.</span>
                <div className="flex-1 h-px bg-[#d6d0c4] group-hover:bg-[#1a00cc] transition-colors" />
              </div>
              <h3 className="font-display text-[28px] font-medium leading-tight text-[#18181b] mb-3 group-hover:text-[#1a00cc] transition-colors">
                {item.name}
              </h3>
              <p className="text-[#3a3a40] text-[14px] leading-[1.65] mb-4">{item.desc}</p>
              <div className="flex items-center gap-2 text-[#6b6b70] text-[13px] font-medium group-hover:text-[#1a00cc] transition-colors">
                <span className="ed-link">{item.cta}</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </article>
          ))}
        </div>

        {/* CTA editorial block */}
        <div className="reveal-scale border-t border-[#1a00cc] pt-6 lg:pt-8 grid lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 lg:col-start-2">
            <div className="sc-label text-[#1a00cc] mb-5">Open · Non-Profit</div>
            <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] text-[#18181b] mb-5">
              All research outputs remain open and accessible.
            </h3>
            <p className="text-[#3a3a40] text-[16px] leading-[1.7] max-w-[58ch]">
              Our non-profit structure ensures tools, frameworks, and findings stay freely available to the AI safety community—unencumbered by commercial pressure.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-7">
              <a href="https://github.com/Bhavith-Chandra/WorldModelLens" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-2.5 bg-[#1a00cc] text-white text-[13px] font-medium hover:bg-[#1400a8] transition-colors duration-200">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View the source
              </a>
              <a href="mailto:bc4066@nyu.edu" className="group inline-flex items-center gap-2 text-[#18181b] text-[13px] font-medium">
                <span className="ed-link">bc4066@nyu.edu</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sc-label text-[#1a00cc] mb-5">Status</div>
            <ul className="space-y-0">
              {[
                { label: "Team size",      value: "Small (1)" },
                { label: "Active project", value: "1"         },
                { label: "Established",    value: "2025"      },
                { label: "License",        value: "MIT"       },
              ].map((s, i) => (
                <li key={s.label}
                  className={`flex items-baseline justify-between gap-4 py-2.5 ${i < 3 ? "border-b border-[#d6d0c4]" : ""}`}>
                  <span className="text-[#6b6b70] text-[13px]">{s.label}</span>
                  <span className="font-display text-[20px] font-medium text-[#18181b]">{s.value}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

      </div>
    </section>
  );
}
