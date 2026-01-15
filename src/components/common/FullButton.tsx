"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type FullButtonProps = {
  isActive?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FullButton = ({
  isActive = true,
  children,
  className = "",
  ...props
}: FullButtonProps) => {
  const baseClass =
    "flex h-14.5 w-full cursor-pointer items-center justify-center rounded-2xl px-3.5";
  const activeClass = "bg-mint-01 text-white text-button-sb";
  const inactiveClass =
    "border border-neutral-08 bg-neutral-11 text-neutral-06 text-button-sb";

  const stateClass = isActive ? activeClass : inactiveClass;

  return (
    <button
      className={`${baseClass} ${stateClass} ${className}`}
      disabled={!isActive}
      {...props}
    >
      <div className="flex h-[58px] items-center justify-center">
        <span className="text-button-sb">{children}</span>
      </div>
    </button>
  );
};
