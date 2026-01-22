"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-background-elevated" />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full bg-background-elevated hover:bg-sage/20 transition-colors flex items-center justify-center border border-divider-light"
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-sage" />
        ) : (
          <Sun className="w-4 h-4 text-sage" />
        )}
      </motion.div>
    </motion.button>
  );
}
