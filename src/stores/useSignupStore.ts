import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Term {
  code: string;
  version: string;
  title: string;
  required: boolean;
}

interface SignupState {
  draftKey: string | null;
  terms: Term[];
  setSignupData: (draftKey: string, terms: Term[]) => void;
}

export const useSignupStore = create<SignupState>()(
  persist(
    set => ({
      draftKey: null,
      terms: [],
      setSignupData: (draftKey, terms) => set({ draftKey, terms }),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
