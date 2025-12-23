"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import EyeIcon from "@/assets/eye.svg";
import ActiveEye from "@/assets/eye_mint.svg";
import LockIcon from "@/assets/lock.svg";

import FullButton from "@/components/FullButton";
import PageHeader from "@/components/Header";

export default function FindPage() {
  const [showPassword, setShowPassword] = useState(false);

  // 실제 비밀번호 값 (예시로 하드코딩)
  const password = "password";
  const displayPassword = showPassword ? password : "••••••••";

  const router = useRouter();

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        {/* 상단 헤더: 뒤로가기 */}
        <PageHeader title="비밀번호 찾기" />

        {/* 상단 타이틀 */}
        <div className="mt-[63px] flex w-full items-center gap-[10px] py-[10px] whitespace-nowrap">
          <h1 className="text-neutral-02 text-d2">
            기존에 사용하셨던 비밀번호예요.
          </h1>
        </div>

        <div className="mt-[65px] flex w-full flex-col gap-[10px] pt-[11px] pb-[95px]">
          <div className="flex w-full py-[10px]">
            {/*비밀번호 필드 */}
            <div className="border-mint-01 bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-[10px] py-[8px]">
              <div className="flex flex-1 items-center gap-[10px]">
                <LockIcon />
                <span className="text-h2 text-black">{displayPassword}</span>
              </div>

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="flex h-[40px] w-[40px] items-center justify-center rounded-2xl bg-white"
              >
                {showPassword ? (
                  <ActiveEye className="h-[26px] w-[26px] cursor-pointer" />
                ) : (
                  <EyeIcon className="h-[26px] w-[26px] cursor-pointer" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* 아래에 확인 버튼 프레임 */}
        <div className="mt-[330px] flex w-full justify-center px-4 pb-[30px]">
          <FullButton
            activeClass="bg-mint-01 text-white text-button-sb"
            inactiveClass="bg-mint-01 text-white text-button-sb"
            onClick={() => router.push("/auth/login")}
          >
            확인
          </FullButton>
        </div>
      </div>
    </main>
  );
}
