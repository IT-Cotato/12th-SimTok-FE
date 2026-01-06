import localfont from "next/font/local";

import "@/styles/globals.css";

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
      <body className="flex h-screen w-full max-w-[440px] overflow-y-scroll">
        {children}
      </body>
    </html>
  );
}
