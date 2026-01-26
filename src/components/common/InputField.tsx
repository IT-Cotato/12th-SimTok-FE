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
  state?: "default" | "invalid" | "valid" | "empty";
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
  state = "default",
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isError = state === "invalid";
  const isValid = state === "valid";

  const getThemeColor = () => {
    if (isError) return "border-orange-00 text-orange-00";
    if (isValid || value.length > 0) return "border-mint-01 text-mint-01";
    return "border-transparent text-neutral-07";
  };

  const themeClass = getThemeColor();
  const inputType = isPassword && !showPassword ? "password" : "text";

  const getBorderColor = () => {
    if (state === "invalid") return "border-orange-00";
    if (state === "valid" || value.length > 0 || isFocused)
      return "border-mint-01";
    return "border-transparent";
  };

  const getIconColor = () => {
    if (state === "invalid") return "text-orange-00";
    if (state === "valid" || value.length > 0 || isFocused)
      return "text-mint-01";
    return "text-neutral-07";
  };
  //const inputType = isPassword && !showPassword ? "password" : "text";

  return (
    <div
      className={`bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl border px-2.5 py-2 transition-colors ${getBorderColor()}`}
    >
      {Icon && (
        <div className={`pr-2.5 transition-colors ${getIconColor()}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}

      <input
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className="placeholder:text-neutral-07 text-h2 w-full bg-transparent text-black outline-none"
      />

      <div className="flex items-center justify-center">
        {isValid && isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`transition-colors ${
              showPassword ? "text-mint-01" : "text-neutral-07"
            }`}
          >
            <EyeIcon className="h-6 w-6" />
          </button>
        ) : (
          <div className={`${isError ? "text-orange-00" : "text-neutral-07"}`}>
            {suffix}
          </div>
        )}
      </div>

      {/* {suffix && (
        <div className="flex items-center justify-center">{suffix}</div>
      )} */}

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
