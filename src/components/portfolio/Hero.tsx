import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "./ParticleBackground";

const socialLinks = [
  { icon: Github, href: "https://github.com/codersandip", label: "GitHub" },
  { icon: Linkedin, href: "https://in.linkedin.com/in/sandip-tawhare-coder", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/sandip.tawhare", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/sandiptawhare11", label: "Twitter" },
  { icon: Mail, href: "mailto:sandiptawhare18081998@gmail.com", label: "Email" },
];

export const Hero = () => {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-section overflow-hidden">
      <ParticleBackground />

      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="text-hero-foreground">Hi, I'm </span>
            <span className="gradient-text">Sandip Tawhare</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-hero-foreground/90 mb-6"
          >
            Senior Laravel Developer &{" "}
            <span className="gradient-text">System Architect</span>
          </motion.h2>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-hero-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Building Scalable Systems with{" "}
            <span className="text-primary font-medium">Laravel</span>,{" "}
            <span className="text-primary font-medium">Cloud</span> &{" "}
            <span className="text-primary font-medium">DevOps</span>. 6+ years
            crafting high-performance backend architectures and automating
            deployments.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="gradient-bg text-primary-foreground hover:opacity-90 glow-sm px-8 py-6 text-base"
            >
              View Projects
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="border-primary/50 text-hero-foreground hover:bg-primary/10 px-8 py-6 text-base"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-hero-foreground/70 hover:text-hero-foreground hover:bg-primary/10 px-8 py-6 text-base"
              asChild
            >
              <a href="https://resume.sandiptawhare.com/Sandip%20Baliram%20Tawhare%20-%20Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="p-3 rounded-full bg-hero-foreground/5 hover:bg-primary/20 text-hero-foreground/70 hover:text-primary transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-hero-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
