"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, MessageCircle, Calendar } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: FileText,
    title: "신청서 작성",
    description: "희망하는 요일과 시간을 선택하여 신청서를 제출합니다.",
  },
  {
    step: 2,
    icon: MessageCircle,
    title: "사전 조율",
    description: "담당 상담사가 연락드려 상담 적합성을 협의하고 일정을 확정합니다.",
  },
  {
    step: 3,
    icon: Calendar,
    title: "정기 상담",
    description: "매주 동일한 요일/시간에 50분간 상담을 진행합니다. (주 1회 원칙)",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 bg-background-dark" ref={ref}>
      <div className="section-container">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            이용 절차
          </h2>
          <p className="text-text-muted">
            신청부터 상담까지, 간단한 3단계
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-sage/20 hidden lg:block" />

            <div className="grid lg:grid-cols-3 gap-8">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <div className="card p-8 text-center h-full">
                    {/* Step number */}
                    <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <item.icon className="w-8 h-8 text-sage" />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-text text-lg mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
