import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025 Sandip Tawhare.</span>
            <span className="hidden sm:inline">Crafted with</span>
            <Heart className="h-4 w-4 text-primary hidden sm:inline" />
            <span className="hidden sm:inline">using Laravel, React & modern tech.</span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#about" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="hover:text-primary transition-colors">
                Contact
              </a>
            </nav>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
