"use client";

import Image from "next/image";

interface TopicKeywordProps {
  label: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const TopicKeyword = ({
  label,
  icon,
  isActive = false,
  onClick,
}: TopicKeywordProps) => {
  return (
    <button
      onClick={onClick}
      className={`border-green-01 group flex h-[50px] min-w-[128px] cursor-pointer items-center justify-center gap-1 rounded-3xl border px-4 py-[10px] transition-colors ${
        isActive
          ? "bg-green-01 text-white"
          : "text-green-01 hover:bg-green-01 bg-white hover:text-white"
      }`}
    >
      {icon && (
        <div className="relative h-6 w-6 shrink-0">
          <Image src={icon} alt={label} fill className="object-contain" />
        </div>
      )}
      <span
        className={`text-h2 whitespace-nowrap transition-colors ${
          isActive ? "text-white" : "text-inherit"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default TopicKeyword;
