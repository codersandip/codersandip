import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Clock, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "CogniSpark AI",
    duration: "13 months",
    category: "EdTech / AI",
    problem: "Course creators needed an efficient way to build eLearning content without technical expertise.",
    solution: "AI-powered eLearning authoring tool that automates content generation and course structure.",
    stack: ["Laravel 9", "MySQL", "AWS", "JavaScript", "AI/ML Integration"],
    outcome: "10x productivity increase, 7x cost reduction for course creators",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Fynity.in",
    duration: "9 months",
    category: "FinTech / Insurance",
    problem: "Users struggled to compare insurance policies across multiple providers efficiently.",
    solution: "Real-time insurance comparison platform with secure backend and policy management.",
    stack: ["Laravel 8", "React.js", "AWS (EC2, RDS, S3)", "CI/CD"],
    outcome: "Real-time policy quotes with secure, scalable architecture",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Youhonk",
    duration: "11 months",
    category: "Automotive",
    problem: "Vehicle owners had difficulty finding nearby mechanics for on-demand services.",
    solution: "Mobile-web platform connecting vehicle owners with nearby mechanics using geolocation.",
    stack: ["Laravel 8", "Vue.js", "AWS (EC2, S3, Lambda)", "Nginx"],
    outcome: "Scalable mobile-web platform with cloud deployment",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "3G Content",
    duration: "9 months",
    category: "EdTech / ERP",
    problem: "Tuition classes needed automated systems for question paper creation and student management.",
    solution: "Comprehensive ERP system with automated question paper generation and analytics.",
    stack: ["Laravel 9", "React.js", "GitHub Actions", "CI/CD"],
    outcome: "Automated question paper creation with complete student management",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Workcy",
    duration: "2 months",
    category: "Job Portal",
    problem: "Maharashtra needed a streamlined interview call service for job seekers.",
    solution: "Interview scheduling platform with automated notifications and tracking.",
    stack: ["Laravel 6", "AWS EC2", "CI/CD"],
    outcome: "Streamlined job search and interview scheduling for Maharashtra",
    color: "from-rose-500 to-red-500",
  },
  {
    title: "Carselonadaily",
    duration: "5 months",
    category: "Services",
    problem: "Car owners lacked a professional platform for booking detailing services.",
    solution: "Car care and detailing platform with service booking and provider management.",
    stack: ["Sails.js", "Node.js", "AWS EC2"],
    outcome: "Professional service booking platform for car care",
    color: "from-indigo-500 to-violet-500",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Real-world solutions that demonstrate architecture thinking and
            production-grade development.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
              />
              <div className="relative h-full glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all">
                {/* Header with gradient */}
                <div
                  className={`h-2 bg-gradient-to-r ${project.color}`}
                />

                <div className="p-6">
                  {/* Category & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {project.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Problem & Solution */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Challenge
                      </p>
                      <p className="text-sm text-foreground/80">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Solution
                      </p>
                      <p className="text-sm text-foreground/80">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start gap-2">
                      <Layers className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-primary">
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
