"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingCTAProps {
  onClick: () => void;
}

export default function FloatingCTA({ onClick }: FloatingCTAProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      style={{ opacity }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <motion.button
        onClick={onClick}
        className="flex items-center gap-2 bg-dopo-purple hover:bg-dopo-purple-dark text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all font-medium glow-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">상담 신청하기</span>
      </motion.button>
    </motion.div>
  );
}
