import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved preference or default to dark
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved ? saved === "dark" : prefersDark;
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggle = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    document.documentElement.classList.toggle("dark", newValue);
    localStorage.setItem("theme", newValue ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggle}
      className="relative p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon className="h-5 w-5 text-primary" />
        ) : (
          <Sun className="h-5 w-5 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
};
