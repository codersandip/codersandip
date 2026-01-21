import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Database, 
  Cloud, 
  Wrench, 
  Layout,
  Server,
  Cpu,
  GitBranch,
  Container,
  Globe
} from "lucide-react";

const allSkills = [
  // Backend
  { name: "PHP", icon: Code2 },
  { name: "Laravel", icon: Server },
  { name: "Node.js", icon: Cpu },
  { name: "CodeIgniter", icon: Code2 },
  { name: "REST APIs", icon: Globe },
  // Frontend
  { name: "React.js", icon: Layout },
  { name: "Vue.js", icon: Layout },
  { name: "JavaScript", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: Layout },
  // Databases
  { name: "MySQL", icon: Database },
  { name: "MongoDB", icon: Database },
  { name: "Redis", icon: Database },
  { name: "PostgreSQL", icon: Database },
  // DevOps
  { name: "Docker", icon: Container },
  { name: "Kubernetes", icon: Cloud },
  { name: "AWS", icon: Cloud },
  { name: "CI/CD", icon: GitBranch },
  { name: "Linux", icon: Cpu },
  // Tools
  { name: "Git", icon: GitBranch },
  { name: "Nginx", icon: Server },
  { name: "Terraform", icon: Wrench },
  { name: "Prometheus", icon: Wrench },
];

const SkillBadge = ({ name, icon: Icon }: { name: string; icon: typeof Code2 }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group cursor-default whitespace-nowrap">
    <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
    <span className="text-sm font-medium text-foreground">{name}</span>
  </div>
);

const MarqueeRow = ({ skills, direction = "left", speed = 25 }: { 
  skills: typeof allSkills; 
  direction?: "left" | "right";
  speed?: number;
}) => {
  const animationDirection = direction === "left" ? "normal" : "reverse";
  
  return (
    <div className="relative overflow-hidden py-2">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div 
        className="flex gap-4 animate-marquee"
        style={{ 
          animationDuration: `${speed}s`,
          animationDirection,
        }}
      >
        {/* Double the items for seamless loop */}
        {[...skills, ...skills].map((skill, index) => (
          <SkillBadge key={`${skill.name}-${index}`} {...skill} />
        ))}
      </div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Split skills into two rows
  const firstRowSkills = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const secondRowSkills = allSkills.slice(Math.ceil(allSkills.length / 2));

  return (
    <section id="skills" className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="container-custom mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            Tech Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4"
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            A comprehensive toolkit built over 6+ years of hands-on experience
            across multiple domains.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-4"
      >
        <MarqueeRow skills={firstRowSkills} direction="left" speed={30} />
        <MarqueeRow skills={secondRowSkills} direction="right" speed={35} />
      </motion.div>
    </section>
  );
};
