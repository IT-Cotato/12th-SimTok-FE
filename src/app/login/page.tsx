"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import Logo from "@/public/images/logo.svg";

const AuthStartPage = () => {
  const router = useRouter();
  const { setSignupData } = useSignupStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLogin = () => {
    router.push("/login/phone");
  };

  const handleStartSignup = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/signup/drafts", { method: "POST" });
      const result = await response.json();

      const draftKey =
        result.data?.draftKey || response.headers.get("signup-draft-key");
      const terms = result.data?.terms || result.data?.data?.terms || [];

      if (draftKey && terms.length > 0) {
        setSignupData(draftKey, terms);
        router.push("/signup/agree");
      } else {
        console.warn("데이터 부족: Key나 Terms가 없음", { draftKey, terms });
        alert("회원가입 정보를 불러오는데 실패했습니다. 다시 시도해주세요");
      }
    } catch (error) {
      console.error("네트워크 에러:", error);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-dvh w-full flex-col justify-center">
      <div className="flex w-full flex-1 items-center justify-center">
        <Logo className="h-9 w-[215px]" />
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
