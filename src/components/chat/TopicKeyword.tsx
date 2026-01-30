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
      className={`border-green-01 flex h-[50px] min-w-[128px] items-center justify-center gap-1 rounded-3xl border px-4 py-[10px] transition-colors ${
        isActive ? "bg-green-01" : "bg-white"
      }`}
    >
      {icon && (
        <div className="relative h-6 w-6 shrink-0">
          <Image src={icon} alt={label} fill className="object-contain" />
        </div>
      )}
      <span
        className={`text-h2 whitespace-nowrap transition-colors ${
          isActive ? "text-white" : "text-green-01"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default TopicKeyword;
