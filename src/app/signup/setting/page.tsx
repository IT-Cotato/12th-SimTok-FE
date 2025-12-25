"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import ExGrayIcon from "@/assets/exclamation-gray.svg";
import ExOrangeIcon from "@/assets/exclamation-orange.svg";
import EyeIcon from "@/assets/eye.svg";
import LockIcon from "@/assets/lock.svg";

import FullButton from "@/components/FullButton";
import PageHeader from "@/components/Header";

export default function SettingPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"phone" | "password" | null>(null);
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

  const getState = (value: string, isValid: boolean) => {
    if (value.length === 0) return "empty";
    if (isValid) return "valid";
    return "invalid";
  };

  const passwordState = getState(password, isPasswordValid);
  const passwordConfirmState = getState(
    passwordConfirm,
    isPasswordConfirmValid,
  );

  const getBorderColor = (state: string) =>
    state === "valid"
      ? "border-mint-01"
      : state === "invalid"
        ? "border-orange-00"
        : "border-neutral-08";

  const getTextColor = (state: string) =>
    state === "invalid" ? "text-orange-00" : "text-neutral-07";

  const getIcon = (state: string) =>
    state === "invalid" ? <ExOrangeIcon /> : <ExGrayIcon />;

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
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 ${getBorderColor(
              passwordState,
            )}`}
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
            <div className="flex justify-end">{getIcon(passwordState)}</div>
          </div>

          {/*비밀번호를 입력해주세요. */}
          <div
            className={`flex justify-end text-[10px] underline ${getTextColor(
              passwordState,
            )}`}
          >
            비밀번호를 입력해주세요.
          </div>

          {/* 비밀번호 확인 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 ${getBorderColor(
              passwordConfirmState,
            )}`}
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
            <div className="flex justify-end">
              {getIcon(passwordConfirmState)}
            </div>
          </div>

          {/*한번 더 입력해주세요. */}
          <div
            className={`flex justify-end text-[10px] underline ${getTextColor(
              passwordConfirmState,
            )}`}
          >
            한번 더 입력해주세요.
          </div>

          <div className="mt-[320px] flex w-full justify-center">
            <FullButton
              activeClass="bg-mint-01 text-white text-button-sb"
              inactiveClass="border border-neutral-08 bg-white text-neutral-06 text-button-sb"
              isActive={isPasswordConfirmValid}
              onClick={() => router.push("/signup/setting")}
            >
              완료
            </FullButton>
          </div>
        </div>
      </div>
    </main>
  );
}
