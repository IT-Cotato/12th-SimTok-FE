"use client";

import { useRouter } from "next/navigation";

import BackIcon from "@/assets/back.svg";
import ListIcon from "@/assets/list.svg";

interface HeaderProps {
  title: string;
  timeAgo?: string; // 하루한컷보기에서 사용
  menuIcon?: boolean; // 채팅페이지에서 사용
}

export const BackHeader = ({ title, timeAgo, menuIcon }: HeaderProps) => {
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
      {timeAgo && (
        <div className="relative right-0 flex h-full flex-col justify-end">
          <p className="text-sub2-sb text-neutral-04">{timeAgo}</p>
        </div>
      )}
      {menuIcon && (
        <div className="relative right-0">
          <ListIcon />
        </div>
      )}
    </header>
  );
};
