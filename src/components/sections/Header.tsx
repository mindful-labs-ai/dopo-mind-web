"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface HeaderProps {
  onOpenModal: () => void;
}

const navLinks = [
  { label: "서비스 소개", href: "#why-andanotherlife", isExternal: false },
  { label: "상담 안내", href: "#process", isExternal: false },
  { label: "비용 안내", href: "#pricing", isExternal: false },
  { label: "자주 묻는 질문", href: "/faq", isExternal: true },
];

export default function Header({ onOpenModal }: HeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background-dark/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#"
              className="text-lg sm:text-xl font-bold text-text hover:text-sage transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              앤아더라이프
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) =>
                link.isExternal ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={onOpenModal}
                className="bg-sage hover:bg-sage-dark text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 text-sm"
              >
                부담 없이 시작하기
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                className="p-2 text-text-muted hover:text-text transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-background-dark border-b border-divider shadow-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="section-container py-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) =>
                    link.isExternal ? (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-left text-text-muted hover:text-text transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="text-left text-text-muted hover:text-text transition-colors py-2"
                      >
                        {link.label}
                      </button>
                    )
                  )}
                  <div className="pt-4 border-t border-divider">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenModal();
                      }}
                      className="w-full bg-sage hover:bg-sage-dark text-white font-medium py-3 px-6 rounded-full transition-all duration-300"
                    >
                      부담 없이 시작하기
                    </button>
                  </div>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
