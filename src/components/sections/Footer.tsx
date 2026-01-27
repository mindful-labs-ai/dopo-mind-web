"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

interface FooterProps {
  onOpenModal: () => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="bg-background-dark">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-sage to-sage-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="section-container text-center relative z-10">
          <motion.p
            className="text-2xl sm:text-3xl font-bold mb-4 text-white leading-[1.5]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            혼자 끙끙 앓지 마세요.
          </motion.p>
          <motion.p
            className="text-lg text-white/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            첫 상담은 무료입니다.
          </motion.p>
          <motion.button
            onClick={onOpenModal}
            className="bg-white hover:bg-gray-100 text-sage-dark font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            부담 없이 첫 상담 시작하기
          </motion.button>
        </div>
      </div>

      {/* Footer content */}
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="text-xl font-bold text-text">도포 & 심리상담연구소 앤아더라이프</span>
            </div>
            <p className="text-text-subtle text-sm mb-4">
              합리적인 비용으로 만나는 전문 심리상담
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              <a
                href="mailto:business@mindfullabs.ai"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-sage transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>business@mindfullabs.ai</span>
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                <span>서울시 마포구 잔다리로 73, 5층</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="text-center md:text-right text-sm text-text-subtle leading-relaxed">
            <p className="font-medium text-text-muted mb-2">마인드풀랩스 주식회사 (Mindful Labs Inc.)</p>
            <p>대표: 강호남</p>
            <p>서울특별시 성동구 뚝섬로13길 38, 4층 (성수동)</p>
            <p className="mt-2">
              사업자등록번호 786-88-03152
            </p>
            <p>통신판매신고번호 제2025-서울마포-0943호</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-divider-light my-8" />

        {/* Bottom links */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-subtle">
          {/* <div className="flex gap-6">
            <a href="#" className="hover:text-sage transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-sage transition-colors">
              개인정보처리방침
            </a>
          </div> */}
          <p className="text-text-subtle">
            Copyright © Mindful Labs Inc. | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
