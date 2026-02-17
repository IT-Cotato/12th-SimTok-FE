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
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  const router = useRouter();
  const { isValidPhone } = usePhoneValidation(phone);
  const { timeLeft, isRunning, start, stop } = useCountdown();
  const isCodeRequested = isRunning;

  const isNameFilled = name.trim().length > 0;

  const canRequestCode = isValidPhone;

  const handleRequestCode = async () => {
    const key = sessionStorage.getItem("pw_reset_key");
    if (!canRequestCode || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/password-reset/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Password-Reset-Draft-Key": key || "",
        },
        body: JSON.stringify({
          phoneNumber: phone.replace(/-/g, ""),
          name: name,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsVerified(false);
        setCode("");
        start(180);
      } else {
        alert(result.message || "서버 내부 오류입니다.");
      }
    } catch (error) {
      console.error("Catch 에러:", error);
      alert("네트워크 연결에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendClick = () => {
    stop();
    setIsVerified(false);
    setCode("");
    handleRequestCode();
  };

  const handleVerify = async () => {
    if (!code || !isCodeRequested || timeLeft === 0 || isLoading) return;

    setIsLoading(true);
    const resetKey = sessionStorage.getItem("pw_reset_key") || "";

    try {
      const res = await fetch("/api/password-reset/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Password-Reset-Draft-Key": resetKey,
        },
        body: JSON.stringify({ otpCode: code }),
      });

      const result = await res.json();

      if (result.success && result.data?.step !== "OTP_REQUIRED") {
        setIsVerified(true);
        setModalType("success");
        stop();
      } else {
        setIsVerified(false);
        setModalType("error");
        if (result.data?.step === "OTP_REQUIRED") {
          console.warn(
            "서버 응답은 성공이나 인증 단계가 갱신되지 않음(번호 불일치 추정)",
          );
        }
      }
    } catch (error) {
      console.error("검증 중 에러 발생:", error);
      setModalType("error");
    } finally {
      setIsLoading(false);
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
          icon={
            modalType === "success" ? (
              <SuccessIcon className="h-[60px] w-[62px]" />
            ) : (
              <ErrorIcon />
            )
          }
          onClose={handleModalConfirm}
        />
      )}
    </div>
  );
};
