// src/app/auth/login/page.tsx
"use client";

import { useState } from "react";

import EyeIcon from "@/assets/eye.svg";
import LockIcon from "@/assets/lock.svg";
import PhoneIcon from "@/assets/phone.svg";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"phone" | "password" | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = phone.length > 0 && password.length > 0;

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="flex h-[956px] w-[440px] flex-col px-4 py-[57px]">
        {/* 상단 타이틀 */}
        <div className="flex w-full items-center gap-[10px] px-4 py-[10px]">
          <h1 className="text-neutral-02 w-[274px] text-[32px] leading-[47px] font-extrabold">
            로그인하고
            <br />
            심톡을 시작해볼까요?
          </h1>
        </div>

        {/* 입력 필드 영역 */}
        <div className="mt-[40px] flex w-full flex-col gap-[10px]">
          {/* 전화번호 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center gap-[12px] rounded-2xl border px-[10px] py-[8px] ${
              focused === "phone" || phone.length > 0
                ? "border-mint-01"
                : "border-neutral-08"
            }`}
          >
            <PhoneIcon className="h-[24px] w-[24px]" />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onFocus={() => setFocused("phone")}
              onBlur={() =>
                setFocused(prev => (prev === "phone" ? null : prev))
              }
              placeholder="전화번호"
              className="text-neutral-07 placeholder:text-neutral-07 w-full bg-transparent text-[20px] leading-[30px] font-semibold outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center gap-[12px] rounded-2xl border px-[10px] py-[8px] ${
              focused === "password" || password.length > 0
                ? "border-mint-01"
                : "border-neutral-08"
            }`}
          >
            <LockIcon className="h-[24px] w-[24px]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() =>
                setFocused(prev => (prev === "password" ? null : prev))
              }
              placeholder="비밀번호"
              className="text-neutral-07 flex-1 bg-transparent text-[20px] leading-[30px] font-semibold outline-none"
            />

            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="flex h-[24px] w-[24px] items-center justify-center"
              >
                <EyeIcon className="text-neutral-06 h-[24px] w-[24px]" />
              </button>
            )}
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="mt-auto flex flex-col items-center gap-[10px] pb-[30px]">
          <button
            type="button"
            className="text-[13px] font-semibold text-black"
          >
            비밀번호를 잊으셨나요?
          </button>

          <button
            type="button"
            disabled={!isActive}
            className={`flex h-[58px] w-full items-center justify-center rounded-2xl text-[20px] font-semibold ${
              isActive
                ? "bg-mint-01 text-white"
                : "bg-neutral-08 text-neutral-05"
            }`}
          >
            로그인
          </button>
        </div>
      </div>
    </main>
  );
}
