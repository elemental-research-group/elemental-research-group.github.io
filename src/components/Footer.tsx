import { Logo } from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#18181b] text-[#d6d0c4] py-16 lg:py-20 border-t-2 border-[#1a00cc]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14">

        {/* Top — masthead */}
        <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-white/10 mb-10">

          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-5">
              <Logo size={32} color="#ffffff" />
              <div className="leading-none">
                <div className="font-display text-[22px] font-medium text-white">Elemental</div>
                <div className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-1">Research Lab</div>
              </div>
            </div>
            <p className="text-white/60 text-[14px] leading-[1.7] max-w-[36ch] mb-6">
              An independent open-source project on GitHub Pages exploring mechanistic interpretability tools.
            </p>
            <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#9a8fff] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9a8fff] animate-pulse" />
              Active research · Est. 2025
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="sc-label text-white/50 mb-5">Research</div>
            <ul className="space-y-3">
              <li>
                <a href="https://github.com/Bhavith-Chandra/WorldModelLens" target="_blank" rel="noopener noreferrer"
                  className="font-display text-white hover:text-[#9a8fff] transition-colors ed-link">
                  WorldModelLens
                </a>
              </li>
              <li className="font-display text-white/40">AAF Framework</li>
              <li className="font-display text-white/40">Eval Suite</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="sc-label text-white/50 mb-5">Focus</div>
            <ul className="space-y-3 text-white/60 text-[14px]">
              <li>AI Safety</li>
              <li>Interpretability</li>
              <li>Model Diagnostics</li>
              <li>Evaluation</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="sc-label text-white/50 mb-5">Connect</div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a href="https://github.com/Bhavith-Chandra" target="_blank" rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#9a8fff] transition-colors ed-link">
                  Maintainer
                </a>
              </li>
              <li>
                <a href="https://github.com/Bhavith-Chandra/WorldModelLens" target="_blank" rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#9a8fff] transition-colors ed-link">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant wordmark — editorial flourish */}
        <div className="font-display text-[clamp(4rem,15vw,12rem)] font-medium leading-[0.85] text-white/[0.06] tracking-tight overflow-hidden whitespace-nowrap">
          Elemental<em className="italic text-[#1a00cc]/30">Research</em>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-white/10 text-white/40 text-[12px] leading-[1.6] max-w-3xl">
          <strong className="text-white/60 font-semibold">About this site.</strong>{" "}
          Elemental Research Lab is a small, independent open-source research project.
          It is not affiliated with, endorsed by, or sponsored by any university,
          company, or government body. Institutional names that appear on this page
          refer only to the personal educational or professional backgrounds of
          individual contributors. Source code:{" "}
          <a href="https://github.com/elemental-research-group/elemental-research-group.github.io"
            className="text-white/70 hover:text-white underline">
            github.com/elemental-research-group
          </a>.
        </div>

        {/* Bottom legal */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-white/40 text-[12px] font-mono">
            © {year} Elemental Research Lab · New York, NY
          </div>
          <div className="text-white/30 text-[11px] tracking-[0.2em] uppercase font-mono">
            Open source · MIT
          </div>
        </div>
      </div>
    </footer>
  );
}
