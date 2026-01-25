"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const policies = [
  {
    title: "상담사 정보",
    content:
      "상담은 심리상담 전공 석·박사 과정 수련생이 진행합니다. 전문 자격증 소지자가 아닌 수련 과정 중 상담사입니다.",
  },
  {
    title: "상담 범위",
    content:
      "자살 위기, 심각한 자해 위험, 중독, 심각한 트라우마 등은 본 프로그램 특성상 상담이 제한될 수 있습니다.",
  },
  {
    title: "비밀보장",
    content:
      "상담 내용은 철저히 비밀이 보장됩니다. 단, 슈퍼비전을 위해 익명화된 내용이 지도교수와 공유될 수 있습니다.",
  },
  {
    title: "상담 취소 및 변경",
    content:
      "상담 24시간 전까지 취소/변경이 가능합니다. 당일 취소 시 1회 차감될 수 있습니다.",
  },
  {
    title: "상담 중단",
    content:
      "상담은 언제든 자유롭게 중단할 수 있으며, 중단에 따른 불이익은 없습니다.",
  },
];

export default function PolicySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="section-container">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            중요 유의사항
          </h2>
          <p className="text-text-muted">상담 전 꼭 확인해주세요.</p>
        </motion.div>

        {/* Policy Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-background-elevated transition-colors"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="font-medium text-text pr-4">
                    {policy.title}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-sage flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-text-muted leading-relaxed">
                        {policy.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
