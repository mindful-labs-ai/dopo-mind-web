import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "도포의 마음 상담 - 내 마음을 듣는 시간",
  description:
    "4만 팔로워 도포와 함께하는 심리 상담. 회당 1만원대, 보증금 환급 혜택. 상담에 대한 부담감을 낮추고 합리적인 가격으로 내 마음을 돌봐보세요.",
  keywords: ["도포", "심리상담", "마음상담", "온라인상담", "저렴한상담"],
  openGraph: {
    title: "도포의 마음 상담 - 내 마음을 듣는 시간",
    description:
      "4만 팔로워 도포와 함께하는 심리 상담. 회당 1만원대, 보증금 환급 혜택.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "도포의 마음 상담 - 내 마음을 듣는 시간",
    description:
      "4만 팔로워 도포와 함께하는 심리 상담. 회당 1만원대, 보증금 환급 혜택.",
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
