"use client";

import { useState } from "react";

import EyeIcon from "@/assets/eye.svg";

interface InputFieldProps {
  type?: "text" | "password" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  Icon?: React.ElementType;
  isPassword?: boolean;
  disabled?: boolean;
  suffix?: React.ReactNode;
}

export const InputField = ({
  type = "text",
  value,
  onChange,
  placeholder,
  Icon,
  isPassword = false,
  disabled = false,
  suffix,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = isFocused || value.length > 0;
  const inputType = isPassword && showPassword ? "text" : type;

  const displayValue = value;

  return (
    <div
      className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 transition-colors ${
        isFocused || value.length > 0 ? "border-mint-01" : "border-transparent"
      }`}
    >
      {Icon && (
        <div
          className={`pr-2.5 transition-colors ${
            isActive ? "text-mint-01" : "text-neutral-07"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
      )}

      <input
        type={inputType}
        value={displayValue}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none disabled:cursor-not-allowed"
      />

      {suffix && (
        <div className="flex items-center justify-center">{suffix}</div>
      )}

      {/* {isPassword && value.length > 0 && (
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="flex items-center justify-center pl-2"
        >
          <EyeIcon
            className={`cursor-pointer transition-colors ${
              showPassword ? "text-mint-01" : "text-neutral-05"
            }`}
          />
        </button>
      )} */}
    </div>
  );
};
