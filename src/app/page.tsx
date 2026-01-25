"use client";

import { useState } from "react";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import TargetSection from "@/components/sections/TargetSection";
import DopoContentSection from "@/components/sections/DopoContentSection";
import WhyAndAnotherLifeSection from "@/components/sections/WhyAndAnotherLifeSection";
import WhyProfessionalSection from "@/components/sections/WhyMaumTossSection";
import ServiceDetailSection from "@/components/sections/ServiceDetailSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingSection from "@/components/sections/PricingSection";
import LocationSection from "@/components/sections/LocationSection";
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
      <Header onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <TargetSection />
      <DopoContentSection />
      <WhyAndAnotherLifeSection />
      <WhyProfessionalSection />
      <ServiceDetailSection />
      <ProcessSection />
      <PricingSection onOpenModal={openModal} />
      <LocationSection />
      <FAQSection />
      <Footer onOpenModal={openModal} />

      <FloatingCTA onClick={openModal} />
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
