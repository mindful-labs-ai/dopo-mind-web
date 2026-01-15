"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, BadgeCheck } from "lucide-react";

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-dopo-purple/10 rounded-full blur-3xl" />

      <div className="section-container">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 bg-dopo-purple/20 text-dopo-purple-light px-4 py-2 rounded-full mb-8 border border-dopo-purple/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Coffee className="w-4 h-4" />
              <span className="font-medium">합리적인 가격</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              <span className="block leading-[1.4] mb-3">커피 두 잔 값,</span>
              <span className="block leading-[1.4] mb-3">
                <span className="text-dopo-purple">만 원</span>으로 시작하는
              </span>
              <span className="block leading-[1.4]">내 마음 돌보기.</span>
            </h2>
          </div>

          {/* Price comparison */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* General consultation */}
            <div className="bg-background-card rounded-2xl p-8 relative border border-white/5">
              <div className="absolute top-4 right-4 bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded-full">
                일반
              </div>
              <h3 className="text-gray-500 font-medium mb-2">일반 상담센터</h3>
              <div className="text-4xl font-bold text-gray-500 line-through mb-2">
                10만원~
              </div>
              <p className="text-gray-600 text-sm">1회 기준</p>
            </div>

            {/* Dopo consultation */}
            <div className="bg-gradient-to-br from-dopo-purple/20 to-background-card rounded-2xl p-8 relative border-2 border-dopo-purple/50 glow-sm">
              <div className="absolute top-4 right-4 bg-dopo-purple text-white text-xs px-2 py-1 rounded-full">
                도포 상담
              </div>
              <h3 className="text-dopo-purple-light font-medium mb-2">
                도포의 마음 상담
              </h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-white">1만원</span>
                <span className="text-gray-400">+ 보증금</span>
              </div>
              <p className="text-gray-400 text-sm">1회 기준 (보증금 환급 가능)</p>
            </div>
          </motion.div>

          {/* Explanation */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-lg text-gray-400 mb-6 leading-[1.7]">
              가격 거품은 빼고 진심은 더했습니다.
            </p>

            <div className="inline-flex items-center gap-2 bg-background-card border border-white/10 rounded-full px-6 py-3">
              <BadgeCheck className="w-5 h-5 text-dopo-purple" />
              <span className="text-gray-300">
                학위를 취득하고 전문가 수련 과정을 밟고 있는 선생님들이 기다립니다
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
