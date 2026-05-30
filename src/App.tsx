import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";
import Team from "./components/Team";
import WhyItMatters from "./components/WhyItMatters";
import GetInvolved from "./components/GetInvolved";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div className="min-h-screen bg-[#f8f5ee] text-[#18181b]">
      <Nav activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <About />
      <Research />
      <Team />
      <WhyItMatters />
      <GetInvolved />
      <Footer />
    </div>
  );
}
