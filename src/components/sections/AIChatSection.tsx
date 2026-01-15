"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Moon, MessageCircle } from "lucide-react";

const chatMessages = [
  { type: "user", message: "도포야, 오늘 너무 힘들었어..." },
  { type: "dopo", message: "무슨 일 있었어? 얘기해줄래?" },
  { type: "user", message: "회사에서 자꾸 혼나고 집에 오니까 눈물이 나..." },
  {
    type: "dopo",
    message:
      "그랬구나... 많이 힘들었겠다. 울고 싶을 땐 울어도 돼. 내가 여기 있을게.",
  },
];

export default function AIChatSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-background-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-dopo-purple/10 rounded-full blur-3xl" />

      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-dopo-purple/20 text-dopo-purple-light px-4 py-2 rounded-full mb-8 border border-dopo-purple/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <Bot className="w-4 h-4" />
                <span className="font-medium">24시간 도포 AI</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
                <span className="block leading-[1.4] mb-3">
                  <span className="text-dopo-purple">새벽 2시</span>에도,
                </span>
                <span className="block leading-[1.4]">도포는 깨어있어요.</span>
              </h2>

              <p className="text-lg text-gray-400 mb-8 leading-[1.8]">
                상담이 없는 날, 갑자기 우울해져도 괜찮아요.
                <br />
                <span className="text-dopo-purple-light font-medium">
                  GPT 기반으로 학습된 도포 AI
                </span>
                가<br />
                당신의 감정 기록을 도와드릴게요.
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Moon className="w-5 h-5 text-dopo-purple" />
                  <span>24시간 응대</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageCircle className="w-5 h-5 text-dopo-purple" />
                  <span>감정 기록</span>
                </div>
              </div>
            </motion.div>

            {/* Chat mockup */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-background-card rounded-3xl p-2 shadow-2xl border border-white/5">
                <div className="bg-gradient-to-b from-dopo-purple/10 to-background-dark rounded-2xl overflow-hidden">
                  {/* Phone header */}
                  <div className="bg-background-dark px-6 py-4 flex items-center gap-3 border-b border-white/5">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-dopo-purple flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/dopo_character_profile.png"
                        alt="도포"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">도포</p>
                      <p className="text-green-400 text-xs">온라인</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="p-4 space-y-3 min-h-[320px]">
                    {chatMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${
                          msg.type === "user" ? "justify-end" : "justify-start"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.2 }}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                            msg.type === "user"
                              ? "bg-dopo-purple text-white rounded-br-md"
                              : "bg-background-card text-gray-200 rounded-bl-md border border-white/5"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Input area */}
                  <div className="bg-background-dark px-4 py-3 border-t border-white/5">
                    <div className="bg-background-card rounded-full px-4 py-2 flex items-center border border-white/5">
                      <span className="text-gray-500 text-sm">
                        메시지를 입력하세요...
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating time indicator */}
              <motion.div
                className="absolute -top-4 -right-4 bg-dopo-purple text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg glow-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                새벽 2:47 AM
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
