import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Backend",
    skills: [
      { name: "PHP 8+", level: 95 },
      { name: "Laravel", level: 95 },
      { name: "REST APIs & Webhooks", level: 95 },
      { name: "Queues & Background Jobs", level: 90 },
      { name: "Payment Gateways", level: 90 },
      { name: "CodeIgniter", level: 80 },
      { name: "Node.js / Sails.js", level: 70 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Databases & Cache",
    skills: [
      { name: "MySQL", level: 90 },
      { name: "Redis", level: 85 },
      { name: "MongoDB", level: 75 },
      { name: "Query Optimization & Indexing", level: 90 },
    ],
  },
  {
    title: "Architecture & Security",
    skills: [
      { name: "SOLID & Design Patterns", level: 90 },
      { name: "Microservices", level: 80 },
      { name: "Event-Driven Architecture", level: 80 },
      { name: "JWT / OAuth 2.0", level: 90 },
      { name: "API Security", level: 90 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, S3, RDS, Lambda, CloudFront)", level: 85 },
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 70 },
      { name: "Terraform", level: 70 },
      { name: "GitHub Actions / Jenkins", level: 90 },
      { name: "DigitalOcean & Cloudflare", level: 80 },
    ],
  },
  {
    title: "Tools & Testing",
    skills: [
      { name: "Git / GitHub / GitLab", level: 95 },
      { name: "Composer & NPM", level: 90 },
      { name: "Postman", level: 90 },
      { name: "PHPUnit", level: 80 },
      { name: "Linux / Ubuntu", level: 85 },
      { name: "Nginx / Apache / SSH", level: 85 },
    ],
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
            A comprehensive toolkit built over 7+ years of hands-on experience
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

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full gradient-bg rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
