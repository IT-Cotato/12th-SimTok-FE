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

  const { isValidPassword, getState, getBorderColor, getTextColor } =
    usePasswordValidation();

  const isPasswordValid = isValidPassword(password);
  const isPasswordConfirmValid =
    isValidPassword(passwordConfirm) && password === passwordConfirm;

  const passwordState = getState(password, isPasswordValid);
  const passwordConfirmState = getState(
    passwordConfirm,
    isPasswordConfirmValid,
  );

  return (
    <main className="flex h-screen w-full justify-center bg-white">
      <div className="flex w-full flex-col whitespace-nowrap">
        <BackHeader title="새 비밀번호 설정" />
        <PageTitle>새로운 비밀번호를 입력해주세요</PageTitle>
        <div className="mt-[76px] flex w-full flex-col gap-2.5 px-4">
          <div className="flex flex-col">
            <InputField
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="8자리 이상 입력"
              Icon={LockIcon}
              suffix={
                <div className="flex items-center justify-center px-1">
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
              className={`text-sub1-runderline ${getTextColor(passwordState)}`}
            >
              비밀번호를 입력해주세요.
            </div>
          </div>

          <div className="flex flex-col">
            <InputField
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              placeholder="8자리 이상 입력"
              Icon={LockIcon}
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
              className={`text-sub1-runderline ${getTextColor(passwordConfirmState)}`}
            >
              비밀번호를 입력해주세요.
            </div>
          </div>

          <div className="mt-[320px] flex w-full justify-center">
            <FullButton
              isActive={isPasswordConfirmValid}
              onClick={() => router.push("/onboarding")}
            >
              완료
            </FullButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FindPage;
