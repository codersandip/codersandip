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
import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  const pageVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <>
      {/* Custom animated cursor */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="min-h-screen bg-background overflow-hidden"
            initial="hidden"
            animate={showContent ? "visible" : "hidden"}
            variants={pageVariants}
          >
            {/* Header with separate entrance */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={showContent ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
              }}
            >
              <Header />
            </motion.div>

            <main>
              {/* Hero with dramatic entrance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.3,
                }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
