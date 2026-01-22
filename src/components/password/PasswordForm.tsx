"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import { FullButton } from "@/components/common/FullButton";
import { InputField } from "@/components/common/InputField";
import LoadingModal from "@/components/common/LoadingModal";

import { useCountdown } from "@/hooks/useCountdown";
import { usePhoneValidation } from "@/hooks/usePhoneValidation";

import { formatPhone } from "@/utils/formatPhone";
import { formatTime } from "@/utils/formatTime";
import { phoneChangeHandler } from "@/utils/phoneHandlers";

export const PasswordForm = () => {
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

  const handleFullButtonClick = () => {
    if (!isVerified) {
      handleVerify();
    } else {
      router.push("/password/find/result");
    }
  };

  const isConfirmActive =
    isNameFilled && code.length > 0 && isCodeRequested && timeLeft > 0;

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
    if (isCodeRequested || timeLeft > 0 || isVerified) {
      stop();
      setIsVerified(false);
      setCode("");
    }
  };

  return (
    <div className="mt-[29px] flex w-full flex-col gap-4">
      <div className="px-4">
        <InputField
          Icon={ProfileIcon}
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="flex w-full gap-2.5 px-4">
        <div
          className={`bg-neutral-11 flex h-[55px] flex-1 items-center gap-2.5 rounded-2xl border-transparent px-[10px] py-2 ${
            focused === "phone" || phone.length > 0
              ? "border-mint-01"
              : "border-neutral-08"
          }`}
        >
          <div
            className={`transition-colors ${
              focused === "phone" || phone.length > 0
                ? "text-mint-01"
                : "text-neutral-07"
            }`}
          >
            <PhoneIcon className="h-6 w-6" />
          </div>
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

        <button
          type="button"
          onClick={handleRequestCode}
          disabled={!isValidPhone || isCodeRequested}
          className={`text-h2 flex h-[55px] cursor-pointer items-center justify-center rounded-2xl border px-[10px] py-[8px] whitespace-nowrap ${
            !isValidPhone
              ? "text-neutral-07 bg-neutral-11 border-transparent"
              : isCodeRequested
                ? "border-neutral-07 bg-neutral-07 text-white"
                : "bg-mint-01 text-white"
          }`}
        >
          인증요청
        </button>
      </div>
      <div className="flex flex-col gap-2.5 px-4">
        <InputField
          placeholder="인증번호입력"
          value={code}
          onChange={e => setCode(e.target.value)}
          disabled={!isCodeRequested}
          suffix={
            isCodeRequested &&
            timeLeft > 0 && (
              <span className="text-sub1-sb text-orange-00">
                {formatTime(timeLeft)}
              </span>
            )
          }
        />
        {isCodeRequested && (
          <div className="flex w-full justify-start">
            <button
              type="button"
              onClick={handleResendClick}
              className="text-orange-00 text-sub1-r cursor-pointer underline"
            >
              인증번호가 오지 않나요?
            </button>
          </div>
        )}
      </div>

      <div className="mt-[270px] flex w-full justify-center px-4">
        <FullButton
          isActive={isConfirmActive || isVerified}
          onClick={handleFullButtonClick}
        >
          인증하기
        </FullButton>
      </div>

      {modalType && (
        <LoadingModal
          isOpen={!!modalType}
          title={modalType === "success" ? "인증완료" : "인증오류"}
          message={
            modalType === "success"
              ? "인증이 완료되었습니다."
              : "인증번호를 확인할 수 없습니다."
          }
          backdrop="default"
          onClose={handleModalConfirm}
        />
      )}
    </div>
  );
};
