"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import DateIcon from "@/assets/date.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import FullButton from "@/components/FullButton";
import PageHeader from "@/components/Header";
import PageTitle from "@/components/PageTitle";

import { useCountdown } from "@/hooks/useCountdown";
import { usePhoneValidation } from "@/hooks/usePhoneValidation";

import { formatBirthInput } from "@/utils/formatBirth";
import { formatPhone } from "@/utils/formatPhone";
import { formatTime } from "@/utils/formatTime";
import { phoneChangeHandler } from "@/utils/phoneHandlers";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [focused, setFocused] = useState<
    "name" | "birth" | "phone" | "code" | null
  >(null);
  const [code, setCode] = useState("");

  const [isVerified, setIsVerified] = useState(false); // 인증하기 완료 여부
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  const { timeLeft, isRunning, start, stop } = useCountdown();
  const isCodeRequested = isRunning;

  const { isValidPhone } = usePhoneValidation(phone);
  const isNameFilled = name.trim().length > 0;

  const router = useRouter();

  //인증번호 받기 버튼 활성 조건
  const canRequestCode = isNameFilled && isValidPhone;

  //확인 버튼 활성화: 인증 완료됐을 때만
  const isConfirmActive = isNameFilled && isVerified;

  const handleRequestCode = () => {
    if (!canRequestCode) return;
    setIsVerified(false);
    setCode("");
    start(120);
  };

  const handleResendClick = () => {
    stop();
    setIsVerified(false);
    setCode("");
  };

  const handleVerify = () => {
    if (!code || !isCodeRequested || timeLeft === 0) return;
    const isSuccess = code === "1234";

    if (isSuccess) {
      setIsVerified(true);
      setModalType("success");
      stop();
    } else {
      setIsVerified(false);
      setModalType("error");
    }
  };

  const handlePhoneChange = phoneChangeHandler(setPhone);

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirth(formatBirthInput(e.target.value));
  };

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <PageHeader title="회원가입" />

        <PageTitle>
          회원가입을 위해 아래 정보를
          <br />
          입력해주세요.
        </PageTitle>

        {/* 입력 필드 영역 */}
        <div className="mt-[18px] flex w-full flex-col gap-2.5 px-4">
          {/* 이름 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 ${
              focused === "name" || name.length > 0
                ? "border-mint-01"
                : "border-neutral-08"
            }`}
          >
            <div className="pr-2.5">
              <ProfileIcon />
            </div>
            <input
              type="name"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(prev => (prev === "name" ? null : prev))}
              placeholder="이름"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />
          </div>

          {/* 생년월일 */}
          <div
            className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 ${
              focused === "birth" || birth.length > 0
                ? "border-mint-01"
                : "border-neutral-08"
            }`}
          >
            <div className="pr-2.5">
              <DateIcon />
            </div>
            <input
              type="text"
              value={birth}
              onChange={handleBirthChange}
              onFocus={() => setFocused("birth")}
              onBlur={() =>
                setFocused(prev => (prev === "birth" ? null : prev))
              }
              placeholder="생년월일 8자리"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />
          </div>

          {/* 전화번호 + 인증번호 받기 */}
          <div className="flex w-full gap-[13px]">
            {/* 전화번호 입력 */}
            <div
              className={`bg-neutral-11 flex h-[55px] flex-1 items-center gap-[12px] rounded-2xl border px-[10px] py-[8px] ${
                focused === "phone" || phone.length > 0
                  ? "border-mint-01"
                  : "border-neutral-08"
              }`}
            >
              <PhoneIcon />
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

            {/* 인증번호 받기 버튼 */}
            <button
              type="button"
              onClick={handleRequestCode}
              disabled={!canRequestCode || isCodeRequested}
              className={`text-h2 flex h-[55px] cursor-pointer items-center justify-center rounded-2xl border px-[10px] py-[8px] whitespace-nowrap ${
                !canRequestCode
                  ? "border-neutral-08 text-neutral-06 cursor-default border bg-white"
                  : isCodeRequested && timeLeft > 0
                    ? "border-neutral-07 bg-neutral-07 cursor-default text-white"
                    : "bg-mint-01 cursor-pointer text-white"
              }`}
            >
              인증번호받기
            </button>
          </div>

          {/* 인증번호 + 인증하기 */}
          <div className="flex w-full gap-[13px]">
            {/* 인증번호 입력 */}
            <div className="flex flex-1 items-center gap-[10px]">
              <div
                className={`bg-neutral-11 flex h-[55px] flex-1 items-center gap-[13px] rounded-2xl border px-[10px] py-[8px] ${
                  focused === "code" || code.length > 0
                    ? "border-mint-01"
                    : "border-neutral-08"
                }`}
              >
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onFocus={() => setFocused("code")}
                  onBlur={() =>
                    setFocused(prev => (prev === "code" ? null : prev))
                  }
                  placeholder="인증번호"
                  className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
                />
                {isCodeRequested && timeLeft > 0 && (
                  <span className="text-sub1-sb text-orange-00">
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
            </div>

            {/* 인증하기 버튼 */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={!code || !isCodeRequested || timeLeft === 0}
              className={`text-h2 flex h-[55px] w-[125px] cursor-pointer items-center justify-center rounded-2xl border px-[10px] py-[8px] ${
                !code || !isCodeRequested || timeLeft === 0
                  ? "border-neutral-08 text-neutral-06 bg-white"
                  : "border-mint-01 bg-mint-01 text-white"
              }`}
            >
              인증하기
            </button>
          </div>

          {/* 인증번호가 오지 않나요? */}
          {isCodeRequested && (
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={handleResendClick}
                className="text-orange-00 cursor-pointer text-[10px] leading-[150%] underline"
              >
                인증번호가 오지 않나요?
              </button>
            </div>
          )}

          <div className="mt-[188px] flex w-full justify-center">
            <FullButton
              isActive={isConfirmActive}
              onClick={() => router.push("/signup/password")}
            >
              확인
            </FullButton>
          </div>
        </div>
      </div>
    </main>
  );
}
