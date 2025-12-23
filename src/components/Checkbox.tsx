"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

type CheckboxProps = {
  label?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export default function Checkbox({
  label,
  className = "",
  checked,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <label className={`flex cursor-pointer items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
        {...props}
      />

      {/* 커스텀 박스 */}
      <span className="border-box peer-checked:bg-mint-01 peer-checked:border-mint-01 flex h-6 w-6 items-center justify-center rounded-sm border-2 bg-white transition-colors">
        {/* 체크 아이콘 */}
        <svg
          className="h-4 w-4 text-white"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8.5L6.5 12L13 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {label && <span className="text-h3 text-neutral-01">{label}</span>}
    </label>
  );
}
