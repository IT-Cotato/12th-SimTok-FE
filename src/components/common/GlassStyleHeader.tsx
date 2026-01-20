"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import LeftArrow from "@/assets/left-arrow.svg";

interface GlassStyleHeaderProps {
  backHeader?: boolean;
  leftText: string;
  rightText: string;
  bgColor: string;
  selectTitle: "left" | "right";
  onChangeSelectTitle: (value: "left" | "right") => void;
}

export const GlassStyleHeader = ({
  backHeader = false,
  leftText,
  rightText,
  bgColor,
  selectTitle,
  onChangeSelectTitle,
}: GlassStyleHeaderProps) => {
  const router = useRouter();

  return (
    <header className="relative mt-[13px] flex items-center justify-center px-4 py-[10px]">
      {backHeader && (
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer"
        >
          <LeftArrow className="text-neutral-04 h-6 w-6" />
        </button>
      )}
      <div className={`bg-${bgColor} flex gap-[5px] rounded-3xl px-4 py-[6px]`}>
        <button
          className={`${selectTitle === "left" ? "bg-glass-style rounded-[53px] text-white" : "text-neutral-03"} text-sub-number px-[10px]`}
          onClick={() => onChangeSelectTitle("left")}
        >
          {leftText}
        </button>
        <button
          className={`${selectTitle === "right" ? "bg-glass-style rounded-[53px] text-white" : "text-neutral-03"} text-sub-number px-[10px]`}
          onClick={() => onChangeSelectTitle("right")}
        >
          {rightText}
        </button>
      </div>
    </header>
  );
};
