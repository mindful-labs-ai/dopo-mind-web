"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Heart, Award, Clock } from "lucide-react";

const dmMessages = [
  {
    message: "도포님, 요즘 너무 힘든데 어디서 상담받으면 좋을까요?",
    delay: 0,
  },
  {
    message: "혼자 끙끙 앓다가 도포님 글 보고 위로받았어요. 전문 상담 받고 싶은데...",
    delay: 0.1,
  },
  {
    message: "상담 비용이 너무 부담돼서 망설여지는데, 추천해주실 수 있나요?",
    delay: 0.2,
  },
  {
    message: "병원 가기는 무섭고, 그냥 편하게 이야기할 수 있는 곳 없을까요?",
    delay: 0.3,
  },
  {
    message: "도포님처럼 공감해주는 상담사분 계시면 좋겠어요 ㅠㅠ",
    delay: 0.4,
  },
];

const centerHighlights = [
  {
    icon: Clock,
    title: "30년 경력",
    description: "오랜 시간 쌓아온 전문성",
  },
  {
    icon: Award,
    title: "한국상담학회 인증",
    description: "공인된 전문 상담 센터",
  },
  {
    icon: Heart,
    title: "따뜻한 상담",
    description: "마음을 이해하는 상담",
  },
];

export default function PartnershipStorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="partnership-story"
      className="py-24 bg-background-dark"
      ref={ref}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            도포에게 쏟아진{" "}
            <span className="text-sage">수많은 마음의 소리</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            4만 팔로워의 마음을 어루만지는 도포에게,
            <br className="sm:hidden" /> 매일 수많은 상담 문의가 찾아왔습니다.
          </p>
        </motion.div>

        {/* DM Messages - Bubble Style */}
        <motion.div
          className="max-w-2xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {dmMessages.map((dm, index) => (
            <motion.div
              key={index}
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + dm.delay }}
            >
              <div
                className={`relative max-w-[85%] sm:max-w-[70%] px-5 py-3.5 rounded-2xl ${
                  index % 2 === 0
                    ? "bg-background-card rounded-tl-sm"
                    : "bg-sage/10 rounded-tr-sm"
                }`}
                style={{
                  border: "1px solid var(--border-light)",
                }}
              >
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {dm.message}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Transition */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="card max-w-3xl mx-auto p-8">
            <p className="text-lg text-text leading-relaxed">
              도포는 고민했습니다.
              <br />
              <span className="text-text-muted">
                &ldquo;어떻게 하면 이 마음들에 진짜 도움을 줄 수 있을까?&rdquo;
              </span>
            </p>
            <div className="my-6 flex justify-center">
              <div className="w-12 h-[2px] bg-sage/30 rounded-full" />
            </div>
            <p className="text-lg text-text leading-relaxed">
              그래서{" "}
              <span className="text-sage font-semibold">30년 경력</span>의{" "}
              <span className="text-sage font-semibold">
                한국상담학회 인증 전문 상담 센터
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span className="font-semibold">'앤아더라이프'</span>와 손을
              잡았습니다.
            </p>
          </div>
        </motion.div>

        {/* Center Introduction */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {/* Center Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/dopo-mindcenter-bg.webp"
              alt="심리상담연구소 앤아더라이프 상담 센터"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Center Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-sage/10 rounded-full text-sage text-sm font-medium mb-3">
                심리상담연구소 앤아더라이프
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-text mb-4">
                전문성과 따뜻함을 함께 갖춘
                <br />
                믿을 수 있는 상담 파트너
              </h3>
              <p className="text-text-muted leading-relaxed">
                앤아더라이프는 30년간 수많은 마음을 치유해온 전문 상담
                센터입니다. 한국상담학회 인증을 받은 체계적인 상담 시스템과
                따뜻한 상담사들이 여러분의 이야기를 기다리고 있습니다.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4">
              {centerHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <item.icon className="w-5 h-5 text-sage" />
                  </div>
                  <p className="text-sm font-semibold text-text">{item.title}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
