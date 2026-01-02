"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import AlertModal from "@/components/common/AlertModal";
import FullButton from "@/components/common/FullButton";

import { useCountdown } from "@/hooks/useCountdown";
import { usePhoneValidation } from "@/hooks/usePhoneValidation";

import { formatPhone } from "@/utils/formatPhone";
import { formatTime } from "@/utils/formatTime";
import { phoneChangeHandler } from "@/utils/phoneHandlers";

export default function PasswordForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState<"name" | "phone" | "code" | null>(
    null,
  );

  const [isVerified, setIsVerified] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  const router = useRouter();

  const { isValidPhone } = usePhoneValidation(phone);
  const { timeLeft, isRunning, start, stop } = useCountdown();
  const isCodeRequested = isRunning;

  const isNameFilled = name.trim().length > 0;

  const canRequestCode = isValidPhone;
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

  const handleModalConfirm = () => {
    if (modalType === "success") {
      setModalType(null);
    } else {
      setModalType(null);
      stop();
      setCode("");
      setIsVerified(false);
    }
  };

  const handlePhoneChange = phoneChangeHandler(setPhone);
  const handlePhoneInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    handlePhoneChange(e);
    // 번호를 바꾸면 인증 상태/타이머 리셋
    if (isCodeRequested || timeLeft > 0 || isVerified) {
      stop();
      setIsVerified(false);
      setCode("");
    }
  };

  return (
    <div className="mt-[75px] flex w-full flex-col gap-[17px] px-4">
      {/* 이름 */}
      <div
        className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-[10px] py-[8px] ${
          focused === "name" || name.length > 0
            ? "border-mint-01"
            : "border-neutral-08"
        }`}
      >
        <div className="pr-2.5">
          <ProfileIcon />
        </div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(prev => (prev === "name" ? null : prev))}
          placeholder="이름"
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
            onChange={handlePhoneInput}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(prev => (prev === "phone" ? null : prev))}
            placeholder="전화번호"
            className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
          />
        </div>

        {/* 인증번호 받기 버튼 */}
        <button
          type="button"
          onClick={handleRequestCode}
          disabled={!isValidPhone || isCodeRequested}
          className={`text-h2 flex h-[55px] cursor-pointer items-center justify-center rounded-2xl border px-[10px] py-[8px] whitespace-nowrap ${
            !isValidPhone
              ? "border-neutral-08 text-neutral-06 border bg-white"
              : isCodeRequested
                ? "border-neutral-07 bg-neutral-07 text-white"
                : "bg-mint-01 text-white"
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
              onBlur={() => setFocused(prev => (prev === "code" ? null : prev))}
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

      <div className="mt-[270px] flex w-full justify-center">
        <FullButton
          isActive={isConfirmActive}
          onClick={() => router.push("/password/find/result")}
        >
          확인
        </FullButton>
      </div>

      {modalType && (
        <AlertModal
          isOpen={!!modalType}
          title={modalType === "success" ? "인증완료" : "인증오류"}
          message={
            modalType === "success"
              ? "인증이 완료되었습니다."
              : "인증번호를 확인할 수 없습니다."
          }
          onClose={handleModalConfirm}
        />
      )}
    </div>
  );
}
