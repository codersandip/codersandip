import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

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
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
          className="group flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: -4 }}
        >
          {/* Label - appears on hover */}
          <span
            className={`text-xs font-medium uppercase tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 ${
              activeSection === section.id
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {section.label}
          </span>

          {/* Dot indicator */}
          <div className="relative flex items-center justify-center">
            {/* Active ring */}
            {activeSection === section.id && (
              <motion.div
                layoutId="activeSection"
                className="absolute w-5 h-5 rounded-full border-2 border-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Dot */}
            <motion.div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary scale-100"
                  : "bg-muted-foreground/50 group-hover:bg-primary/70 scale-75 group-hover:scale-100"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          </div>
        </motion.button>
      ))}

      {/* Progress line */}
      <div className="absolute right-[4px] top-0 bottom-0 w-px bg-border/30 -z-10" />
    </motion.nav>
  );
};
