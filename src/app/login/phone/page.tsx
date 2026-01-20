"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

// import EyeIcon from "@/assets/eye.svg";
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
  // const [password, setPassword] = useState("");
  // const [focused, setFocused] = useState<"phone" | "password" | null>(null);
  //const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isActive = phone.length > 0 && password.length > 0;
  const handlePhoneChange = phoneChangeHandler(setPhone);

  return (
    <main
      className={`flex min-h-dvh w-full justify-center ${
        isActive ? "bg-radial-yellowgreen-mintgreen" : "bg-white"
      }`}
    >
      <div className="mt-[13px] flex h-full w-full flex-col px-4">
        <BackHeader title="로그인" />
        <PageTitle>
          로그인하고
          <br />
          심톡을 시작해볼까요?
        </PageTitle>

        <div className="mt-[29px] flex w-full flex-col gap-[10px] pt-[11px]">
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

        <div className="mt-[319px] flex flex-col items-center py-2.5">
          <button
            className="text-sub1-r text-orange-00 cursor-pointer"
            onClick={() => router.push("/password/find")}
          >
            비밀번호를 잊으셨나요?
          </button>
        </div>

        <div>
          <FullButton isActive={isActive} onClick={() => router.push("/")}>
            로그인
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
