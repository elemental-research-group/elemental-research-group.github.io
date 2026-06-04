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

// Generic backgrounds list — no third-party logo URLs, no external resource loads.
// Phrased as personal histories of contributors, not affiliations of the project.
const backgrounds = [
  "Universities in the United States",
  "Universities in the United Kingdom",
  "Universities in India",
  "Universities in Singapore",
  "Independent open-source contributors",
];

const team = [
  {
    name:  "Bhavith Chandra",
    role:  "Maintainer",
    bio:   "Maintains the project. Interested in mechanistic interpretability and small open-source tooling for understanding neural networks.",
    href:  "https://Bhavith-Chandra.github.io",
    initial: "B",
  },
  {
    name:  "Hindol Roy Choudhury",
    role:  "Research Contributor & Engineer ·",
    bio:   "Contributor and researcher at Elemental. Focused on developing interpretability tooling for world models",
    href:  "https://www.linkedin.com/in/hindol-choudhury/",
    initial: "H",
  },
  {
    name:  "Param Thakkar",
    role:  "Member · AI Safety and World Models Research",
    bio:   "Core contributor and researcher at Elemental. Focused on developing safe, environment agnostic world models and embodied AI",
    href:  "https://paramthakkar123.github.io/",
    initial: "P",
  },
  {
    name:  "Sanskar Pandey",
    role:  "Research Contributor & Engineer",
    bio:   "AI/ML research engineering and core contributor at Elemental. Works on interpretability, world models, continual learning, and alignment-aware architectures. Interests span AI safety, geometric ML, and paths toward AGI.",
    href:  "https://skar07.github.io",
    initial: "S",
  },
  {
    name:  "Yugandhar Reddy",
    role:  "Research Affiliate \u00b7 AI Interpretability & Safety",
    bio:   "Works on world model interpretability, LLM post-training, and alignment-aware systems at Elemental. Interests span mechanistic interpretability, AI safety, and scalable paths toward robust AGI.",
    href:  "https://yugandhargogireddy.com/",
    initial: "Y",
  },
];

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  useRevealSection(ref);

  return (
    <section id="team" ref={ref} className="relative bg-[#f8f5ee] bg-crosshairs py-14 lg:py-16 border-t border-[#d6d0c4] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14 relative z-10">

        {/* Section opener (kept consistent with other sections, but compact) */}
        <div className="reveal flex items-end justify-between gap-6 mb-10 pb-6 border-b border-[#d6d0c4]">
          <div className="flex items-baseline gap-5">
            <div>
              <div className="sc-label mb-1 text-[#1a00cc]">§ 03</div>
              <div className="font-mono text-[10px] text-[#8a8580] uppercase tracking-wider">People</div>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.4rem)] font-medium leading-tight text-[#18181b]">
              The team
            </h2>
          </div>
          <a
            href="https://Bhavith-Chandra.github.io"
            target="_blank" rel="noopener noreferrer"
            className="group hidden md:inline-flex items-center gap-2 text-[12px] text-[#3a3a40] hover:text-[#1a00cc] transition-colors"
          >
            <span className="ed-link">View full team</span>
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Compact team grid */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {team.map(p => (
            <a
              key={p.name}
              href={p.href}
              target="_blank" rel="noopener noreferrer"
              className="group block border border-[#d6d0c4] bg-white p-5 hover:border-[#1a00cc] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#1a00cc] text-white flex items-center justify-center font-display text-lg font-medium flex-shrink-0">
                  {p.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <h3 className="font-display text-[17px] font-medium text-[#18181b] group-hover:text-[#1a00cc] transition-colors leading-tight truncate">
                      {p.name}
                    </h3>
                    <svg className="w-3 h-3 text-[#b0aca3] group-hover:text-[#1a00cc] opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <div className="text-[11px] text-[#1a00cc] uppercase tracking-[0.1em] font-semibold mb-2.5">{p.role}</div>
                  <p className="text-[#6b6b70] text-[13px] leading-[1.6]">{p.bio}</p>
                </div>
              </div>
            </a>
          ))}

          {/* Placeholder card */}
          <div className="border border-dashed border-[#d6d0c4] bg-transparent p-5 flex items-center gap-4">
            <div className="w-11 h-11 border border-dashed border-[#d6d0c4] flex items-center justify-center text-[#b0aca3] flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div>
              <div className="font-display text-[15px] text-[#b0aca3] font-medium">More researchers</div>
              <div className="text-[12px] text-[#b0aca3]">Joining soon. Curiosity over credentials.</div>
            </div>
          </div>
        </div>

        {/* Philosophy — kept as quiet horizontal block */}
        <div className="reveal border-t border-b border-[#d6d0c4] py-8 px-2 mb-10">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-3">
              <div className="sc-label text-[#1a00cc]">Philosophy</div>
            </div>
            <p className="lg:col-span-9 font-display text-[18px] lg:text-[20px] text-[#18181b] font-light italic leading-[1.5]">
              "Progress in AI safety doesn&rsquo;t only come from publishing results. It comes from building <span className="not-italic text-[#1a00cc] font-normal">a community of researchers</span> who can carry the work forward."
            </p>
          </div>
          <p className="text-[#6b6b70] text-[13px] leading-[1.65] mt-5 max-w-[68ch] lg:ml-[25%]">
            We believe in altruism. We invest in early-stage researchers through mentorship, hands-on collaboration on real projects, and a research environment grounded in openness and shared purpose. If you are new to the field, we want to help you grow.
          </p>
        </div>

        {/* Backgrounds — generic, no specific institution names, no logos */}
        <div className="reveal">
          <div className="flex items-baseline gap-5 mb-4">
            <div className="sc-label text-[#1a00cc]">Contributor backgrounds</div>
            <div className="flex-1 h-px bg-[#d6d0c4]" />
          </div>

          <p className="text-[#6b6b70] text-[14px] leading-[1.65] mb-4 max-w-[68ch]">
            Contributors come from a mix of personal academic and open-source backgrounds. The list below is intentionally generic; this project does not claim institutional affiliation.
          </p>

          <ul className="flex flex-wrap gap-x-3 gap-y-2 mb-4">
            {backgrounds.map(b => (
              <li key={b}
                className="text-[#3a3a40] text-[13px] px-3 py-1 border border-[#d6d0c4] bg-white">
                {b}
              </li>
            ))}
          </ul>

          <div className="border-t border-[#d6d0c4] pt-3 text-[#8a8580] text-[11px] leading-[1.6] italic font-display">
            <strong className="not-italic font-semibold text-[#3a3a40]">Independent project.</strong> This is an independent open-source project on GitHub Pages. It does not represent any university, company, or institution.
          </div>
        </div>

      </div>
    </section>
  );
}
