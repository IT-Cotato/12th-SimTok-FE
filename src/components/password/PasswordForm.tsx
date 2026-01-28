"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import ErrorIcon from "@/assets/modal_error.svg";
import SuccessIcon from "@/assets/modal_success.svg";
import ProfileIcon from "@/assets/profile.svg";

import { FullButton } from "@/components/common/FullButton";
import { InputField } from "@/components/common/InputField";
import LoadingModal from "@/components/common/LoadingModal";

import { useCountdown } from "@/hooks/useCountdown";
import { usePhoneValidation } from "@/hooks/usePhoneValidation";

import { phoneChangeHandler } from "@/utils/phoneHandlers";

import { PhoneAuthSection } from "../auth/PhoneAuthSection";

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
    handleRequestCode();
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
    }
  };

  const getPlaceholder = () => {
    if (isCodeRequested && timeLeft === 0) return "인증시간초과";
    return "인증번호입력";
  };

  const isConfirmActive =
    !isVerified &&
    isNameFilled &&
    code.length > 0 &&
    isCodeRequested &&
    timeLeft > 0;

  const handleModalConfirm = () => {
    if (modalType === "success") {
      setModalType(null);
      router.push("/password/find/result");
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
    <div className="mt-[29px] flex flex-1 flex-col gap-4">
      <div className="px-4">
        <InputField
          Icon={ProfileIcon}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름"
        />
      </div>

      <PhoneAuthSection
        phone={phone}
        onPhoneInput={handlePhoneInput}
        focused={focused === "phone"}
        onFocus={() => setFocused("phone")}
        onBlur={() => setFocused(null)}
        onRequest={handleRequestCode}
        canRequest={canRequestCode}
        isRequested={isCodeRequested}
        code={code}
        onCodeChange={e => setCode(e.target.value)}
        timeLeft={timeLeft}
        placeholder={getPlaceholder()}
        onResend={handleResendClick}
      />

      <div className="mt-auto mb-13 flex w-full justify-center px-4 py-[10px]">
        <FullButton isActive={isConfirmActive} onClick={handleFullButtonClick}>
          인증하기
        </FullButton>
      </div>

      {modalType && (
        <LoadingModal
          isOpen={!!modalType}
          title={modalType === "success" ? "인증성공" : "인증오류"}
          message={
            modalType === "success"
              ? "인증이 완료되었어요"
              : "인증번호가 올바르지 않아요"
          }
          icon={modalType === "success" ? <SuccessIcon /> : <ErrorIcon />}
          onClose={handleModalConfirm}
        />
      )}
    </div>
  );
};
