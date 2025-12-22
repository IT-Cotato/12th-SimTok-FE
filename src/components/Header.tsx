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
        <BackIcon />
      </button>

      <span className="text-h3 whitespace-nowrap text-black">{title}</span>
    </header>
  );
}
