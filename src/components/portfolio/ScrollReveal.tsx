import { useRef, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  scale?: boolean;
  className?: string;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  scale = false,
  className = "",
  parallax = true,
  parallaxSpeed = 0.15,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.1 
  });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [50 * parallaxSpeed, -50 * parallaxSpeed]
  );
  
  const smoothParallaxY = useSpring(parallaxY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const parallaxScaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.98, 1, 0.98]
  );

  const smoothParallaxScale = useSpring(parallaxScaleValue, {
    stiffness: 100,
    damping: 30,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 80, x: 0 };
      case "down":
        return { y: -80, x: 0 };
      case "left":
        return { x: 80, y: 0 };
      case "right":
        return { x: -80, y: 0 };
      default:
        return { y: 80, x: 0 };
    }
  };

  const initialPosition = getInitialPosition();

  const variants = {
    hidden: {
      opacity: 0,
      ...initialPosition,
      scale: scale ? 0.9 : 1,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={parallax ? { 
        y: smoothParallaxY,
        scale: smoothParallaxScale,
      } : undefined}
    >
      {children}
    </motion.div>
  );
};
