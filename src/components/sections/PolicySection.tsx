"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lock, Mic, RefreshCw } from "lucide-react";

const policies = [
  {
    icon: Lock,
    title: "비밀 보장과 한계",
    content: [
      "상담 내용은 철저히 비밀이 보장됩니다.",
      "단, 내담자나 타인의 생명에 위험이 있거나 법적 요구가 있는 경우 등 예외적인 상황에서는 비밀보장이 제한될 수 있습니다.",
    ],
  },
  {
    icon: Mic,
    title: "상담 녹음 안내",
    content: [
      "상담의 질 향상과 슈퍼비전(교수 지도)을 위해 상담 내용은 녹음될 수 있습니다.",
      "녹음은 내담자의 동의 하에만 진행되며, 교육 목적 이외에는 사용되지 않고 철저히 익명으로 처리됩니다.",
    ],
  },
  {
    icon: RefreshCw,
    title: "환불 및 취소 규정",
    content: [
      "당일 취소/노쇼: 환불 불가",
      "1일 전 취소: 50% 환불",
      "2일 전 취소: 100% 환불 가능",
      "일정 변경 2회 연속 시 제한, 3회 연속 시 상담 종결될 수 있습니다.",
    ],
  },
];

export default function PolicySection() {
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
            중요 유의사항
          </h2>
          <p className="text-text-muted">
            투명하고 신뢰할 수 있는 상담을 위해 안내드립니다.
          </p>
        </motion.div>

        {/* Policy Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                className="card p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * index }}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center">
                      <policy.icon className="w-6 h-6 text-sage" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text text-lg mb-3">
                      {policy.title}
                    </h3>
                    <ul className="space-y-2">
                      {policy.content.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-text-muted leading-relaxed flex gap-2"
                        >
                          <span className="text-sage mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
