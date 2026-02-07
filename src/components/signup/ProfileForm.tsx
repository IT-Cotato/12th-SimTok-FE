"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { signupApi } from "@/app/api/signup";

import DateIcon from "@/assets/date.svg";
import ErrorIcon from "@/assets/modal_error.svg";
import SuccessIcon from "@/assets/modal_success.svg";
import ProfileIcon from "@/assets/profile.svg";

import { FullButton } from "@/components/common/FullButton";
import { InputField } from "@/components/common/InputField";
import LoadingModal from "@/components/common/LoadingModal";

import { useCountdown } from "@/hooks/useCountdown";
import { usePhoneValidation } from "@/hooks/usePhoneValidation";

import { formatBirthInput, isValidBirth } from "@/utils/formatBirth";
import { phoneChangeHandler } from "@/utils/phoneHandlers";

import { PhoneAuthSection } from "../auth/PhoneAuthSection";

export const ProfileForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [code, setCode] = useState("");

  const [focused, setFocused] = useState<
    "name" | "birth" | "phone" | "code" | null
  >(null);

  const [isVerified, setIsVerified] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);

  const router = useRouter();

  const { timeLeft, isRunning, start, stop } = useCountdown();
  const { isValidPhone } = usePhoneValidation(phone);

  const isCodeRequested = isRunning;
  const isNameFilled = name.trim().length > 0;
  const canRequestCode = isValidPhone;
  const isBirthValid = isValidBirth(birth);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestCode = async () => {
    if (!canRequestCode || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await signupApi.sendSms(phone.replace(/-/g, ""));
      const result = await res.json();

      if (result.success) {
        setIsVerified(false);
        setCode("");
        start(180);
        console.log("SMS 발송 성공:", result.data.flags);
      } else {
        alert(result.message || "번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("SMS 요청 에러:", error);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendClick = () => {
    stop();
    setIsVerified(false);
    setCode("");
    handleRequestCode();
  };

  // [STEP 4] 인증번호 확인 (OTP 검증)
  const handleVerify = async () => {
    if (!code || !isCodeRequested || timeLeft === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await signupApi.verifyOtp(code);
      const result = await res.json();

      console.log("OTP 검증 결과:", result);

      if (result.success && result.data?.step !== "OTP_REQUIRED") {
        setIsVerified(true);
        setModalType("success");
        stop();
      } else {
        // 인증번호가 틀린 경우 여기로 들어와야 함
        setIsVerified(false);
        setModalType("error");
      }
    } catch (error) {
      console.error("OTP 검증 에러:", error);
      setModalType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // [STEP 5] 프로필 정보 제출 및 다음 단계 이동
  const handleModalConfirm = async () => {
    if (modalType === "error") {
      setModalType(null);
      return;
    }

    if (modalType === "success") {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const cleanBirth = birth.replace(/\D/g, "");

        if (cleanBirth.length !== 8) {
          alert("생년월일 8자리를 정확히 입력해주세요.");
          return;
        }

        const formattedBirth = `${cleanBirth.slice(0, 4)}-${cleanBirth.slice(4, 6)}-${cleanBirth.slice(6, 8)}`;

        console.log("제출 데이터:", { name, birthDate: formattedBirth });

        const res = await signupApi.submitProfile({
          name,
          birthDate: formattedBirth,
        });
        const result = await res.json();

        if (result.success) {
          setModalType(null);
          router.push("/signup/password");
        } else {
          alert(result.message || "프로필 정보 등록에 실패했습니다.");
          setModalType(null);
        }
      } catch (error) {
        console.error("프로필 제출 에러:", error);
        alert("네트워크 오류가 발생했습니다.");
        setModalType(null);
      } finally {
        setIsSubmitting(false);
      }
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

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setBirth("");
      return;
    }
    setBirth(formatBirthInput(value));
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
    isBirthValid &&
    code.length > 0 &&
    isCodeRequested &&
    timeLeft > 0;

  return (
    <div className="mt-[18px] flex flex-1 flex-col gap-4">
      <div className="px-4">
        <InputField
          Icon={ProfileIcon}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름"
        />
      </div>
      <div className="px-4">
        <InputField
          Icon={DateIcon}
          value={birth}
          onChange={handleBirthChange}
          placeholder="생년월일 8자리"
        />
      </div>

      <PhoneAuthSection
        phone={phone}
        onPhoneInput={handlePhoneInput}
        focused={focused === "phone"}
        onFocus={() => setFocused("phone")}
        onBlur={() => setFocused(null)}
        onRequest={handleRequestCode}
        canRequest={isValidPhone}
        isRequested={isCodeRequested}
        code={code}
        onCodeChange={e => setCode(e.target.value)}
        timeLeft={timeLeft}
        placeholder={getPlaceholder()}
        onResend={handleResendClick}
      />

      <div className="mt-auto mb-13 flex w-full justify-center px-4 py-[10px]">
        <FullButton
          isActive={isConfirmActive && !isSubmitting}
          onClick={handleFullButtonClick}
        >
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
