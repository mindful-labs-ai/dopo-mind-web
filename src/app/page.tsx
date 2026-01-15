"use client";

import { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import PainPointSection from "@/components/sections/PainPointSection";
import HurdleSection from "@/components/sections/HurdleSection";
import PricingSection from "@/components/sections/PricingSection";
import DepositSection from "@/components/sections/DepositSection";
import AIChatSection from "@/components/sections/AIChatSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";
import ConsultationModal from "@/components/forms/ConsultationModal";
import FloatingCTA from "@/components/ui/FloatingCTA";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      <HeroSection onOpenModal={openModal} />
      <PainPointSection />
      <HurdleSection />
      <PricingSection />
      <DepositSection />
      <AIChatSection />
      <FAQSection />
      <Footer onOpenModal={openModal} />

      <FloatingCTA onClick={openModal} />
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
