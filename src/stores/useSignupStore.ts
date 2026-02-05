import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SignupState {
  draftKey: string | null;
  currentStep: string;
  setDraftKey: (key: string) => void;
  setCurrentStep: (step: string) => void;
  resetSignup: () => void;
}

export const useSignupStore = create<SignupState>()(
  persist(
    set => ({
      draftKey: null,
      currentStep: "START",
      setDraftKey: key => set({ draftKey: key }),
      setCurrentStep: step => set({ currentStep: step }),
      resetSignup: () => set({ draftKey: null, currentStep: "START" }),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => sessionStorage), // 세션 종료 시 초기화
    },
  ),
);
