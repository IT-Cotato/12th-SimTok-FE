import { useSignupStore } from "@/stores/useSignupStore";

const getSignupHeader = () => {
  const { draftKey } = useSignupStore.getState();
  return draftKey ? { "Signup-Draft-Key": draftKey } : {};
};

export const signupApi = {
  submitTerms: (
    consents: { code: string; version: string; agreed: boolean }[],
  ) =>
    fetch("/api/signup/drafts/terms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getSignupHeader(),
      } as HeadersInit,
      body: JSON.stringify({ consents }),
    }),

  // STEP 3: SMS 발송
  sendSms: (phoneNumber: string) =>
    fetch("/api/signup/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getSignupHeader(),
      } as HeadersInit, // 타입 단언 추가
      body: JSON.stringify({ phoneNumber }),
    }),

  // STEP 4~6 생략 (동일한 패턴으로 추가 가능)
};
