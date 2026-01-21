import { motion } from "framer-motion";
import { Heart, ArrowUp, Github, Linkedin, Instagram, Twitter, Mail, Phone } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/codersandip", label: "GitHub" },
  { icon: Linkedin, href: "https://in.linkedin.com/in/sandip-tawhare-coder", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/sandip.tawhare", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/sandiptawhare11", label: "Twitter" },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              <span className="gradient-text">Sandip</span>
              <span className="text-foreground"> B. </span>
              <span className="gradient-text">Tawhare</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Senior Laravel Developer & System Architect building scalable backend systems with modern cloud technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#expertise" className="hover:text-primary transition-colors">Expertise</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a 
                href="mailto:sandiptawhare18081998@gmail.com" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                sandiptawhare18081998@gmail.com
              </a>
              <a 
                href="tel:+919527849688" 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +91 9527849688
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2025 Sandip B. Tawhare.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Building digital experiences that matter.</span>
            </div>

            {/* Social Links & Scroll to Top */}
            <div className="flex items-center gap-4">
              {/* Social Icons */}
              <div className="flex items-center gap-2">
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

              {/* Scroll to Top */}
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
      </div>
    </footer>
  );
};
