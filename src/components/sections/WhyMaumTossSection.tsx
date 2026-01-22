"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Shield, Users } from "lucide-react";

const comparisonData = [
  {
    category: "비용",
    general: "10~15만원",
    maumtoss: "1.8만원",
    highlight: true,
  },
  {
    category: "자격",
    general: "민간 자격증 혼재",
    maumtoss: "전공 석/박사 과정",
    highlight: false,
  },
  {
    category: "관리",
    general: "개인 역량 의존",
    maumtoss: "전문가 슈퍼비전 필수",
    highlight: false,
  },
];

export default function WhyMaumTossSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-maumtoss" className="py-24 bg-background-dark" ref={ref}>
      <div className="section-container">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-6">
            왜 마음토스 상담센터는{" "}
            <span className="text-sage">저렴하면서 전문적</span>인가요?
          </h2>
        </motion.div>

        {/* Explanation */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card p-8">
            <p className="text-text-muted text-lg leading-relaxed">
              마음토스의 상담사는 단순 아르바이트가 아닙니다.
              <br className="hidden sm:block" />
              정식 전문가 자격 취득을 목표로 대학원 석·박사 과정에서
              <br className="hidden sm:block" />
              체계적인 훈련을 받고 있는{" "}
              <span className="text-sage-light font-semibold">예비 전문가</span>
              입니다.
            </p>
          </div>
        </motion.div>

        {/* Value Props */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-sage" />
            </div>
            <h3 className="font-semibold text-text mb-2">검증된 전문성</h3>
            <p className="text-sm text-text-muted">
              심리상담 전공 석·박사 과정
              <br />
              수련생 매칭
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-sage" />
            </div>
            <h3 className="font-semibold text-text mb-2">전문가 슈퍼비전</h3>
            <p className="text-sm text-text-muted">
              교수급 전문가의
              <br />
              지도 감독 필수
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-sage" />
            </div>
            <h3 className="font-semibold text-text mb-2">윤리 규정 준수</h3>
            <p className="text-sm text-text-muted">
              한국상담심리학회
              <br />
              윤리 규정 준수
            </p>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-background-elevated">
              <div className="p-4 text-center">
                <span className="text-sm text-text-subtle">항목</span>
              </div>
              <div className="p-4 text-center border-l border-divider-light">
                <span className="text-sm text-text-muted">일반 사설 센터</span>
              </div>
              <div className="p-4 text-center border-l border-divider-light bg-sage/5">
                <span className="text-sm text-sage font-medium">마음토스</span>
              </div>
            </div>

            {/* Table Body */}
            {comparisonData.map((row, index) => (
              <div
                key={row.category}
                className={`grid grid-cols-3 ${
                  index !== comparisonData.length - 1
                    ? "border-b border-divider-light"
                    : ""
                }`}
              >
                <div className="p-4 text-center">
                  <span className="text-sm text-text-muted">{row.category}</span>
                </div>
                <div className="p-4 text-center border-l border-divider-light">
                  <span className="text-sm text-text-subtle">{row.general}</span>
                </div>
                <div className="p-4 text-center border-l border-divider-light bg-sage/5">
                  <span
                    className={`text-sm font-medium ${
                      row.highlight ? "text-sage-light text-base" : "text-sage"
                    }`}
                  >
                    {row.maumtoss}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
