"use client";

import { useRouter } from "next/navigation";

import KakaoIcon from "@/assets/kakao.svg";

export default function AuthStartPage() {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push("/auth/login");
  };

  return (
    <main className="flex min-h-dvh justify-center">
      {/* 440 × 956 프레임 */}
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
            <button className="bg-kakao flex h-[58px] w-full cursor-pointer items-center justify-center rounded-2xl px-[14px]">
              <div className="flex items-center gap-2 px-[82px]">
                <KakaoIcon />
                <span className="text-h2 flex h-[30px] items-center">
                  카카오 로그인
                </span>
              </div>
            </button>
          </div>

          {/* 일반 로그인 버튼 */}
          <div className="px-4">
            <button
              className="border-neutral-08 flex h-[58px] w-full cursor-pointer items-center justify-center rounded-2xl border px-[14px]"
              onClick={handleClickLogin}
            >
              <div className="flex items-center px-[82px]">
                <span className="text-h2 flex h-[30px] items-center">
                  로그인
                </span>
              </div>
            </button>
          </div>

          {/* 회원가입 버튼 */}
          <div className="px-4">
            <button className="flex h-[58px] w-full cursor-pointer items-center justify-center rounded-2xl bg-black px-[14px]">
              <div className="flex items-center px-[82px]">
                <span className="text-h2 flex h-[30px] items-center text-white">
                  회원가입
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
