import type { Metadata } from "next";
import localfont from "next/font/local";

import { StompProvider } from "@/context/StompContext";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "심톡- 함께 자라는 감정 소통 플랫폼",
  description:
    "심톡은 가족 간 안부를 쉽고 자연스럽게 전하는 감정 교류 채팅 서비스입니다.",
  keywords: [
    "심톡",
    "시니어",
    "가족",
    "안부",
    "안부 문자",
    "AI 안부 추천",
    "가족 채팅",
    "효도 앱",
    "세대 간 소통",
    "시니어 외로움",
    "독거노인",
    "노인 우울",
    "가족 소통 앱",
    "고정 문장 세트",
    "공동 식물 키우기",
    "하루 한 컷 챌린지",
    "기분 공유",
    "공유 일기",
    "정서 돌봄",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://simtalk.vercel.app"),
  openGraph: {
    title: "심톡 - 함께 자라는 감정 소통 플랫폼",
    description: "가족과 자연스럽게 안부를 나누는 감정 교류 채팅 서비스, 심톡",
    url: "https://simtalk.vercel.app",
    siteName: "심톡",
    images: [
      {
        url: "/serviceImage.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

const pretendard = localfont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.className} scrollbar-hide flex items-center justify-center`}
    >
      <body className="flex w-full justify-center bg-white">
        <div className="w-full max-w-[440px] shadow-2xl">
          <div className="scrollbar-hide h-screen overflow-y-scroll">
            <StompProvider>{children}</StompProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
