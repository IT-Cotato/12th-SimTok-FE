import type { Metadata } from "next";
import localfont from "next/font/local";

import { StompProvider } from "@/context/StompContext";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "심톡",
  description: "서비스 설명",
  icons: {
    icon: "/favicon.svg",
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
