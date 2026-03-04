import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Clock, Layers, Monitor, Zap, Shield, BarChart3, MapPin, Car } from "lucide-react";

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
    previewColor: "from-emerald-950 via-teal-900 to-emerald-900",
    accentColor: "hsl(160, 84%, 39%)",
    previewIcon: Zap,
    previewScreens: [
      { w: "60%", h: "45%", top: "8%", left: "20%", opacity: 0.9 },
      { w: "35%", h: "25%", top: "58%", left: "5%", opacity: 0.6 },
      { w: "35%", h: "20%", top: "62%", left: "60%", opacity: 0.6 },
    ],
    stats: [{ label: "Productivity", value: "10x" }, { label: "Cost Cut", value: "7x" }],
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
    previewColor: "from-blue-950 via-cyan-900 to-blue-900",
    accentColor: "hsl(199, 89%, 48%)",
    previewIcon: Shield,
    previewScreens: [
      { w: "70%", h: "40%", top: "10%", left: "15%", opacity: 0.9 },
      { w: "28%", h: "30%", top: "55%", left: "8%", opacity: 0.7 },
      { w: "28%", h: "30%", top: "55%", left: "42%", opacity: 0.5 },
      { w: "18%", h: "30%", top: "55%", left: "76%", opacity: 0.4 },
    ],
    stats: [{ label: "Providers", value: "15+" }, { label: "Uptime", value: "99.9%" }],
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
    previewColor: "from-orange-950 via-amber-900 to-orange-900",
    accentColor: "hsl(38, 92%, 50%)",
    previewIcon: MapPin,
    previewScreens: [
      { w: "45%", h: "70%", top: "8%", left: "28%", opacity: 0.9 },
      { w: "22%", h: "55%", top: "15%", left: "4%", opacity: 0.5 },
      { w: "22%", h: "55%", top: "15%", left: "74%", opacity: 0.5 },
    ],
    stats: [{ label: "Mechanics", value: "500+" }, { label: "Cities", value: "12" }],
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
    previewColor: "from-purple-950 via-pink-900 to-purple-900",
    accentColor: "hsl(271, 81%, 56%)",
    previewIcon: BarChart3,
    previewScreens: [
      { w: "55%", h: "35%", top: "8%", left: "22%", opacity: 0.9 },
      { w: "45%", h: "40%", top: "50%", left: "5%", opacity: 0.7 },
      { w: "42%", h: "40%", top: "50%", left: "53%", opacity: 0.6 },
    ],
    stats: [{ label: "Students", value: "2k+" }, { label: "Papers", value: "Auto" }],
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
    previewColor: "from-rose-950 via-red-900 to-rose-900",
    accentColor: "hsl(347, 77%, 50%)",
    previewIcon: Monitor,
    previewScreens: [
      { w: "75%", h: "50%", top: "10%", left: "12%", opacity: 0.9 },
      { w: "70%", h: "28%", top: "65%", left: "15%", opacity: 0.6 },
    ],
    stats: [{ label: "Jobs", value: "1k+" }, { label: "Region", value: "MH" }],
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
    previewColor: "from-indigo-950 via-violet-900 to-indigo-900",
    accentColor: "hsl(239, 84%, 67%)",
    previewIcon: Car,
    previewScreens: [
      { w: "65%", h: "42%", top: "8%", left: "17%", opacity: 0.9 },
      { w: "30%", h: "32%", top: "56%", left: "5%", opacity: 0.6 },
      { w: "55%", h: "28%", top: "60%", left: "40%", opacity: 0.5 },
    ],
    stats: [{ label: "Services", value: "20+" }, { label: "Rating", value: "4.8★" }],
  },
];

const MockBrowser = ({ project }: { project: typeof projects[0] }) => {
  const Icon = project.previewIcon;
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="h-7 bg-black/40 backdrop-blur-sm border-b border-white/10 flex items-center gap-2 px-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-2 h-3.5 rounded-full bg-white/10 flex items-center px-2">
          <span className="text-[8px] text-white/40 truncate">{project.title.toLowerCase().replace(/\s/g, "")}.com</span>
        </div>
      </div>

      {/* Content area */}
      <div className={`relative w-full h-[calc(100%-28px)] bg-gradient-to-br ${project.previewColor}`}>
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        />

        {/* Animated floating UI mockup panels */}
        {project.previewScreens.map((screen, i) => (
          <motion.div
            key={i}
            className="absolute rounded-md border border-white/20 backdrop-blur-sm overflow-hidden"
            style={{
              width: screen.w,
              height: screen.h,
              top: screen.top,
              left: screen.left,
              opacity: screen.opacity,
              background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: screen.opacity, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
          >
            {/* Shimmer bar */}
            <div className="absolute top-2 left-2 right-2 h-1.5 rounded-full bg-white/20" />
            <div className="absolute top-5 left-2 right-8 h-1 rounded-full bg-white/10" />
            {i === 0 && (
              <>
                <div className="absolute top-9 left-2 right-4 h-1 rounded-full bg-white/10" />
                <div className="absolute bottom-3 right-2 w-8 h-3 rounded bg-white/20" />
              </>
            )}
            {/* Animated glow */}
            <motion.div
              className="absolute inset-0 rounded-md"
              style={{ background: `radial-gradient(circle at 50% 50%, ${project.accentColor}22 0%, transparent 70%)` }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
            />
          </motion.div>
        ))}

        {/* Center icon pulse */}
        <motion.div
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: `${project.accentColor}33`, border: `1px solid ${project.accentColor}66` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className="w-4 h-4" style={{ color: project.accentColor }} />
        </motion.div>

        {/* Stats chips */}
        <div className="absolute bottom-3 left-3 flex flex-col gap-1">
          {project.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold backdrop-blur-sm"
              style={{ background: `${project.accentColor}33`, color: project.accentColor, border: `1px solid ${project.accentColor}44` }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className="font-black">{stat.value}</span>
              <span className="opacity-70">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
              {/* Glow halo */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
              />

              <div className="relative h-full glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
                {/* ===== HOVER PREVIEW PANEL ===== */}
                <div className="relative overflow-hidden" style={{ height: hoveredIndex === index ? "200px" : "0px", transition: "height 0.45s cubic-bezier(0.22,1,0.36,1)" }}>
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 p-3"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <MockBrowser project={project} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Gradient top bar (only shows when preview is hidden) */}
                <motion.div
                  className={`h-2 bg-gradient-to-r ${project.color} flex-shrink-0`}
                  animate={{ opacity: hoveredIndex === index ? 0 : 1, height: hoveredIndex === index ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="p-6 flex flex-col flex-1">
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
                  <div className="pt-4 border-t border-border mt-auto">
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
