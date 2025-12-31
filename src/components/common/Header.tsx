"use client";

import { useRouter } from "next/navigation";

import BackIcon from "@/assets/back.svg";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="px-4 py-[10px]">
      <button
        type="button"
        onClick={() => router.back()}
        className="fixed h-6 w-6"
      >
        <BackIcon />
      </button>
      <span className="text-h3 flex items-center justify-center whitespace-nowrap text-black">
        {title}
      </span>
    </header>
  );
}
