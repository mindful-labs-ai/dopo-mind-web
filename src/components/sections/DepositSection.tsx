"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, CheckCircle } from "lucide-react";

const steps = [
  { step: 1, text: "상담 신청", complete: true },
  { step: 2, text: "보증금 납부", complete: true },
  { step: 3, text: "10회기 상담", complete: true },
  { step: 4, text: "보증금 환급!", complete: true },
];

export default function DepositSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 bg-gradient-to-b from-background-dark to-background relative"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-dopo-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="inline-flex items-center gap-2 bg-dopo-purple/20 text-dopo-purple-light px-4 py-2 rounded-full mb-10 border border-dopo-purple/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Gift className="w-4 h-4" />
            <span className="font-medium">완주 혜택</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-10 tracking-tight">
            <span className="block leading-[1.4] mb-3">끝까지 해낸 당신을 위한</span>
            <span className="block leading-[1.4]">
              도포의 선물, <span className="text-dopo-purple">보증금 100% 환급.</span>
            </span>
          </h2>

          <motion.p
            className="text-lg text-gray-400 mb-12 leading-[1.8]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            10회기 상담을 모두 완주하시면
            <br />
            예치했던 <span className="font-bold text-dopo-purple">보증금 10만원</span>을
            그대로 돌려드려요.
          </motion.p>

          {/* Steps visualization */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {steps.map((item, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      index === steps.length - 1
                        ? "bg-dopo-purple text-white glow-sm"
                        : "bg-background-card text-dopo-purple border border-dopo-purple/30"
                    }`}
                  >
                    {index === steps.length - 1 ? (
                      <Gift className="w-5 h-5" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{item.text}</span>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-16 h-0.5 bg-dopo-purple/30 mx-2" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Notice */}
          <motion.p
            className="text-sm text-gray-500 bg-background-card inline-block px-4 py-2 rounded-full border border-white/5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            * 단, 중도 포기 시 환급이 불가합니다
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
