"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { signupApi } from "@/app/api/signup";

import Exclamation from "@/assets/exclamation-circle.svg";
import LockIcon from "@/assets/lock.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { InputField } from "@/components/common/InputField";
import { PageTitle } from "@/components/common/PageTitle";

import { usePasswordValidation } from "@/hooks/usePasswordValidation";

const SettingPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isValidPassword, getState, getTextColor } = usePasswordValidation();

  const isPasswordValid = isValidPassword(password);
  const isPasswordConfirmValid =
    isValidPassword(passwordConfirm) && password === passwordConfirm;

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

  const handlePasswordSubmit = async () => {
    if (!isPasswordConfirmValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await signupApi.submitPassword({
        password,
        confirmPassword: passwordConfirm,
      });
      const result = await res.json();

      console.log("회원가입 최종 결과:", result);

      if (result.success) {
        const tokens = result.data?.tokens;
        const access = tokens?.accessToken?.accessToken;
        const refresh = tokens?.refreshToken?.refreshToken;

        if (!access || !refresh) {
          alert("토큰 정보를 받아오지 못했습니다.");
          return;
        }

        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        router.push("/onboarding");
      } else {
        alert(result.message || "비밀번호 설정 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 제출 에러:", error);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <div className="flex w-full flex-col">
        <BackHeader title="비밀번호 설정" />
        <div className="mt-13.5 flex flex-1 flex-col">
          <PageTitle>
            로그인에 사용할 비밀번호를
            <br />
            설정해주세요
          </PageTitle>

          <div className="mt-[29px] flex flex-col gap-2.5 px-4">
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
            isActive={isPasswordConfirmValid && !isSubmitting}
            onClick={handlePasswordSubmit}
          >
            설정완료
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default SettingPage;
