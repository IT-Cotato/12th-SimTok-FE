"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import EyeIcon from "@/assets/eye.svg";
import LockIcon from "@/assets/lock.svg";
import PhoneIcon from "@/assets/phone.svg";

import FullButton from "@/components/FullButton";
import PageHeader from "@/components/Header";

import { formatPhone } from "@/utils/formatPhone";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"phone" | "password" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const isActive = phone.length > 0 && password.length > 0;

  // onChange 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyNumber = raw.replace(/\D/g, "");
    setPhone(onlyNumber); // state에는 숫자만
  };

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div
        className={`mt-[13px] flex h-full w-110 flex-col px-4 ${
          isActive ? "bg-radial-yellowgreen-mintgreen" : "bg-white"
        }`}
      >
        {/* 상단 헤더: 뒤로가기 + 로그인 */}
        <PageHeader title="로그인" />

        {/* 상단 타이틀 */}
        <div className="mt-[63px] flex w-full items-center gap-[10px] py-[10px]">
          <h1 className="text-neutral-02 text-d2">
            로그인하고
            <br />
            심톡을 시작해볼까요?
          </h1>
        </div>

        {/* 입력 필드 영역 */}
        <div className="mt-[29px] flex w-full flex-col gap-[10px] pt-[11px]">
          {/* 전화번호 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-[10px] py-[8px] ${
              focused === "phone" || phone.length > 0
                ? "border-mint-01"
                : "border-neutral-08"
            }`}
          >
            <div className="pr-2.5">
              <PhoneIcon />
            </div>
            <input
              type="tel"
              value={formatPhone(phone)}
              onChange={handlePhoneChange}
              onFocus={() => setFocused("phone")}
              onBlur={() =>
                setFocused(prev => (prev === "phone" ? null : prev))
              }
              placeholder="전화번호"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-[10px] py-[8px] ${
              focused === "password" || password.length > 0
                ? "border-mint-01"
                : "border-neutral-08"
            }`}
          >
            <div className="pr-3">
              <LockIcon />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() =>
                setFocused(prev => (prev === "password" ? null : prev))
              }
              placeholder="비밀번호"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />

            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="flex items-center justify-center"
              >
                <EyeIcon />
              </button>
            )}
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="mt-[319px] flex flex-col items-center py-2.5">
          <button
            className="text-sub1-r text-neutral-01 cursor-pointer"
            onClick={() => router.push("/auth/password")}
          >
            비밀번호를 잊으셨나요?
          </button>
        </div>

        <div>
          <FullButton
            activeClass="bg-mint-01 text-white text-button-sb"
            inactiveClass="border border-neutral-08 bg-white text-neutral-06 text-button-sb"
            isActive={isActive}
            onClick={() => router.push("/")}
          >
            로그인
          </FullButton>
        </div>
      </div>
    </main>
  );
}
