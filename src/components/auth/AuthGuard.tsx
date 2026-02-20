"use client";
import { usePathname, useRouter } from "next/navigation";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/authStore";

import { OnlyLoader } from "../common/OnlyLoader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { accessToken, isInitialized } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 초기화가 끝났는데 토큰이 없는 경우
    if (isInitialized && !accessToken) {
      const publicPaths = ["/login", "/signup"];

      // 현재 경로가 공개 경로가 아니라면 로그인으로 리다이렉트
      if (!publicPaths.includes(pathname)) {
        router.replace("/login");
      }
    }
  }, [isInitialized, accessToken, pathname, router]);

  // 로딩 중일 때는 아무것도 안 보여주거나 스피너 노출
  if (!isInitialized) return <OnlyLoader />;

  return <>{children}</>;
}
