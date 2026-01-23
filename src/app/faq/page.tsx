"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ConsultationModal from "@/components/forms/ConsultationModal";
import FloatingCTA from "@/components/ui/FloatingCTA";
import { faqs } from "@/constants/faq-data";

export default function FAQPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      <Header onOpenModal={openModal} />

      <section className="pt-32 pb-24 bg-background">
        <div className="section-container">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              홈으로 돌아가기
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text tracking-tight leading-[1.4]">
                자주 묻는 질문
              </h1>
              <p className="mt-4 text-text-muted">
                마음토스 상담센터에 대해 궁금한 점을 확인해보세요
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-background-elevated transition-colors"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <span className="font-medium text-text pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-sage flex-shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 text-text-muted leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <p className="text-text-muted mb-4">
                찾으시는 답변이 없으신가요?
              </p>
              <button
                onClick={openModal}
                className="btn-primary"
              >
                상담 신청하기
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer onOpenModal={openModal} />
      <FloatingCTA onClick={openModal} />
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
