"use client";

import { useRouter } from "next/navigation";

import { useSignupStore } from "@/stores/useSignupStore";

const AuthStartPage = () => {
  const router = useRouter();
  const { setDraftKey, setCurrentStep } = useSignupStore();

  const handleClickLogin = () => {
    router.push("/login/phone");
  };

  const handleStartSignup = async () => {
    try {
      const response = await fetch("/api/signup/drafts", { method: "POST" });
      const result = await response.json();

      const draftKey =
        result.data?.draftKey || response.headers.get("signup-draft-key");
      if (draftKey) {
        setDraftKey(draftKey); // 스토어에 키 저장
        setCurrentStep(result.data.step); // 현재 단계 저장 (TERMS_REQUIRED)
        router.push("/signup/agree");
      }
      // 1. 응답 바디의 데이터 구조에 따른 키 추출 (가장 권장)
      // result.data 안의 draftKey 확인
      const bodyKey = result?.data?.draftKey;

      // 2. 응답 헤더에서 키 추출
      const headerKey = response.headers.get("signup-draft-key");

      const finalKey = bodyKey || headerKey;

      if (finalKey) {
        console.log("확인된 드래프트 키:", finalKey);
        sessionStorage.setItem("signup_draft_key", finalKey);
        router.push("/signup/agree");
      } else {
        console.error("키 추출 실패: 응답 바디와 헤더 모두에 키가 없음");
        console.log("분석된 바디 구조:", result);
      }
    } catch (error) {
      console.error("네트워크 에러:", error);
    }
  };

  return (
    <main className="flex min-h-dvh w-full flex-col justify-center">
      <div className="flex w-full flex-1 items-center justify-center px-4 py-2.5">
        <span className="text-d1 text-mint-01 flex items-center justify-center">
          SIMTOK
        </span>
      </div>

      <div className="mb-13 flex flex-col gap-6 py-[10px]">
        <div className="px-4">
          <button
            type="button"
            className="border-neutral-08 text-button-sb bg-mint-01 flex h-14.5 w-full cursor-pointer items-center justify-center rounded-2xl border px-3.5 text-white"
            onClick={handleClickLogin}
          >
            로그인
          </button>
        </div>

        <div className="px-4">
          <button
            type="button"
            className="text-button-sb border-mint-01 text-mint-01 flex h-14.5 w-full cursor-pointer items-center justify-center rounded-2xl border bg-white px-3.5"
            onClick={handleStartSignup}
          >
            회원가입
          </button>
        </div>
      </div>
    </main>
  );
};

export default AuthStartPage;
