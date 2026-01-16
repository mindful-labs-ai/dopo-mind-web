import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "마음토스 상담센터 - 합리적인 비용의 전문 심리상담",
  description:
    "상담심리 전공 석·박사 수련생과 함께하는 전문 심리상담. 회당 18,000원, 첫 상담 무료. 검증된 전문성과 합리적인 비용으로 마음의 짐을 가볍게 토스하세요.",
  keywords: ["심리상담", "마음토스", "상담센터", "저렴한상담", "전문상담", "대면상담", "홍대상담"],
  openGraph: {
    title: "마음토스 상담센터 - 합리적인 비용의 전문 심리상담",
    description:
      "상담심리 전공 석·박사 수련생과 함께하는 전문 심리상담. 회당 18,000원, 첫 상담 무료.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "마음토스 상담센터 - 합리적인 비용의 전문 심리상담",
    description:
      "상담심리 전공 석·박사 수련생과 함께하는 전문 심리상담. 회당 18,000원, 첫 상담 무료.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
