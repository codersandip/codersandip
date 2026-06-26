import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "Vioron Internet Pvt Ltd",
    role: "Software Development Engineer (Laravel / PHP Backend)",
    project: "Youhonk — Vehicle Service Marketplace",
    location: "Pune",
    period: "Jan 2025 – Present",
    isCurrent: true,
    highlights: [
      "Built scalable Laravel REST APIs, queue workflows, scheduled jobs and real-time notifications",
      "Optimized queries, indexing, eager loading & media processing — improved API speed by up to 40%",
      "Reduced media storage usage by 30–50% with automated image optimization workflows",
      "Managed AWS and Ubuntu production deployments with Nginx, Apache, PHP-FPM and Redis",
    ],
  },
  {
    company: "Sarvacharya Education Pvt Ltd",
    role: "Senior Laravel Developer",
    project: "3G Content ERP",
    location: "Pune",
    period: "Apr 2024 – Jan 2025",
    highlights: [
      "Developed ERP modules for class scheduling, student management and attendance tracking",
      "Built automated question paper generation with configurable templates",
      "Improved performance and maintainability through query optimization and backend refactoring",
      "Implemented GitHub Actions CI/CD workflows to automate deployments",
    ],
  },
  {
    company: "Paradiso Software Pvt Ltd",
    role: "Laravel Developer",
    project: "CogniSpark AI — eLearning Authoring Platform",
    location: "Pune",
    period: "Mar 2023 – Apr 2024",
    highlights: [
      "Built Laravel backend modules for an AI-powered eLearning authoring platform",
      "Handled high-volume content workflows with efficient backend processing",
      "Improved scalability through optimized database design and AWS-hosted production support",
      "Collaborated with product and UI/UX teams on responsive authoring experiences",
    ],
  },
  {
    company: "Fyntune Solution Pvt Ltd",
    role: "PHP Developer",
    project: "Fynity.in — Insurance Aggregation Platform",
    location: "Pune",
    period: "Jan 2021 – Feb 2023",
    highlights: [
      "Developed Laravel APIs with real-time quote generation and premium calculation workflows",
      "Integrated payment gateways and REST/SOAP provider APIs across multiple insurers",
      "Set up AWS services (EC2, RDS, S3) and GitHub Actions deployment pipelines",
      "Collaborated on React.js frontend workflows for the aggregation portal",
    ],
  },
  {
    company: "Leanquality Solutions India Pvt Ltd",
    role: "Web Developer",
    project: "Carselonadaily — Car Care & Detailing Platform",
    location: "Pune",
    period: "Jun 2019 – Dec 2020",
    highlights: [
      "Developed and maintained Carselonadaily using Sails.js, Node.js and MySQL",
      "Contributed across CodeIgniter and Laravel modules for service workflows",
      "Refactored backend code and handled evolving client requirements",
      "Managed AWS EC2 deployments for stable hosting and better maintainability",
    ],
  },
];

export const ExperienceTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="section-padding hero-section relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            Career Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-hero-foreground"
          >
            Professional <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-hero-foreground/70 text-lg"
          >
            A timeline of growth, learning, and impactful contributions across
            various organizations.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`relative pl-8 md:pl-0 pb-12 last:pb-0 ${
                index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-0 w-4 h-4 rounded-full gradient-bg border-4 border-hero ${
                  exp.isCurrent ? "animate-glow-pulse" : ""
                } ${
                  index % 2 === 0
                    ? "left-0 md:left-1/2 md:-translate-x-1/2"
                    : "left-0 md:left-1/2 md:-translate-x-1/2"
                }`}
              />

              {/* Content card */}
              <div
                className={`bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all ${
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}
              >
                {/* Current badge */}
                {exp.isCurrent && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Current Role
                  </span>
                )}

                <h3 className="text-lg font-bold text-card-foreground">
                  {exp.role}
                </h3>
                <p className="text-primary font-medium">{exp.company}</p>
                {exp.project && (
                  <p className="text-sm text-muted-foreground italic mb-2">{exp.project}</p>
                )}

                <div
                  className={`flex flex-wrap gap-3 text-sm text-muted-foreground mb-4 ${
                    index % 2 === 0 ? "md:justify-end" : ""
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </span>
                </div>

                <ul
                  className={`space-y-2 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  {exp.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className={`flex items-start gap-2 text-sm text-card-foreground/80 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
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
