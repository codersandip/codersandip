import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { CoreExpertise } from "@/components/portfolio/CoreExpertise";
import { StatsCounter } from "@/components/portfolio/StatsCounter";
import { Skills } from "@/components/portfolio/Skills";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <StatsCounter />
        <CoreExpertise />
        <Skills />
        <ExperienceTimeline />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
