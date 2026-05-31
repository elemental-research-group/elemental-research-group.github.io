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

const contributors = [
  { abbr: "NYU",      name: "New York University",        color: "#57068c",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/NYU_logo.svg/240px-NYU_logo.svg.png" },
  { abbr: "Stanford", name: "Stanford University",         color: "#8C1515",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/240px-Stanford_University_seal_2003.svg.png" },
  { abbr: "Harvard",  name: "Harvard University",          color: "#A51C30",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/240px-Harvard_University_coat_of_arms.svg.png" },
  { abbr: "UCB",      name: "UC Berkeley",                 color: "#003262",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/240px-Seal_of_University_of_California%2C_Berkeley.svg.png" },
  { abbr: "ICL",      name: "Imperial College London",     color: "#003e74",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Imperial_College_London_crest.svg/200px-Imperial_College_London_crest.svg.png" },
  { abbr: "NUS",      name: "National Univ. of Singapore", color: "#003d7c",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/National_University_of_Singapore_coat_of_arms.svg/240px-National_University_of_Singapore_coat_of_arms.svg.png" },
  { abbr: "UoB",      name: "Univ. of Birmingham",         color: "#06215e",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/University_of_Birmingham_coat_of_arms.svg/240px-University_of_Birmingham_coat_of_arms.svg.png" },
  { abbr: "IITH",     name: "IIT Hyderabad",               color: "#1a3c6e",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/IIT_Hyderabad_Logo.svg/200px-IIT_Hyderabad_Logo.svg.png" },
  { abbr: "VJTI",     name: "VJTI Mumbai",                 color: "#1a3c6e",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Vjti_logo.png/200px-Vjti_logo.png" },
  { abbr: "HRT",      name: "Hudson River Trading",        color: "#0a0a14",
    logo: "https://logo.clearbit.com/hudsonrivertrading.com" },
];

const marqueeItems = [...contributors, ...contributors];

const team = [
  {
    name:  "Bhavith Chandra",
    role:  "Lead · AI Safety Research Engineer",
    bio:   "Leads core research initiatives at Elemental. Focused on mechanistic interpretability and building open-source tooling for safe AI.",
    href:  "https://Bhavith-Chandra.github.io",
    initial: "B",
  },
  {
    name:  "Skar",
    role:  "Research Engineer · AI/ML Systems",
    bio:   "AI/ML research engineering and core contributor at Elemental. Works on interpretability, world models, continual learning, and alignment-aware architectures. Interests span AI safety, geometric ML, and paths toward AGI.",
    href:  "https://skar07.github.io",
    initial: "S",
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

        {/* Contributors marquee */}
        <div className="reveal">
          <div className="flex items-baseline gap-5 mb-5">
            <div className="sc-label text-[#1a00cc]">Contributors from</div>
            <div className="flex-1 h-px bg-[#d6d0c4]" />
            <div className="text-[11px] text-[#8a8580] font-mono uppercase tracking-[0.18em]">{contributors.length} institutions</div>
          </div>

          <div className="relative overflow-hidden bg-white border border-[#d6d0c4] py-6"
            style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
            <div className="marquee-track">
              {marqueeItems.map((inst, i) => (
                <div key={i}
                  className="mx-7 flex items-center gap-3.5 group flex-shrink-0"
                  title={inst.name}>
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 relative">
                    <img
                      src={inst.logo}
                      alt={inst.name}
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        const sib = t.nextElementSibling as HTMLElement | null;
                        if (sib) sib.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-11 h-11 items-center justify-center font-display text-white text-[13px] font-semibold absolute inset-0 hidden"
                      style={{ backgroundColor: inst.color }}
                    >
                      {inst.abbr.slice(0, 3)}
                    </div>
                  </div>
                  <div className="leading-tight">
                    <div className="font-display text-[14px] text-[#18181b] font-medium whitespace-nowrap">{inst.abbr}</div>
                    <div className="text-[10px] text-[#8a8580] whitespace-nowrap">{inst.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[#8a8580] text-[11px] italic font-display mt-3">
            A non-exhaustive list of institutions our researchers, collaborators and advisors come from.
          </p>
        </div>

      </div>
    </section>
  );
}
