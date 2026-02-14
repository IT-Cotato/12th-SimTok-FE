"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import LockIcon from "@/assets/lock.svg";
import PhoneIcon from "@/assets/phone.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { InputField } from "@/components/common/InputField";
import { PageTitle } from "@/components/common/PageTitle";

import { formatPhone } from "@/utils/formatPhone";
import { phoneChangeHandler } from "@/utils/phoneHandlers";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isActive = phone.length === 11 && password.length >= 8;
  const handlePhoneChange = phoneChangeHandler(setPhone);

  const handleLogin = async () => {
    if (!isActive || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phone,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        const AT = result.data.accessToken?.accessToken;
        const RT = result.data.refreshToken?.refreshToken;

        if (AT && RT) {
          localStorage.setItem("accessToken", AT);
          localStorage.setItem("refreshToken", RT);
          console.log("토큰 저장 완료");
          window.location.href = "/";
        } else {
          console.error("토큰 데이터 누락:", result.data);
        }
      } else {
        console.error("로그인 실패:", result.message);
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("/api/password-reset/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      const key = response.headers.get("Password-Reset-Draft-Key");

      if (result.success) {
        if (key) {
          sessionStorage.setItem("pw_reset_key", key);
          router.push("/password/find");
        } else {
          console.warn("Draft Key가 헤더에 포함되지 않았습니다.");
          alert("일시적인 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        alert(result.message || "프로세스 시작 실패");
      }
    } catch (error) {
      console.error("Draft 생성 에러:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main
      className={`flex min-h-dvh w-full flex-col justify-center ${
        isActive ? "bg-radial-yellowgreen-mintgreen" : "bg-white"
      }`}
    >
      <div className="flex h-full w-full flex-1 flex-col">
        <BackHeader title="로그인" />
        <div className="flex flex-col gap-[29px]">
          <PageTitle>
            로그인하고 <br /> 심톡을 시작해볼까요?
          </PageTitle>

          <div className="flex w-full flex-col gap-4 px-4 py-[10px]">
            <InputField
              type="tel"
              Icon={PhoneIcon}
              value={formatPhone(phone)}
              onChange={handlePhoneChange}
              placeholder="전화번호"
            />
            <InputField
              type="password"
              Icon={LockIcon}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              isPassword
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          disabled={isActive}
          className={`text-sub1-r -mb-[10px] items-center justify-center transition-colors ${
            isActive
              ? "text-neutral-08 cursor-default"
              : "text-orange-00 cursor-pointer"
          }`}
          onClick={handleForgotPassword}
        >
          비밀번호를 잊으셨나요?
        </button>

        <div className="mb-[42px] px-4 py-[10px]">
          <FullButton isActive={isActive && !isLoading} onClick={handleLogin}>
            {isLoading ? "로그인 중..." : "로그인"}
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
