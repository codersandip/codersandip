import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "stats", label: "Stats" },
  { id: "expertise", label: "Expertise" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const SectionNav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section during programmatic scroll
      if (isTransitioning) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > 200);

      // Find current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTransitioning]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element || isTransitioning) return;

    // Determine direction
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    const targetIndex = sections.findIndex(s => s.id === id);
    setTransitionDirection(targetIndex > currentIndex ? "down" : "up");
    
    // Start transition
    setIsTransitioning(true);

    // Smooth scroll with custom easing
    const startPosition = window.scrollY;
    const targetPosition = element.offsetTop;
    const distance = targetPosition - startPosition;
    const duration = Math.min(1200, Math.max(600, Math.abs(distance) * 0.5));
    const startTime = performance.now();

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      
      window.scrollTo(0, startPosition + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setActiveSection(id);
        setTimeout(() => setIsTransitioning(false), 100);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [activeSection, isTransitioning]);

  return (
    <>
      {/* Page transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pointer-events-none"
          >
            {/* Gradient sweep effect */}
            <motion.div
              initial={{ 
                y: transitionDirection === "down" ? "-100%" : "100%",
                opacity: 0.8 
              }}
              animate={{ 
                y: transitionDirection === "down" ? "100%" : "-100%",
                opacity: 0 
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent"
            />
            
            {/* Subtle vignette during transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.4)_100%)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation dots */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
      >
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex items-center gap-3 ${isTransitioning ? 'pointer-events-none' : ''}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: -4 }}
            disabled={isTransitioning}
          >
            {/* Label - appears on hover */}
            <motion.span
              className={`text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                activeSection === section.id
                  ? "text-primary opacity-100"
                  : "text-muted-foreground opacity-0 group-hover:opacity-100"
              }`}
              animate={{
                scale: activeSection === section.id ? 1.05 : 1,
              }}
            >
              {section.label}
            </motion.span>

            {/* Dot indicator */}
            <div className="relative flex items-center justify-center">
              {/* Active ring with pulse */}
              {activeSection === section.id && (
                <>
                  <motion.div
                    layoutId="activeSection"
                    className="absolute w-5 h-5 rounded-full border-2 border-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <motion.div
                    className="absolute w-5 h-5 rounded-full border border-primary/50"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}
              
              {/* Dot */}
              <motion.div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  activeSection === section.id
                    ? "bg-primary"
                    : "bg-muted-foreground/50 group-hover:bg-primary/70"
                }`}
                animate={{
                  scale: activeSection === section.id ? 1 : 0.75,
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </div>
          </motion.button>
        ))}

        {/* Progress line */}
        <div className="absolute right-[4px] top-0 bottom-0 w-px bg-border/30 -z-10">
          {/* Animated progress indicator */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-primary/50"
            style={{
              height: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </motion.nav>
    </>
  );
};
