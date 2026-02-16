"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import Exclamation from "@/assets/exclamation-circle.svg";
import LockIcon from "@/assets/lock.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { InputField } from "@/components/common/InputField";
import { PageTitle } from "@/components/common/PageTitle";

import { usePasswordValidation } from "@/hooks/usePasswordValidation";

const FindPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isValidPassword, getState, getTextColor } = usePasswordValidation();

  const isPasswordValid = isValidPassword(password);
  const isPasswordConfirmValid =
    isValidPassword(passwordConfirm) && password === passwordConfirm;

  const handleResetPassword = async () => {
    if (!isPasswordConfirmValid || isLoading) return;

    setIsLoading(true);
    const resetKey = sessionStorage.getItem("pw_reset_key") || "";

    try {
      const res = await fetch("/api/password-reset/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Password-Reset-Draft-Key": resetKey,
        },
        body: JSON.stringify({
          password: password,
          confirmPassword: passwordConfirm,
        }),
      });

      const result = await res.json();

      if (result.success) {
        alert("비밀번호 재설정이 완료되었습니다.");
        sessionStorage.removeItem("pw_reset_key"); // 키 삭제
        router.push("/login/phone");
      } else {
        alert(result.message || "다시 시도해주세요.");
      }
    } catch (error) {
      console.error("최종 단계 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordState =
    getState(password, isPasswordValid) === "empty"
      ? "default"
      : (getState(password, isPasswordValid) as
          | "default"
          | "invalid"
          | "valid");

  const passwordConfirmState =
    getState(passwordConfirm, isPasswordConfirmValid) === "empty"
      ? "default"
      : (getState(passwordConfirm, isPasswordConfirmValid) as
          | "default"
          | "invalid"
          | "valid");

  return (
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <div className="flex w-full flex-col">
        <BackHeader title="새 비밀번호 설정" />
        <div className="mt-13.5 flex flex-1 flex-col">
          <PageTitle title={["새로운 비밀번호를 입력해주세요"]} />

          <div className="mt-[76px] flex flex-col gap-2.5 px-4">
            <div className="flex flex-col">
              <InputField
                isPassword={true}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="8자리 이상 입력"
                Icon={LockIcon}
                state={passwordState}
                suffix={
                  <div className="flex items-center justify-center">
                    <Exclamation
                      className={`h-6 w-6 transition-colors ${
                        passwordState === "invalid"
                          ? "text-orange-00"
                          : "text-neutral-07"
                      }`}
                    />
                  </div>
                }
              />
              <div
                className={`text-sub1-r underline ${getTextColor(passwordState)}`}
              >
                비밀번호를 입력해주세요.
              </div>
            </div>

            <div className="flex flex-col">
              <InputField
                isPassword={true}
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                placeholder="8자리 이상 입력"
                Icon={LockIcon}
                state={passwordConfirmState}
                suffix={
                  <div className="flex items-center justify-center px-1">
                    <Exclamation
                      className={`h-6 w-6 transition-colors ${
                        passwordConfirmState === "invalid"
                          ? "text-orange-00"
                          : "text-neutral-07"
                      }`}
                    />
                  </div>
                }
              />
              <div
                className={`text-sub1-r underline ${getTextColor(passwordConfirmState)}`}
              >
                비밀번호를 입력해주세요.
              </div>
            </div>
          </div>
        </div>

        <div className="mb-13 flex w-full justify-center px-4 py-[10px]">
          <FullButton
            isActive={isPasswordConfirmValid && !isLoading}
            onClick={handleResetPassword}
          >
            설정완료
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default FindPage;
