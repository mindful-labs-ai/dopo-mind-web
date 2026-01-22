"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const partners = [
  {
    name: "파트너 기관 1",
    logo: "/partners/partner-logo-01.png",
  },
  {
    name: "파트너 기관 2",
    logo: "/partners/partner-logo-01.png",
  },
  {
    name: "파트너 기관 3",
    logo: "/partners/partner-logo-01.png",
  },
  {
    name: "파트너 기관 4",
    logo: "/partners/partner-logo-01.png",
  },
  {
    name: "파트너 기관 5",
    logo: "/partners/partner-logo-01.png",
  },
  {
    name: "파트너 기관 6",
    logo: "/partners/partner-logo-01.png",
  },
];

export default function PartnersSection() {
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
            제휴 기관
          </h2>
          <p className="text-text-muted">
            마음토스 상담센터와 함께하는 파트너들입니다.
          </p>
        </motion.div>

        {/* Partner Logos */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="card flex items-center justify-center h-24 hover:bg-background-elevated transition-colors relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
