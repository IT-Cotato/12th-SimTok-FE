"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

import CheckIcon from "@/assets/check.svg";

type CheckboxProps = {
  label?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = ({
  label,
  className = "",
  checked = false,
  onChange,
  ...props
}: CheckboxProps) => {
  const isChecked = !!checked;

  return (
    <label className={`flex cursor-pointer items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isChecked}
        onChange={onChange}
        {...props}
      />

      <div
        className={`relative flex h-6 w-6 items-center justify-center rounded-[4px] border-2 transition-colors ${
          isChecked ? "bg-mint-01 border-mint-01" : "border-neutral-08 bg-white"
        }`}
      >
        {isChecked && <CheckIcon className="h-4 w-4 text-white" />}
      </div>

      {label && <span className="text-sub1-sb text-neutral-01">{label}</span>}
    </label>
  );
};
