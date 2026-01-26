import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "심리상담연구소 앤아더라이프 - 상담, 부담스럽게 느껴졌다면",
  description:
    "합리적인 가격으로 만나는 전문 심리상담. 첫 상담 무료, 회당 20,000원. 심리상담 전공 석·박사 수련생이 전문가 슈퍼비전 하에 진행하는 체계적인 상담 서비스입니다.",
  keywords: [
    "심리상담",
    "앤아더라이프",
    "심리상담연구소",
    "전문심리상담",
    "첫상담무료",
    "저렴한상담",
    "대면상담",
    "비대면상담",
    "홍대상담",
    "도포",
  ],
  openGraph: {
    title: "심리상담연구소 앤아더라이프 - 이제는 가볍게 시작해보세요",
    description:
      "합리적인 가격으로 만나는 전문 심리상담. 첫 상담 무료, 회당 20,000원. 전문가 슈퍼비전 하에 진행되는 체계적인 심리상담.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "심리상담연구소 앤아더라이프 - 이제는 가볍게 시작해보세요",
    description:
      "합리적인 가격으로 만나는 전문 심리상담. 첫 상담 무료, 회당 20,000원. 전문가 슈퍼비전 하에 진행되는 체계적인 심리상담.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
