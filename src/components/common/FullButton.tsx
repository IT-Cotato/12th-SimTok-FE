"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type FullButtonProps = {
  isActive?: boolean;
  children: ReactNode;
  colorScheme?: "mint" | "orange" | "blue";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FullButton = ({
  isActive = true,
  children,
  colorScheme = "mint",
  className = "",
  ...props
}: FullButtonProps) => {
  const baseClass =
    "flex h-14.5 w-full cursor-pointer items-center justify-center rounded-2xl px-3.5";
  const activeClass =
    colorScheme === "mint"
      ? "bg-mint-01 text-white text-button-sb"
      : colorScheme === "orange"
        ? "bg-orange-00 text-white text-button-sb"
        : colorScheme === "blue"
          ? "bg-blue-00 text-white text-button-sb"
          : "";
  const inactiveClass =
    "border border-neutral-11 bg-neutral-10 text-neutral-07 text-button-sb";

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
