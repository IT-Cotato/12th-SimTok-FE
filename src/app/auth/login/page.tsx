// src/app/auth/login/page.tsx
"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import BackIcon from "@/assets/back.svg";
import EyeIcon from "@/assets/eye.svg";
import LockIcon from "@/assets/lock.svg";
import PhoneIcon from "@/assets/phone.svg";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"phone" | "password" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const isActive = phone.length > 0 && password.length > 0;

  const formatPhone = (value: string) => {
    const onlyNumber = value.replace(/\D/g, ""); // 숫자만 남기기

    if (onlyNumber.length < 4) return onlyNumber;
    if (onlyNumber.length < 8) {
      return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3)}`; // 010-123
    }
    return `${onlyNumber.slice(0, 3)}-${onlyNumber.slice(3, 7)}-${onlyNumber.slice(7, 11)}`; // 010-1234-5678
  };

  // onChange 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyNumber = raw.replace(/\D/g, "");
    setPhone(onlyNumber); // state에는 숫자만
  };

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div
        className={`flex h-[956px] w-[440px] flex-col px-4 py-[57px] ${
          isActive ? "bg-radial-yellowgreen-mintgreen" : "bg-white"
        }`}
      >
        {/* 상단 헤더: 뒤로가기 + 로그인 */}
        <header className="flex w-full items-center justify-between px-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-6 w-6 items-center justify-center"
          >
            <BackIcon className="text-neutral-02 h-6 w-6" />
          </button>
          <span className="text-subtitle1_semibold text-black">로그인</span>

          {/* 오른쪽 자리를 맞추기 위한 더미 박스 */}
          <div className="h-6 w-6" />
        </header>

        {/* 상단 타이틀 */}
        <div className="mt-[63px] flex w-full items-center gap-[10px] px-4 py-[10px]">
          <h1 className="text-neutral-02 text-display02 w-[274px]">
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
              value={formatPhone(phone)}
              onChange={handlePhoneChange}
              onFocus={() => setFocused("phone")}
              onBlur={() =>
                setFocused(prev => (prev === "phone" ? null : prev))
              }
              placeholder="전화번호"
              className="text-neutral-07 placeholder:text-neutral-07 text-heading2 w-full bg-transparent outline-none"
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
              className="text-neutral-07 placeholder:text-neutral-07 text-heading2 w-full bg-transparent outline-none"
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
            className="text-subtitle2_semibold cursor-pointer text-black"
            onClick={() => router.push("/auth/password")}
          >
            비밀번호를 잊으셨나요?
          </button>

          <button
            type="button"
            disabled={!isActive}
            onClick={() => router.push("/")}
            className={`font-noraml flex h-[58px] w-full items-center justify-center rounded-2xl text-[20px] ${
              isActive
                ? "bg-mint-01 text-white"
                : "border-neutral-08 text-neutral-06 border bg-white"
            }`}
          >
            로그인
          </button>
        </div>
      </div>
    </main>
  );
}
