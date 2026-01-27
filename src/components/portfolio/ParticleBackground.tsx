import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Parallax scroll effects
  const { scrollY } = useScroll();
  
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 300]);
  const parallaxScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const parallaxOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);
  const glowY = useTransform(scrollY, [0, 800], [0, 200]);
  const glowScale = useTransform(scrollY, [0, 500], [1, 1.5]);
  
  const smoothY = useSpring(parallaxY, { stiffness: 50, damping: 20 });
  const smoothScale = useSpring(parallaxScale, { stiffness: 50, damping: 20 });
  const smoothOpacity = useSpring(parallaxOpacity, { stiffness: 50, damping: 20 });
  const smoothGlowY = useSpring(glowY, { stiffness: 30, damping: 15 });
  const smoothGlowScale = useSpring(glowScale, { stiffness: 30, damping: 15 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      particlesRef.current = particles;
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Mouse interaction - particles move away from mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.x -= dx * 0.02;
          particle.y -= dy * 0.02;
        }
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(166, 76%, 50%, ${particle.opacity})`;
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(166, 76%, 50%, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      animationRef.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {/* Parallax canvas container */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          y: smoothY, 
          scale: smoothScale,
          opacity: smoothOpacity,
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ pointerEvents: "none" }}
        />
      </motion.div>
      
      {/* Gradient overlay with parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-hero/80"
        style={{ y: useSpring(useTransform(scrollY, [0, 500], [0, 50]), { stiffness: 50, damping: 20 }) }}
      />
      
      {/* Radial glow with enhanced parallax */}
      <motion.div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl z-0"
        style={{ 
          y: smoothGlowY,
          scale: smoothGlowScale,
        }}
      />
      
      {/* Additional floating orbs with parallax */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl z-0"
        style={{ 
          y: useSpring(useTransform(scrollY, [0, 800], [0, 150]), { stiffness: 40, damping: 15 }),
          x: useSpring(useTransform(scrollY, [0, 800], [0, -50]), { stiffness: 40, damping: 15 }),
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/4 blur-3xl z-0"
        style={{ 
          y: useSpring(useTransform(scrollY, [0, 800], [0, -100]), { stiffness: 30, damping: 20 }),
        }}
      />
    </div>
  );
};
