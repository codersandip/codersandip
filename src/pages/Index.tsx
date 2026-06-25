import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Preloader } from "@/components/portfolio/Preloader";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Below-the-fold sections — code-split to shrink initial JS bundle
const CoreExpertise = lazy(() => import("@/components/portfolio/CoreExpertise").then(m => ({ default: m.CoreExpertise })));
const StatsCounter = lazy(() => import("@/components/portfolio/StatsCounter").then(m => ({ default: m.StatsCounter })));
const Skills = lazy(() => import("@/components/portfolio/Skills").then(m => ({ default: m.Skills })));
const ExperienceTimeline = lazy(() => import("@/components/portfolio/ExperienceTimeline").then(m => ({ default: m.ExperienceTimeline })));
const Projects = lazy(() => import("@/components/portfolio/Projects").then(m => ({ default: m.Projects })));
const OpenSource = lazy(() => import("@/components/portfolio/OpenSource").then(m => ({ default: m.OpenSource })));
const Contact = lazy(() => import("@/components/portfolio/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/portfolio/Footer").then(m => ({ default: m.Footer })));

// Non-critical UI — load after the page is interactive
const CustomCursor = lazy(() => import("@/components/portfolio/CustomCursor").then(m => ({ default: m.CustomCursor })));
const BackToTop = lazy(() => import("@/components/portfolio/BackToTop").then(m => ({ default: m.BackToTop })));

const SectionFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  // Skip preloader on repeat visits in the same session for faster LCP
  const initiallySkipped = typeof window !== "undefined" && sessionStorage.getItem("preloaderShown") === "1";
  const [isLoading, setIsLoading] = useState(!initiallySkipped);
  const [showContent, setShowContent] = useState(initiallySkipped);
  const [loadDeferred, setLoadDeferred] = useState(initiallySkipped);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("preloaderShown", "1");
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  // Defer non-critical UI (cursor, back-to-top) until idle
  useEffect(() => {
    if (loadDeferred || isLoading) return;
    const w = window as typeof window & { requestIdleCallback?: (cb: () => void) => number };
    const schedule = w.requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 1500));
    const id = schedule(() => setLoadDeferred(true));
    return () => {
      const cancel = (window as typeof window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cancel) cancel(id as number);
    };
  }, [isLoading, loadDeferred]);

  return (
    <>
      {/* Deferred non-critical UI */}
      {loadDeferred && (
        <Suspense fallback={null}>
          <CustomCursor />
          <BackToTop />
        </Suspense>
      )}

      {/* Scroll progress indicator */}
      {!isLoading && <ScrollProgress />}

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Main content */}
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

          {/* Scroll-animated sections (code-split) */}
          <Suspense fallback={<SectionFallback />}>
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
            <ScrollReveal direction="up" delay={0.1}>
              <OpenSource />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <Contact />
            </ScrollReveal>
          </Suspense>
        </main>

        {/* Footer entrance */}
        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Footer />
          </motion.div>
        </Suspense>
      </div>
    </>
  );
};

export default Index;
