import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = slower, positive = faster
  className?: string;
  direction?: "up" | "down";
}

export const ParallaxWrapper = ({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}: ParallaxWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const yRange = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * speed * multiplier, -100 * speed * multiplier]
  );
  
  const y = useSpring(yRange, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  bgSpeed?: number;
  contentSpeed?: number;
}

export const ParallaxSection = ({
  children,
  className = "",
  bgSpeed = 0.3,
  contentSpeed = 0.1,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", `${bgSpeed * 100}%`]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", `${contentSpeed * 50}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const smoothBgY = useSpring(bgY, { stiffness: 100, damping: 30 });
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: smoothBgY }}
      />
      <motion.div
        className="relative z-10"
        style={{ y: smoothContentY, scale: smoothScale }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
