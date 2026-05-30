import { useState, useEffect } from "react";
import { Logo } from "./Logo";

const links = [
  { id: "about",    label: "About" },
  { id: "research", label: "Work" },
  { id: "team",     label: "People" },
  { id: "why",      label: "Mission" },
  { id: "involved", label: "Contact" },
];

export default function Nav({ activeSection, setActiveSection }: {
  activeSection: string;
  setActiveSection: (s: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#f8f5ee]/95 backdrop-blur-md border-b border-[#d6d0c4]" : "bg-transparent"
    }`}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-14 h-20 flex items-center justify-between">

        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3.5">
          <Logo size={30} />
          <div className="leading-none">
            <div className="font-display text-[19px] font-semibold text-[#18181b] tracking-tight">Elemental</div>
            <div className="text-[10px] text-[#8a8580] tracking-[0.18em] uppercase mt-0.5" style={{ letterSpacing: "0.18em" }}>
              Research Lab
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`group relative px-4 py-2 text-[13px] transition-colors duration-200 ${
                activeSection === l.id ? "text-[#1a00cc]" : "text-[#3a3a40] hover:text-[#1a00cc]"
              }`}
            >
              <span className="font-mono text-[9px] text-[#b0aca3] mr-1.5 align-text-top">{String(i+1).padStart(2,"0")}</span>
              {l.label}
              {activeSection === l.id && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1a00cc]" />
              )}
            </button>
          ))}

          <div className="w-px h-6 bg-[#d6d0c4] mx-3" />

          <a
            href="https://github.com/Bhavith-Chandra/WorldModelLens"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] text-[#18181b] hover:text-[#1a00cc] transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-px bg-[#18181b] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
          <span className={`block w-5 h-px bg-[#18181b] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#18181b] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-200 ${menuOpen ? "max-h-72 border-t border-[#d6d0c4]" : "max-h-0"}`}>
        <div className="bg-[#f8f5ee] px-8 py-3">
          {links.map((l, i) => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="block w-full text-left px-2 py-3 text-sm text-[#3a3a40] hover:text-[#1a00cc] border-b border-[#ebe5d8] last:border-0 transition-colors">
              <span className="font-mono text-[9px] text-[#b0aca3] mr-2">{String(i+1).padStart(2,"0")}</span>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
