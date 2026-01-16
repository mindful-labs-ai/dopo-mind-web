"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const contentItems = [
  {
    image: "/dopo-content-01.png",
    link: "https://www.instagram.com/reel/DQJQ80uEuqx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    image: "/dopo-content-02.png",
    link: "https://www.instagram.com/reel/DReiayiDw6Z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    image: "/dopo-content-03.png",
    link: "https://www.instagram.com/reel/DQd3cT5klCv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

export default function PainPointSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 bg-background-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dopo-purple/30 to-transparent" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-dopo-purple/10 rounded-full blur-3xl" />

      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            <span className="block leading-[1.4] mb-3">도포의 인스타를 보며,</span>
            <span className="block leading-[1.4]">
              <span className="text-dopo-purple">&apos;어? 이거 완전 내 얘긴데&apos;</span> 싶었다면.
            </span>
          </h2>
        </motion.div>

        {/* Content cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 items-center">
          {contentItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Image
                src={item.image}
                alt={`도포 인스타 콘텐츠 ${index + 1}`}
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </motion.a>
          ))}
        </div>

        {/* Bridge copy */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-[1.7]">
            좋아요만 누르고 넘겼던 그 마음,
            <br />
            <span className="text-dopo-purple-light font-medium">
              사실은 누군가 깊게 들어주길 바라지 않았나요?
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
