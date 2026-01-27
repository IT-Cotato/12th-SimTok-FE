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
  const router = useRouter();
  const isActive = phone.length === 11 && password.length >= 8;
  const handlePhoneChange = phoneChangeHandler(setPhone);

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
          onClick={() => !isActive && router.push("/password/find")}
        >
          비밀번호를 잊으셨나요?
        </button>

        <div className="mb-[42px] px-4 py-[10px]">
          <FullButton isActive={isActive} onClick={() => router.push("/")}>
            로그인
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
