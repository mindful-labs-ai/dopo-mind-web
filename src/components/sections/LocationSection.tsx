"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Train, ExternalLink } from "lucide-react";

const NAVER_MAP_URL = "https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%EC%9E%94%EB%8B%A4%EB%A6%AC%EB%A1%9C%2073";

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-background-dark" ref={ref}>
      <div className="section-container">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4">
            상담 센터 위치
          </h2>
          <p className="text-text-muted">
            편하게 방문하실 수 있도록 안내드립니다.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Map */}
            <div className="card overflow-hidden aspect-square lg:aspect-auto lg:min-h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.6789!2d126.9183!3d37.5556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98d12345678%3A0x0!2z7ISc7Jq47IucIOuniO2PrOq1rCDsnpTri6TrpqzroZwgNzM!5e0!3m2!1sko!2skr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="상담 센터 위치"
              />
            </div>

            {/* Info */}
            <div className="card p-8 flex flex-col justify-center">
              {/* Address */}
              <div className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">주소</h3>
                    <p className="text-text-muted">
                      서울시 마포구 잔다리로 73, 5층
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Train className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">교통 안내</h3>
                    <p className="text-text-muted">
                      홍대입구역 도보 5분
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Links */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={NAVER_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-[#03C75A] hover:bg-[#02b351] text-white rounded-xl font-medium transition-colors"
                >
                  네이버 지도에서 보기
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
