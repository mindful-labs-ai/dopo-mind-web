"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DopoContentSection() {
  const contents = [
    { src: "/dopo-content-01.png", alt: "도포 인스타 콘텐츠 1" },
    { src: "/dopo-content-02.png", alt: "도포 인스타 콘텐츠 2" },
    { src: "/dopo-content-03.png", alt: "도포 인스타 콘텐츠 3" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-sage/10 rounded-full text-sage text-sm font-medium mb-4">
            도포 x 심리상담 연구소 앤아더라이프
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            도포와 심리상담 연구소 앤아더라이프가 함께합니다.
          </h2>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            도포의 인스타를 보며,{" "}
            <span className="text-sage font-medium">'어? 이거 완전 내 얘기인데'</span>{" "}
            싶었다면
          </p>
        </motion.div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contents.map((content, index) => (
            <motion.div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={content.src}
                alt={content.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-text-muted leading-relaxed max-w-xl mx-auto">
            혼자 끙끙 앓지 않아도 괜찮아요.
            <br />
            <span className="text-text font-medium">
              심리상담 연구소 앤아더라이프에서 편하게 이야기해보세요.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
