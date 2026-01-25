"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Coins, GraduationCap, Heart } from "lucide-react";

const benefits = [
  {
    icon: Coins,
    title: "합리적인 비용",
    description: "사설 센터 대비 1/3~1/5 수준의 상담료",
  },
  {
    icon: GraduationCap,
    title: "심리 치료 기반 상담",
    description: "검증된 심리 치료 이론에 기반한 체계적 접근",
  },
  {
    icon: Heart,
    title: "부담 없는 첫 시작",
    description: "첫 상담 무료로 나에게 맞는지 먼저 확인 가능",
  },
];

export default function WhyAndAnotherLifeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-andanotherlife" className="py-24 bg-background" ref={ref}>
      <div className="section-container">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            전문상담 센터는 부담되는데,
            <br />
            <span className="text-sage">심리 치료 기반으로 얘기를 해보고 싶다면</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            심리상담 연구소 앤아더라이프는 전문성은 유지하면서도,
            비용 부담은 낮춘 새로운 선택지입니다.
          </p>
        </motion.div>

        {/* Description Box */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card p-8 text-center">
            <p className="text-text-muted text-lg leading-relaxed">
              일반 사설 센터의 높은 비용이 부담되셨나요?
              <br className="hidden sm:block" />
              앤아더라이프에서는 심리 치료 기반의 체계적인 상담을
              <br className="hidden sm:block" />
              <span className="text-sage font-medium">합리적인 가격에</span> 경험할 수 있습니다.
            </p>
          </div>
        </motion.div>

        {/* Benefit Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
            >
              <div className="w-14 h-14 bg-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <benefit.icon className="w-7 h-7 text-sage" />
              </div>
              <h3 className="font-semibold text-text text-lg mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
