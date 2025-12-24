"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import DateIcon from "@/assets/date.svg";
import EyeIcon from "@/assets/eye.svg";
import LockIcon from "@/assets/lock.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import AlertModal from "@/components/AlertModal";
import FullButton from "@/components/FullButton";
import PageHeader from "@/components/Header";

import { formatPhone } from "@/utils/formatPhone";

export default function SettingPage() {
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"phone" | "password" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [passwordConfirm, setPasswordConfirm] = useState("");

  const isValidPassword = (pwd: string) => {
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    return pwd.length >= 8 && hasLetter && hasNumber && hasSpecial;
  };

  const isPasswordValid = isValidPassword(password);
  const isPasswordConfirmValid =
    isValidPassword(passwordConfirm) && password === passwordConfirm;

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        {/* 상단 헤더: 뒤로가기 */}
        <PageHeader title="회원가입" />

        {/* 상단 타이틀 */}
        <div className="mt-[63px] flex w-full items-center gap-2.5 py-2.5">
          <h1 className="text-neutral-02 text-d2">
            로그인에 사용할 비밀번호를
            <br />
            설정해주세요.
          </h1>
        </div>

        <div className="mt-[18px] flex w-full flex-col gap-2.5 pt-[11px]">
          {/* 비밀번호 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 ${
              password.length === 0
                ? "border-neutral-08"
                : isPasswordValid
                  ? "border-mint-01" // 조건 만족: 초록색
                  : "border-orange-00" // 조건 불만족: 주황색
            } `}
          >
            <div className="pr-2.5">
              <LockIcon />
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />
          </div>
          {/* 비밀번호 확인 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 ${
              passwordConfirm.length === 0
                ? "border-neutral-08"
                : isPasswordConfirmValid
                  ? "border-mint-01"
                  : "border-orange-00"
            } `}
          >
            <div className="pr-2.5">
              <LockIcon />
            </div>
            <input
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
