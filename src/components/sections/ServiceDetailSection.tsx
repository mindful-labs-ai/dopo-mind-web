"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Compass, Users, Heart, Cloud, Zap, ScanFace, HelpCircle } from "lucide-react";

const concerns = [
  {
    icon: Briefcase,
    title: "직장 스트레스",
    description: "직장 상사와 매일 트러블이 있어요",
  },
  {
    icon: Compass,
    title: "진로 고민",
    description: "이직을 해야 할지, 지금 회사에 남아야 할지 모르겠어요",
  },
  {
    icon: Users,
    title: "가족 관계",
    description: "부모님과의 관계가 늘 불편하고 힘들어요",
  },
  {
    icon: Heart,
    title: "연인 관계",
    description: "연인과 같은 문제로 반복해서 싸우게 돼요",
  },
  {
    icon: Cloud,
    title: "우울/무기력",
    description: "아무것도 하기 싫고 매일이 무기력해요",
  },
  {
    icon: Zap,
    title: "불안/걱정",
    description: "사소한 일에도 불안하고 걱정이 멈추지 않아요",
  },
  {
    icon: ScanFace,
    title: "자기 이해",
    description: "내가 누구인지, 뭘 원하는지 잘 모르겠어요",
  },
  {
    icon: HelpCircle,
    title: "기타",
    description: "말로 설명하기 어려운 심리적 불편감이 있어요",
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
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {concerns.map((concern, index) => (
            <motion.div
              key={concern.title}
              className="card p-5 hover:bg-background-elevated transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center mb-3">
                <concern.icon className="w-5 h-5 text-sage" />
              </div>
              <h3 className="font-semibold text-text mb-1.5 text-sm">{concern.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{concern.description}</p>
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
