"use client";

import { useRouter } from "next/navigation";

import KakaoIcon from "@/assets/kakao.svg";

export default function AuthStartPage() {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push("/login/phone");
  };

  return (
    <main className="flex min-h-dvh justify-center">
      <div className="flex h-full w-110 flex-col gap-[197px]">
        {/* 상단 로고 영역 */}
        <div className="mt-[289px] flex w-full items-center justify-center px-4 py-2.5">
          <span className="text-sub1-r flex h-[21px] items-center justify-center text-black">
            LOGO
          </span>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex flex-col gap-[10px] pt-[10px] pb-[10px]">
          {/* 카카오 로그인 버튼 */}
          <div className="px-4">
            <button
              type="button"
              className="bg-kakao flex h-14.5 w-full items-center justify-center rounded-2xl px-3.5"
            >
              <div className="flex items-center gap-2">
                <KakaoIcon />
                <span className="text-button-sb">카카오 로그인</span>
              </div>
            </button>
          </div>

          {/* 일반 로그인 버튼 */}
          <div className="px-4">
            <button
              type="button"
              className="border-neutral-08 text-button-sb text-neutral-01 flex h-14.5 w-full items-center justify-center rounded-2xl border bg-white px-3.5"
              onClick={handleClickLogin}
            >
              로그인
            </button>
          </div>

          {/* 회원가입 버튼 */}
          <div className="px-4">
            <button
              type="button"
              className="text-button-sb flex h-14.5 w-full items-center justify-center rounded-2xl bg-black px-3.5 text-white"
              onClick={() => router.push("/signup/agree")}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
