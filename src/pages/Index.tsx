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
import { Preloader } from "@/components/portfolio/Preloader";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {/* Custom animated cursor */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      {!isLoading && <ScrollProgress />}

      {/* Back to top button */}
      {!isLoading && <BackToTop />}

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Main content — no AnimatePresence to avoid framer-motion ref cascade warnings */}
      <div
        className="min-h-screen bg-background overflow-hidden"
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.6s ease",
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        {/* Header with entrance animation */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Header />
        </motion.div>

        <main>
          {/* Hero with dramatic entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Hero />
          </motion.div>

          {/* Scroll-animated sections */}
          <ScrollReveal direction="up" delay={0.1}>
            <About />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <StatsCounter />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.1} scale>
            <CoreExpertise />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1} scale>
            <Skills />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <ExperienceTimeline />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1} scale>
            <Projects />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <Contact />
          </ScrollReveal>
        </main>

        {/* Footer entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Footer />
        </motion.div>
      </div>
    </>
  );
};

export default Index;
