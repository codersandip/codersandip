import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Calendar, Briefcase, Building2, Wrench } from "lucide-react";

const stats = [
  { icon: Calendar, value: 6, suffix: "+", label: "Years Experience" },
  { icon: Briefcase, value: 7, suffix: "+", label: "Major Projects" },
  { icon: Building2, value: 5, suffix: "+", label: "Companies" },
  { icon: Wrench, value: 15, suffix: "+", label: "Technologies" },
];

interface CounterProps {
  value: number;
  suffix: string;
  isInView: boolean;
}

const Counter = ({ value, suffix, isInView }: CounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 50;
      const steps = duration / stepTime;
      const increment = value / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.round(start));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
      {displayValue}
      <span className="text-primary">{suffix}</span>
    </span>
  );
};

export const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="py-16 md:py-20 bg-background" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="mb-2">
                <Counter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
