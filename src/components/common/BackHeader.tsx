"use client";

import { useRouter } from "next/navigation";

import BackIcon from "@/assets/left-arrow.svg";
import ListIcon from "@/assets/list.svg";

interface HeaderProps {
  title: string;
  timeAgo?: string; // 하루한컷보기에서 사용
  menuIcon?: boolean; // 채팅페이지에서 사용
}

export const BackHeader = ({ title, timeAgo, menuIcon }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="relative mt-[13px] flex px-4 py-[10px]">
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer"
      >
        <BackIcon className="h-6 w-6" />
      </button>
      <h1 className="text-h1 flex w-full items-center justify-center whitespace-nowrap text-black">
        {title}
      </h1>
      {timeAgo && (
        <p className="text-sub2-sb text-neutral-04 absolute right-4 bottom-[10px]">
          {timeAgo}
        </p>
      )}
      {menuIcon && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <ListIcon />
        </div>
      )}
    </header>
  );
};
