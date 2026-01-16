"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background ambient light effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sage/3 rounded-full blur-[100px]" />
      </div>

      <div className="section-container relative z-10 py-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Desk lamp illustration - symbolic visual */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Lamp glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-sage/20 rounded-full blur-2xl" />
              {/* Lamp icon */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Lamp shade */}
                  <path
                    d="M20 24L32 8L44 24H20Z"
                    fill="#6A9C78"
                    fillOpacity="0.3"
                    stroke="#6A9C78"
                    strokeWidth="2"
                  />
                  {/* Light beam */}
                  <path
                    d="M24 24L18 48H46L40 24"
                    fill="#6A9C78"
                    fillOpacity="0.1"
                  />
                  {/* Lamp stand */}
                  <path
                    d="M32 24V48"
                    stroke="#6A9C78"
                    strokeWidth="2"
                  />
                  {/* Base */}
                  <path
                    d="M24 48H40"
                    stroke="#6A9C78"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 52H44"
                    stroke="#6A9C78"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Main Copy */}
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block leading-[1.4] mb-2">어두운 마음 속,</span>
            <span className="block leading-[1.4]">
              부담 없이 켜는{" "}
              <span className="text-sage">전문 상담</span>의 불빛.
            </span>
          </motion.h1>

          {/* Sub Copy */}
          <motion.p
            className="text-lg sm:text-xl text-text-muted mb-10 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            상담심리 전공 석·박사 수련생과 함께하는
            <br className="hidden sm:block" />
            전문 심리상담, <span className="text-sage-light font-medium">마음토스 상담센터</span>에서 시작하세요.
          </motion.p>

          {/* Key value badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="px-4 py-2 bg-background-card rounded-full text-sm text-text-muted border border-white/5">
              회당 18,000원
            </span>
            <span className="px-4 py-2 bg-sage/10 rounded-full text-sm text-sage border border-sage/20">
              첫 상담 무료
            </span>
            <span className="px-4 py-2 bg-background-card rounded-full text-sm text-text-muted border border-white/5">
              전문가 슈퍼비전
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={onOpenModal}
            className="btn-primary text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            상담 신청하러 가기
          </motion.button>

          <motion.p
            className="mt-4 text-sm text-text-subtle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            비대면 · 대면 상담
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-sage/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-sage/50 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
