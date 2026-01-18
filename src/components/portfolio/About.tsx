import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Cloud, Zap } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    label: "Clean Code",
    description: "Writing maintainable, scalable solutions",
  },
  {
    icon: Server,
    label: "System Design",
    description: "Architecting high-availability systems",
  },
  {
    icon: Cloud,
    label: "Cloud Native",
    description: "AWS, Docker, Kubernetes expertise",
  },
  {
    icon: Zap,
    label: "Performance",
    description: "40% query optimization achieved",
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                About Me
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
                Crafting <span className="gradient-text">Scalable</span> Backend
                Solutions
              </h2>

              <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  I'm a <span className="text-foreground font-medium">Senior Laravel Developer</span> and{" "}
                  <span className="text-foreground font-medium">System Architect</span> with over 6 years of
                  experience building production-grade applications that scale.
                </p>
                <p>
                  My expertise spans the complete backend ecosystem — from designing{" "}
                  <span className="text-primary">clean MVC architectures</span> and{" "}
                  <span className="text-primary">RESTful APIs</span> to implementing{" "}
                  <span className="text-primary">CI/CD pipelines</span> and managing{" "}
                  <span className="text-primary">cloud infrastructure</span> on AWS.
                </p>
                <p>
                  I've delivered impactful solutions across diverse domains including{" "}
                  <span className="text-foreground font-medium">EdTech</span>,{" "}
                  <span className="text-foreground font-medium">FinTech</span>,{" "}
                  <span className="text-foreground font-medium">Insurance</span>, and{" "}
                  <span className="text-foreground font-medium">Automotive</span> —
                  always focused on performance, reliability, and maintainability.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  📍 Pune, Maharashtra
                </div>
                <div className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  💼 6+ Years Experience
                </div>
                <div className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  🎓 B.E. Computer Engineering
                </div>
              </div>
            </motion.div>

            {/* Right - Highlight Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card rounded-xl p-6 group hover:border-primary/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:glow-sm transition-all">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
