import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Backend",
    skills: ["PHP", "Laravel", "Node.js", "CodeIgniter", "Sails.js", "REST APIs"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Vue.js", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB", "Redis", "PostgreSQL", "Elasticsearch"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Nginx"],
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Terraform", "ELK Stack", "Prometheus", "Grafana", "Jira"],
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + catIndex * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full gradient-bg" />
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.4 + catIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
