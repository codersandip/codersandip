import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Server, Cloud, CheckCircle2 } from "lucide-react";

const expertiseAreas = [
  {
    icon: Code,
    title: "Laravel & Backend Engineering",
    description:
      "Building robust, maintainable backend systems with modern PHP practices and Laravel's elegant architecture.",
    skills: [
      "Clean MVC Architecture",
      "RESTful API Design",
      "Queue Jobs & Events",
      "Performance Optimization",
      "Database Design & Indexing",
      "Laravel Horizon",
    ],
  },
  {
    icon: Server,
    title: "System Architecture",
    description:
      "Designing scalable, fault-tolerant systems that handle high traffic and grow with your business needs.",
    skills: [
      "High-Availability Systems",
      "Redis Caching Layers",
      "Queue-Based Processing",
      "Microservices Patterns",
      "Modular Monoliths",
      "Scalability & Reliability",
    ],
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    description:
      "Automating deployments and managing cloud infrastructure for seamless, reliable production environments.",
    skills: [
      "Docker & Kubernetes",
      "CI/CD Pipelines",
      "AWS Services",
      "Linux Server Management",
      "Nginx Configuration",
      "Monitoring & Logging",
    ],
  },
];

export const CoreExpertise = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="expertise"
      className="section-padding hero-section relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            Core Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-hero-foreground"
          >
            Three Pillars of <span className="gradient-text">Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-hero-foreground/70 text-lg"
          >
            A comprehensive skill set that covers the entire software delivery
            lifecycle — from writing clean code to deploying at scale.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl gradient-bg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 lg:p-8 hover:border-primary/50 transition-all">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:animate-glow-pulse transition-all">
                  <area.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-card-foreground mb-3">
                  {area.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {area.description}
                </p>

                {/* Skills List */}
                <ul className="space-y-2">
                  {area.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-sm text-card-foreground/80"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
