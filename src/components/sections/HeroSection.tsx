"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background-dark via-background to-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-dopo-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-dopo-purple/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dopo-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-dopo-purple/20 text-dopo-purple-light px-4 py-2 rounded-full text-sm font-medium mb-8 border border-dopo-purple/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>선착순 모집 중</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10 tracking-tight">
              <span className="block leading-[1.3] mb-4">오늘 하루,</span>
              <span className="block leading-[1.3]">
                <span className="text-dopo-purple">마음</span>은 좀 어땠어?
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-[1.8]">
              남들한텐 &quot;그냥 그래&quot;라고 둘러댔지만,
              <br className="hidden sm:block" />
              사실은 안 괜찮은 거 다 알아.
              <br />
              <span className="text-dopo-purple-light font-medium">
                이제 혼자 삭히지 말고 도포한테 털어놔 봐.
              </span>
            </p>

            <motion.button
              onClick={onOpenModal}
              className="btn-primary text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              도포에게 상담 신청하기
            </motion.button>
          </motion.div>

          {/* Character Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] relative"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Glow effect behind character */}
                <div className="absolute inset-0 bg-dopo-purple/30 rounded-full blur-3xl scale-75" />

                {/* Character image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dopo_character_smile.png"
                  alt="도포 캐릭터"
                  className="relative w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative floating elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-14 h-14 bg-dopo-purple rounded-full flex items-center justify-center shadow-lg glow-sm"
                animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xl">💬</span>
              </motion.div>

              <motion.div
                className="absolute bottom-8 -left-2 w-12 h-12 bg-dopo-purple-light rounded-full flex items-center justify-center shadow-lg"
                animate={{ y: [0, 5, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-lg">💜</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-dopo-purple/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-dopo-purple rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
