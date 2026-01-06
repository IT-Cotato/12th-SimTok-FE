import type { AppProps } from "next/app";
import localfont from "next/font/local";

import "@/styles/globals.css";

const pretendard = localfont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${pretendard.className} flex items-center justify-center`}>
      <div className="scrollbar-hide flex h-screen w-full max-w-[440px] overflow-y-scroll">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
