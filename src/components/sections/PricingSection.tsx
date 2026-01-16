"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sun } from "lucide-react";

interface PricingSectionProps {
  onOpenModal: () => void;
}

export default function PricingSection({ onOpenModal }: PricingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 bg-background" ref={ref}>
      <div className="section-container">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            투명한 비용 안내
          </h2>
          <p className="text-text-muted">
            숨겨진 비용 없이, 명확하게 안내드립니다.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Regular Price */}
            <div className="card p-8 text-center">
              <div className="mb-4">
                <span className="text-sm text-text-muted">1회기 상담료</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-text">18,000</span>
                <span className="text-text-muted">원</span>
              </div>
              <p className="text-sm text-text-subtle">50분 기준</p>
            </div>

            {/* First Session Free */}
            <div className="card p-8 text-center border-sage/30 bg-sage/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-sage text-white text-xs px-3 py-1 rounded-bl-lg">
                혜택
              </div>
              <div className="mb-4">
                <span className="text-sm text-sage">첫 상담</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-sage-light">무료</span>
              </div>
              <p className="text-sm text-text-muted">
                상담 적합성 확인 및
                <br />
                라포 형성
              </p>
            </div>

            {/* Daytime Discount */}
            <div className="card p-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Sun className="w-4 h-4 text-sage" />
                <span className="text-sm text-text-muted">평일 낮 할인</span>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-text">+1회 무료</span>
              </div>
              <p className="text-sm text-text-subtle">
                평일 10시~17시 상담 시
                <br />
                총 2회 무료 제공
              </p>
            </div>
          </motion.div>

          {/* Note */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 text-text-muted bg-background-card px-6 py-3 rounded-full">
              <Check className="w-4 h-4 text-sage" />
              <span className="text-sm">
                상담은 언제든 중단할 수 있으며, 불필요한 장기 상담을 강요하지 않습니다.
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={onOpenModal}
              className="btn-primary"
            >
              첫 상담 무료로 시작하기
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
