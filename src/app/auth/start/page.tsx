// src/app/auth/start/page.tsx
"use client";

import { useRouter } from "next/navigation";

import KakaoIcon from "@/assets/kakao.svg";

export default function AuthStartPage() {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push("/auth/login");
  };

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      {/* 440 × 956 프레임 */}
      <div className="flex h-[956px] w-[440px] flex-col justify-between px-4 py-8">
        {/* 상단 로고 영역 */}
        <div className="mt-[333px] flex w-full items-center justify-center px-4 py-2.5">
          <span className="text-neutral-02 flex h-[21px] w-[408px] items-center justify-center text-[13px] font-medium">
            LOGO
          </span>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex flex-col gap-[8px] pb-6">
          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            className="flex h-[58px] w-full items-center justify-center gap-[10px] rounded-2xl bg-[#FEE500] px-[14px] py-[30px]"
          >
            <KakaoIcon className="h-[30px] w-[30px]" />
            <span className="text-[20px] font-medium text-black">
              카카오 로그인
            </span>
          </button>

          {/* 일반 로그인 버튼 */}
          <button
            type="button"
            onClick={handleClickLogin}
            className="border-neutral-08 flex h-[58px] w-full items-center justify-center rounded-2xl border bg-white px-[82px] py-[30px]"
          >
            <span className="text-neutral-02 flex h-[30px] w-[57px] items-center justify-center text-[20px]">
              로그인
            </span>
          </button>

          {/* 회원가입 버튼 */}
          <button
            type="button"
            className="flex h-[58px] w-full items-center justify-center rounded-2xl bg-black px-[82px] py-[30px]"
          >
            <span className="flex h-[30px] w-[74px] items-center justify-center text-[20px] text-white">
              회원가입
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
