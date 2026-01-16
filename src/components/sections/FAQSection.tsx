"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "상담사는 누가 배정되나요?",
    answer:
      "상담심리 전공 석/박사 과정에 재학 중이거나 졸업한 수련생이 배정됩니다. 모든 상담사는 교수급 전문가의 슈퍼비전(지도 감독)을 받으며 체계적인 훈련을 진행하고 있습니다.",
  },
  {
    question: "중장년층도 가능한가요?",
    answer:
      "본 프로그램은 20-40대를 주 대상으로 하며, 그 외 연령대는 별도 문의 바랍니다. 상담 신청 시 적합성을 먼저 확인해드립니다.",
  },
  {
    question: "상담 장소는 어디인가요?",
    answer:
      "홍대입구역 도보 5분 거리 마음토스 상담센터에서 진행됩니다. 대면 상담을 원칙으로 하고 있습니다.",
  },
  {
    question: "상담 내용은 정말 비밀인가요?",
    answer:
      "네, 모든 상담 내용은 철저히 비밀이 보장됩니다. 단, 내담자나 타인의 생명에 위험이 있거나 법적 요구가 있는 경우 등 예외적인 상황에서는 비밀보장이 제한될 수 있습니다.",
  },
  {
    question: "상담 시간은 어떻게 되나요?",
    answer:
      "1회 상담은 50분 동안 진행됩니다. 매주 동일한 요일/시간에 정기적으로 진행하는 것을 원칙으로 합니다.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      ref={ref}
      className="py-24 bg-background"
    >
      <div className="section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text tracking-tight leading-[1.4]">
              자주 묻는 질문
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
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
                    {faq.question}
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
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
