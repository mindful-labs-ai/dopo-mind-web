"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Users, Heart, HelpCircle } from "lucide-react";

const concerns = [
  {
    icon: Briefcase,
    title: "진로/직장",
    description: "취업, 이직, 직장 내 스트레스",
  },
  {
    icon: Users,
    title: "대인관계",
    description: "가족, 연인, 친구와의 반복되는 갈등",
  },
  {
    icon: Heart,
    title: "정서",
    description: "우울감, 불안, 무기력, 자기이해 부족",
  },
  {
    icon: HelpCircle,
    title: "기타",
    description: "일상에서 설명하기 어려운 심리적 불편감",
  },
];

export default function ServiceDetailSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="section-container">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            이런 고민을 함께 다룹니다.
          </h2>
        </motion.div>

        {/* Concerns Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {concerns.map((concern, index) => (
            <motion.div
              key={concern.title}
              className="card p-6 hover:bg-background-elevated transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4">
                <concern.icon className="w-6 h-6 text-sage" />
              </div>
              <h3 className="font-semibold text-text mb-2">{concern.title}</h3>
              <p className="text-sm text-text-muted">{concern.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-background-card/50 rounded-xl p-6 border border-divider-light">
            <p className="text-sm text-text-subtle text-center">
              <span className="text-text-muted">참고:</span> 자살 위기, 중독, 심각한 트라우마 등은
              <br className="sm:hidden" />{" "}
              본 프로그램 특성상 상담이 제한될 수 있습니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
