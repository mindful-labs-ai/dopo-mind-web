"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/dopo-mindcenter-bg.webp"
        alt="도포 마음상담 배경"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dim Overlay - Light: white, Dark: black */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/60" />

      <div className="section-container relative z-10 py-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Collaboration Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-5 py-2.5 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-text dark:text-white/90 text-sm sm:text-base font-medium border border-black/20 dark:border-white/20">
              도포 x 마음토스 상담센터
            </span>
          </motion.div>

          {/* Main Copy */}
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text dark:text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block leading-[1.4] mb-2">어두운 마음 속,</span>
            <span className="block leading-[1.4]">
              부담 없이 켜는{" "}
              <span className="text-sage dark:text-sage-light">전문 상담</span>의 불빛.
            </span>
          </motion.h1>

          {/* Sub Copy */}
          <motion.p
            className="text-lg sm:text-xl text-text-muted dark:text-white/80 mb-10 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            상담심리 전공 석·박사 수련생과 함께하는
            <br className="hidden sm:block" />
            전문 심리상담, <span className="text-text dark:text-white font-medium">마음토스 상담센터</span>에서 시작하세요.
          </motion.p>

          {/* Key value badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="px-4 py-2 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-sm text-text-muted dark:text-white/90 border border-black/20 dark:border-white/20">
              회당 20,000원
            </span>
            <span className="px-4 py-2 bg-sage/20 dark:bg-sage/30 backdrop-blur-sm rounded-full text-sm text-sage dark:text-white border border-black/20 dark:border-white/20">
              첫 상담 무료
            </span>
            <span className="px-4 py-2 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-sm text-text-muted dark:text-white/90 border border-black/20 dark:border-white/20">
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
            className="mt-4 text-sm text-text-subtle dark:text-white/60"
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
            <div className="w-6 h-10 border-2 border-black/30 dark:border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-black/50 dark:bg-white/50 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
