import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Github, Linkedin, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, href: "https://github.com/codersandip", label: "GitHub" },
  { icon: Linkedin, href: "https://in.linkedin.com/in/sandip-tawhare-coder", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/sandip.tawhare", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/sandiptawhare11", label: "Twitter" },
];

const navItems = [
  { name: "About", href: "#about" },
  { name: "Expertise", href: "#expertise" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-lg md:text-xl font-bold"
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="gradient-text">Sandip</span>
              <span className="text-foreground"> B. </span>
              <span className="gradient-text">Tawhare</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Social Links - Desktop only */}
              <div className="hidden lg:flex items-center gap-1">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    <link.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
              
              <ThemeToggle />
              
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden md:inline-flex border-primary/50 text-foreground hover:bg-primary/10"
              >
                <a href="/resume.pdf" download="Sandip_Tawhare_Resume.pdf">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
              
              <Button
                onClick={() => scrollToSection("#contact")}
                size="sm"
                className="hidden md:inline-flex gradient-bg text-primary-foreground hover:opacity-90"
              >
                Hire Me
              </Button>

              {/* Mobile menu button */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-muted/50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <nav className="container-custom py-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <div className="flex gap-2 mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-primary/50"
                >
                  <a href="/resume.pdf" download="Sandip_Tawhare_Resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                  </a>
                </Button>
                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="flex-1 gradient-bg text-primary-foreground"
                >
                  Hire Me
                </Button>
              </div>
              
              {/* Social Links - Mobile */}
              <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-border">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
