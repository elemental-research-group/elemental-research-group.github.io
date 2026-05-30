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

const reasons = [
  {
    num: "i",
    title: "Detect Deceptive Behavior",
    body: "Inspect what models actually compute before deployment—rather than relying on behavioural evaluations that can miss misaligned internals.",
  },
  {
    num: "ii",
    title: "Build Auditable Trust",
    body: "Provide auditable evidence of how decisions are made, moving beyond black-box testing toward verifiable, transparent explanations.",
  },
  {
    num: "iii",
    title: "Inform AI Governance",
    body: "Supply the technical tools needed for third-party audits and regulatory oversight—bridging interpretability research and AI policy.",
  },
  {
    num: "iv",
    title: "Advance the Science",
    body: "Contribute fundamental knowledge about how learned representations form and evolve in neural networks—understanding intelligence itself.",
  },
];

export default function WhyItMatters() {
  const ref = useRef<HTMLElement>(null);
  useRevealSection(ref);

  return (
    <section id="why" ref={ref} className="relative bg-[#efeae0] py-14 lg:py-16 border-t border-[#d6d0c4] overflow-hidden">
      {/* halftone band running through the middle */}
      <div className="absolute inset-0 bg-halftone pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14 relative z-10">

        {/* Section opener */}
        <div className="reveal grid lg:grid-cols-12 gap-10 mb-10 lg:mb-12 items-end">
          <div className="lg:col-span-3">
            <div className="sc-label mb-2 text-[#1a00cc]">§ 04</div>
            <div className="font-mono text-[11px] text-[#8a8580] uppercase tracking-wider">Mission</div>
          </div>
          <h2 className="lg:col-span-9 font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.05] text-[#18181b]">
            Why we think this work<br />
            is <em className="italic font-normal text-[#1a00cc]">urgent</em>.
          </h2>
        </div>

        {/* Lead paragraph */}
        <div className="reveal grid lg:grid-cols-12 gap-10 mb-10 lg:mb-12">
          <div className="lg:col-span-7 lg:col-start-2">
            <p className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.4] text-[#18181b] font-light">
              As AI systems are deployed in higher-stakes domains, the ability to understand and audit their internal decision-making moves from <em className="italic text-[#1a00cc]">academic interest</em> to <em className="italic text-[#1a00cc]">practical necessity</em>.
            </p>
            <p className="text-[#6b6b70] text-[15px] leading-[1.7] mt-6 max-w-[60ch]">
              Mechanistic interpretability offers a concrete path forward. Four reasons stand out.
            </p>
          </div>
        </div>

        {/* Reasons — newspaper columns */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 border-t border-[#d6d0c4] pt-8">
          {reasons.map((r) => (
            <article key={r.num} className="group">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display italic text-[28px] text-[#1a00cc] leading-none">{r.num}.</span>
                <div className="flex-1 h-px bg-[#d6d0c4] group-hover:bg-[#1a00cc] transition-colors" />
              </div>
              <h3 className="font-display text-[22px] font-medium leading-tight text-[#18181b] mb-3 group-hover:text-[#1a00cc] transition-colors">
                {r.title}
              </h3>
              <p className="text-[#3a3a40] text-[14px] leading-[1.65]">{r.body}</p>
            </article>
          ))}
        </div>

        {/* Pull quote — bottom */}
        <div className="reveal-scale mt-14 lg:mt-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-10 lg:col-start-2">
            <div className="flex flex-col items-start">
              <span className="font-display text-[120px] leading-[0.6] text-[#1a00cc]/15 select-none">"</span>
              <blockquote className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.25] text-[#18181b] font-light italic mt-2">
                Understanding how models work internally is a <span className="not-italic font-normal text-[#1a00cc]">prerequisite</span> for deploying them responsibly.
              </blockquote>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-px bg-[#1a00cc]" />
                <span className="font-display text-[14px] italic text-[#6b6b70]">— Elemental Research Lab</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
