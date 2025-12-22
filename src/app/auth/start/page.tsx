"use client";

import { useRouter } from "next/navigation";

import KakaoIcon from "@/assets/kakao.svg";

import FullButton from "@/components/FullButton";

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
            <FullButton
              activeClass="bg-kakao"
              inactiveClass="bg-kakao"
              isActive
            >
              <div className="flex items-center gap-2">
                <KakaoIcon />
                <span>카카오 로그인</span>
              </div>
            </FullButton>
          </div>

          {/* 일반 로그인 버튼 */}
          <div className="px-4">
            <FullButton
              activeClass="bg-white border border-neutral-08"
              inactiveClass="bg-white border border-neutral-08"
              isActive
              onClick={handleClickLogin}
            >
              로그인
            </FullButton>
          </div>

          {/* 회원가입 버튼 */}
          <div className="px-4">
            <FullButton
              activeClass="bg-black text-white"
              inactiveClass="bg-black text-white"
              isActive
            >
              회원가입
            </FullButton>
          </div>
        </div>
      </div>
    </main>
  );
}
