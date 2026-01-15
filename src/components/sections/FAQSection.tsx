"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "상담 내용은 정말 비밀인가요?",
    answer:
      "네, 모든 상담 내용은 윤리 규정에 따라 철저히 보장됩니다. 상담 중 나눈 이야기는 법적으로 보호되며, 제3자에게 공개되지 않습니다.",
  },
  {
    question: "상담사는 어떤 분인가요?",
    answer:
      "심리학 석사 이상의 학위를 취득하고, 관련 학회 준회원 이상의 자격을 갖춘 수련생입니다. 전문가 과정을 밟으며 꾸준히 슈퍼비전을 받고 있어요.",
  },
  {
    question: "비대면으로도 가능한가요?",
    answer:
      "네, 화상 상담과 전화 상담 모두 가능합니다. 편안한 공간에서 상담받으실 수 있도록 다양한 옵션을 제공해드려요.",
  },
  {
    question: "상담 시간은 어떻게 되나요?",
    answer:
      "1회 상담은 약 50분 정도 진행됩니다. 상담 일정은 신청 후 담당 매니저와 조율하여 결정하실 수 있어요.",
  },
  {
    question: "중간에 그만두면 어떻게 되나요?",
    answer:
      "중도 포기 시 보증금 환급은 어렵지만, 불가피한 사정이 있으시면 상담을 통해 조율이 가능합니다. 무엇보다 끝까지 함께 하실 수 있도록 응원할게요!",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 bg-gradient-to-b from-background to-background-dark"
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
            <motion.div
              className="inline-flex items-center gap-2 bg-dopo-purple/20 text-dopo-purple-light px-4 py-2 rounded-full mb-8 border border-dopo-purple/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="font-medium">자주 묻는 질문</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.4]">
              궁금한 점이 있으신가요?
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-background-card rounded-2xl border border-white/5 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="font-medium text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-dopo-purple flex-shrink-0" />
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
                      <div className="px-6 pb-5 text-gray-400 leading-[1.7]">
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
