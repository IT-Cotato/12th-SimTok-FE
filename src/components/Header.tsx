// src/components/Header.tsx
"use client";

import { useRouter } from "next/navigation";

import BackIcon from "@/assets/back.svg";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex gap-[156px]">
      <button type="button" onClick={() => router.back()} className="h-6 w-6">
        <BackIcon className="h-6 w-6" />
      </button>

      <span className="text-h3 whitespace-nowrap text-black">{title}</span>

      {/* 오른쪽 자리를 맞추기 위한 더미 박스 */}
      <div className="h-6 w-6" />
    </header>
  );
}
