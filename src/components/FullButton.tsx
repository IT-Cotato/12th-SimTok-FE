"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type FullButtonProps = {
  activeClass: string; // isActive=true일 때 클래스
  inactiveClass: string; // isActive=false일 때 클래스
  isActive?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function FullButton({
  activeClass,
  inactiveClass,
  isActive = true,
  children,
  className = "",
  ...props
}: FullButtonProps) {
  const stateClass = isActive ? activeClass : inactiveClass;

  return (
    <button
      className={`flex h-[58px] w-full cursor-pointer items-center justify-center rounded-2xl px-[14px] ${stateClass} ${className}`}
      disabled={!isActive}
      {...props}
    >
      <div className="flex items-center px-[82px]">
        <span className="text-h2 flex h-[30px] items-center">{children}</span>
      </div>
    </button>
  );
}
