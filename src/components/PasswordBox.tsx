"use client";

import { useState } from "react";

import EyeIcon from "@/assets/eye.svg";
import LockIcon from "@/assets/lock.svg";

import { maskPassword } from "@/utils/maskPassword";

type PasswordBoxProps = {
  password: string;
};

export default function PasswordBox({ password }: PasswordBoxProps) {
  const [showPassword, setShowPassword] = useState(false);

  const displayPassword = showPassword ? password : maskPassword(password);

  return (
    <div className="border-mint-01 bg-neutral-11 flex h-[55px] w-full items-center justify-between rounded-2xl border px-[10px] py-[8px]">
      <div className="flex items-center gap-[10px]">
        <LockIcon />
        <span className="text-h2 text-black">{displayPassword}</span>
      </div>

      <button type="button" onClick={() => setShowPassword(prev => !prev)}>
        <EyeIcon
          className={`cursor-pointer transition-colors ${
            showPassword ? "text-mint-01" : "text-neutral-05"
          }`}
        />
      </button>
    </div>
  );
}
