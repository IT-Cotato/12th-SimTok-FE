"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/authStore";

import { postRefresh } from "@/app/api/auth/auth.api";

// 이전에 작성하신 refresh 함수 경로

export default function AuthInitializer() {
  const { setAccessToken, setInitialized } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. 앱 접속/새로고침 시 서버에 리프레시 토큰(쿠키)을 보내 새 액세스 토큰 요청
        const { accessToken } = await postRefresh();

        // 2. 성공하면 Zustand 메모리에 저장
        setAccessToken(accessToken);
      } catch (error) {
        // 3. 실패하면 로그인 정보가 없는 것으로 간주
        setAccessToken(null);
      } finally {
        // 4. 성공하든 실패하든 "초기 세션 체크 완료" 상태로 변경
        setInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken, setInitialized]);

  // 이 컴포넌트는 UI를 그리지 않고 로직만 실행합니다.
  return null;
}
