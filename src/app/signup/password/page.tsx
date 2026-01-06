"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import Exclamation from "@/assets/exclamation.svg";
import EyeIcon from "@/assets/eye.svg";
import LockIcon from "@/assets/lock.svg";

import { BackHeader } from "@/components/common/BackHeader";
import FullButton from "@/components/common/FullButton";
import PageTitle from "@/components/common/PageTitle";

import { usePasswordValidation } from "@/hooks/usePasswordValidation";

const getIconClass = (state: string) =>
  state === "invalid" ? "text-orange-00" : "text-neutral-07";

const SettingPage = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <BackHeader title="회원가입" />

        <PageTitle>
          로그인에 사용할 비밀번호를
          <br />
          설정해주세요.
        </PageTitle>

        <div className="mt-[29px] flex w-full flex-col gap-2.5 px-4">
          {/* 비밀번호 */}
          <div
            className={`bg-neutral-11 relative flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 ${getBorderColor(passwordState)} `}
          >
            <div className="pr-2.5">
              <LockIcon />
            </div>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
            >
              <EyeIcon
                className={`transition-colors ${
                  showPassword ? "text-mint-01" : "text-neutral-05"
                }`}
              />
            </button>
            <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2">
              <Exclamation className={getIconClass(passwordState)} />
            </div>
          </div>

          {/* 비밀번호를 입력해주세요. */}
          <div
            className={`flex justify-end text-[10px] underline ${getTextColor(
              passwordState,
            )}`}
          >
            비밀번호를 입력해주세요.
          </div>

          {/* 비밀번호 확인 */}
          <div
            className={`bg-neutral-11 relative flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 ${getBorderColor(passwordConfirmState)} `}
          >
            <div className="pr-2.5">
              <LockIcon />
            </div>

            <input
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 한번 더 입력해주세요"
              className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPasswordConfirm(prev => !prev)}
            >
              <EyeIcon
                className={`transition-colors ${
                  showPasswordConfirm ? "text-mint-01" : "text-neutral-05"
                }`}
              />
            </button>
            <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2">
              <Exclamation className={getIconClass(passwordConfirmState)} />
            </div>
          </div>

          {/*한번 더 입력해주세요. */}
          <div
            className={`flex justify-end text-[10px] underline ${getTextColor(
              passwordConfirmState,
            )}`}
          >
            한번 더 입력해주세요.
          </div>

          <div className="mt-[320px] flex w-full justify-center">
            <FullButton
              isActive={isPasswordConfirmValid}
              onClick={() => router.push("/login")}
            >
              완료
            </FullButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingPage;
