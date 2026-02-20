import { BACKEND_BASE_URL } from "@/lib/constants";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

import { login, postRefresh } from "@/app/api/auth/auth.api";

export const apiInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

apiInstance.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const AUTH_FREE_KEYWORDS = ["login", "signup", "password", "onboarding"];

apiInstance.interceptors.request.use(config => {
  const currentPath = window.location.pathname.toLowerCase();

  // 2. 현재 경로가 '청정 구역'인지 확인
  const isAuthFreePage = AUTH_FREE_KEYWORDS.some(keyword =>
    currentPath.includes(keyword),
  );

  if (isAuthFreePage) {
    return config;
  }

  // 3. Zustand 스토어에서 직접 토큰 추출
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
