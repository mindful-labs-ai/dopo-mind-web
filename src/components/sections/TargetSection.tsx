"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";

const targets = [
  {
    title: "고민이 크지 않다고 생각하는 사람",
    message: "내 고민이 상담까지 받을 만한 고민인지 모르겠어요.",
  },
  {
    title: "상담 가격이 부담스러운 사람",
    message: "상담을 받고 싶은데 가격이 너무 부담돼요.",
  },
  {
    title: "상담 경험이 없는 사람",
    message: "상담 경험이 없어서 어떻게 시작해야 할지 막막해요.",
  },
  {
    title: "나 자신에 대해서 알고 싶은 사람",
    message: "더 단단한 마음을 갖고 싶어요.",
  },
];

export default function TargetSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background-dark" ref={ref}>
      <div className="section-container">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            이런 분들이라면, <span className="text-sage">상담을 받아보세요.</span>
          </h2>
          <p className="text-text-muted">
            망설이고 계셨다면, 지금이 시작할 때입니다.
          </p>
          <span className="inline-block mt-3 px-4 py-1.5 bg-sage/10 text-sage text-sm rounded-full border border-sage/20">
            1987~2007년생 대상 (2030세대 전용 혜택)
          </span>
        </motion.div>

        {/* Target Cards - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {targets.map((target, index) => (
            <motion.div
              key={index}
              className="relative aspect-square bg-[#FAF8F5] dark:bg-white/5 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-text text-center headline">
                {target.title}
              </h3>

              {/* Speech Bubble */}
              <div className="relative bg-white dark:bg-background-elevated rounded-2xl p-3 sm:p-4 shadow-sm border border-divider-light dark:border-divider-dark w-full">
                <p className="text-text leading-relaxed text-xs sm:text-sm text-center">
                  "{target.message}"
                </p>
                {/* Bubble Tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white dark:border-t-background-elevated" />
                </div>
              </div>

              {/* Profile Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-background dark:bg-background-elevated rounded-full flex items-center justify-center mt-2 border border-divider-light dark:border-divider-dark">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-sage" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
