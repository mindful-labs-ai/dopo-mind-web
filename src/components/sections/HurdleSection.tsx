"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Briefcase, GraduationCap, Users } from "lucide-react";

const examples = [
  { icon: Heart, label: "연예인" },
  { icon: Briefcase, label: "CEO" },
  { icon: GraduationCap, label: "학생" },
  { icon: Users, label: "직장인" },
];

export default function HurdleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 bg-gradient-to-b from-background to-background-dark relative"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-dopo-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-dopo-purple/20 px-4 py-2 rounded-full mb-10 border border-dopo-purple/30">
            <span className="text-dopo-purple-light font-medium">
              상담에 대한 오해
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-10 tracking-tight">
            <span className="block leading-[1.4] mb-3">
              상담은 <span className="text-dopo-purple">&apos;아픈 사람&apos;</span>이 아니라,
            </span>
            <span className="block leading-[1.4]">
              <span className="text-dopo-purple">&apos;나를 알고 싶은 사람&apos;</span>이 받는 거야.
            </span>
          </h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 mb-12 leading-[1.8]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            몸이 찌뿌둥하면 마사지를 받듯,
            <br />
            마음이 꼬였을 땐 상담이 필요해요.
          </motion.p>

          {/* Example people */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {examples.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 bg-background-card px-5 py-3 rounded-full border border-white/10"
                whileHover={{ scale: 1.05, borderColor: "rgba(106, 82, 241, 0.5)" }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-5 h-5 text-dopo-purple" />
                <span className="text-gray-300 font-medium">{item.label}</span>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 bg-dopo-purple/20 px-5 py-3 rounded-full border border-dopo-purple/30">
              <span className="text-gray-200 font-medium">
                그리고 <span className="text-dopo-purple">당신</span>도
              </span>
            </div>
          </motion.div>

          <motion.p
            className="text-gray-500 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            이미 많은 사람들이 상담을 받고 있어요.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
