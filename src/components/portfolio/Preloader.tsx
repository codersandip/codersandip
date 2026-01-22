import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const firstName = "Sandip".split("");
  const middleName = " B. ".split("");
  const lastName = "Tawhare".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Multiple Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20 blur-3xl"
          style={{
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
          }}
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            scale: 0,
          }}
          animate={{
            x: [
              Math.random() * 200 - 100,
              Math.random() * -200 + 100,
              Math.random() * 200 - 100,
            ],
            y: [
              Math.random() * 200 - 100,
              Math.random() * -200 + 100,
              Math.random() * 200 - 100,
            ],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Logo Animation with 3D Letter Effect */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 relative z-10"
      >
        <div className="text-3xl md:text-5xl font-bold flex perspective-1000">
          {/* First Name */}
          {firstName.map((letter, i) => (
            <motion.span
              key={`first-${i}`}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="gradient-text inline-block"
            >
              {letter}
            </motion.span>
          ))}
          
          {/* Middle Name */}
          {middleName.map((letter, i) => (
            <motion.span
              key={`middle-${i}`}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: (i + firstName.length) * 0.08,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="text-foreground inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          
          {/* Last Name */}
          {lastName.map((letter, i) => (
            <motion.span
              key={`last-${i}`}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: (i + firstName.length + middleName.length) * 0.08,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="gradient-text inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center text-muted-foreground text-sm md:text-base mt-4"
        >
          Senior Laravel Developer & System Architect
        </motion.p>
      </motion.div>

      {/* Enhanced Progress Bar */}
      <div className="w-64 md:w-80 relative z-10">
        <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(180 70% 40%), hsl(var(--primary)))',
              backgroundSize: '200% 100%',
            }}
            initial={{ width: 0 }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{ 
              width: { duration: 0.1 },
              backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "linear" }
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
        
        {/* Progress Text */}
        <div className="flex justify-between items-center mt-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground"
          >
            Loading assets...
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-mono text-primary font-semibold"
          >
            {progress}%
          </motion.span>
        </div>
      </div>

      {/* Animated Corners */}
      <div className="absolute top-8 left-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-16 h-16 border-l-2 border-t-2 border-primary/50"
        />
      </div>
      <div className="absolute top-8 right-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-16 h-16 border-r-2 border-t-2 border-primary/50"
        />
      </div>
      <div className="absolute bottom-8 left-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-16 h-16 border-l-2 border-b-2 border-primary/50"
        />
      </div>
      <div className="absolute bottom-8 right-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-16 h-16 border-r-2 border-b-2 border-primary/50"
        />
      </div>

      {/* Rotating Ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
      </motion.div>
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full border border-primary/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/50" />
      </motion.div>
    </motion.div>
  );
};
