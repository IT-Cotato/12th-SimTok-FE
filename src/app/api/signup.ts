import { useSignupStore } from "@/stores/useSignupStore";

const getSignupHeader = (): Record<string, string> => {
  const { draftKey } = useSignupStore.getState();
  return draftKey ? { "Signup-Draft-Key": draftKey } : {};
};

export const signupApi = {
  // STEP 2: 약관 동의 제출
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

  // STEP 3: 인증번호 SMS 발송
  sendSms: (phoneNumber: string) =>
    fetch("/api/signup/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getSignupHeader(),
      } as HeadersInit,
      body: JSON.stringify({ phoneNumber }),
    }),

  // STEP 4: OTP 검증
  verifyOtp: (otpCode: string) =>
    fetch("/api/signup/otp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getSignupHeader(),
      } as HeadersInit,
      body: JSON.stringify({ otpCode }),
    }),

  // STEP 5: 프로필 정보 제출
  submitProfile: (profile: { name: string; birthDate: string }) =>
    fetch("/api/signup/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getSignupHeader(),
      } as HeadersInit,
      body: JSON.stringify(profile),
    }),

  // STEP 6: 비밀번호 설정 (최종 가입)
  submitPassword: (passwordData: {
    password: string;
    confirmPassword: string;
  }) =>
    fetch("/api/signup/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getSignupHeader(),
      } as HeadersInit,
      body: JSON.stringify(passwordData),
    }),
};
