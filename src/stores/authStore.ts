// src/store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean; // 초기 로그인 체크 여부
  setAccessToken: (token: string | null) => void;
  setInitialized: (status: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  isInitialized: false,
  setAccessToken: token => set({ accessToken: token }),
  setInitialized: status => set({ isInitialized: status }),
  logout: () => set({ accessToken: null }),
}));
