"use client";

import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

interface FooterProps {
  onOpenModal: () => void;
}

export default function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer className="bg-background-dark">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-dopo-purple to-dopo-purple-dark py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="section-container text-center relative z-10">
          <motion.p
            className="text-2xl sm:text-3xl font-bold mb-6 text-white leading-[1.5]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            더 늦기 전에, 내 마음을 안아주세요.
          </motion.p>
          <motion.button
            onClick={onOpenModal}
            className="bg-white hover:bg-gray-100 text-dopo-purple font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            지금 바로 신청하기
          </motion.button>
        </div>
      </div>

      {/* Footer content */}
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="text-xl font-bold text-white">도포의 마음 상담</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              마음이 지친 당신을 위한 따뜻한 상담 서비스
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-background-card hover:bg-dopo-purple rounded-full flex items-center justify-center transition-colors border border-white/5"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="mailto:contact@mindfullabs.kr"
                className="w-9 h-9 bg-background-card hover:bg-dopo-purple rounded-full flex items-center justify-center transition-colors border border-white/5"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Company Info */}
          <div className="text-center md:text-right text-sm text-gray-500 leading-relaxed">
            <p className="font-medium text-gray-400 mb-2">마인드풀랩스 주식회사 (Mindful Labs Inc.)</p>
            <p>대표: 강호남</p>
            <p>서울특별시 성동구 뚝섬로13길 38, 4층 (성수동)</p>
            <p className="mt-2">
              사업자등록번호 786-88-03152
            </p>
            <p>통신판매신고번호 제2025-서울마포-0943호</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-8" />

        {/* Bottom links */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex gap-6">
            <a href="#" className="hover:text-dopo-purple transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-dopo-purple transition-colors">
              개인정보처리방침
            </a>
          </div>
          <p className="text-gray-600">
            Copyright © Mindful Labs Inc. | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
