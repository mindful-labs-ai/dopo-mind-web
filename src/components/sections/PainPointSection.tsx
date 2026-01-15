"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const painPoints = [
  {
    emoji: "😔",
    text: "겉으로는 웃는데 속은 텅 빈 것 같아.",
  },
  {
    emoji: "😩",
    text: "퇴근하고 집에 오면 손가락 하나 까딱하기 싫어.",
  },
  {
    emoji: "😞",
    text: "남들은 다 잘 사는데 나만 뒤처지는 기분이야.",
  },
];

export default function PainPointSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 bg-background-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dopo-purple/30 to-transparent" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-dopo-purple/10 rounded-full blur-3xl" />

      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            <span className="block leading-[1.4] mb-3">도포의 인스타를 보며,</span>
            <span className="block leading-[1.4]">
              <span className="text-dopo-purple">&apos;어? 이거 완전 내 얘긴데&apos;</span> 싶었다면.
            </span>
          </h2>
        </motion.div>

        {/* Pain point cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 items-center">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-5xl mb-4">{point.emoji}</div>
              <p className="text-gray-300 text-lg leading-[1.7]">
                &quot;{point.text}&quot;
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bridge copy */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-[1.7]">
            좋아요만 누르고 넘겼던 그 마음,
            <br />
            <span className="text-dopo-purple-light font-medium">
              사실은 누군가 깊게 들어주길 바라지 않았나요?
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
