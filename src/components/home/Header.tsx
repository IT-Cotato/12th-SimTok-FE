"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import AlarmIcon from "@/assets/bell.svg";
import FriendIcon from "@/assets/friend.svg";

import Logo from "@/public/images/logo.svg";

interface HeaderProps {
  hasNewInvite: boolean;
  onAlarmClick: () => void;
}

export const Header = ({ hasNewInvite, onAlarmClick }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 py-[10px]">
      <Logo className="h-6 w-[143px]" />

      <div className="flex items-center justify-center gap-6">
        <button onClick={() => router.push("/friends")}>
          <FriendIcon className="text-neutral-03 cursor-pointer" />
        </button>

        <button
          className="relative flex cursor-pointer items-center justify-center"
          onClick={onAlarmClick}
        >
          <AlarmIcon className="text-neutral-03 h-6 w-6 cursor-pointer" />
          {/* 새 초대장이 있을 때만 빨간 점 노출 */}
          {hasNewInvite && (
            <span className="bg-red-01 absolute top-[1px] right-[1px] h-[9px] w-[9px] rounded-full" />
          )}
        </button>
      </div>
    </header>
  );
};
