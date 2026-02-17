"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import AlarmIcon from "@/assets/bell.svg";
import FriendIcon from "@/assets/friend.svg";

import Logo from "@/public/images/logo.svg";

export const Header = () => {
  const [isAlarmNew, setIsAlarmNew] = useState(true);
  const router = useRouter();
  return (
    <header className="flex items-center justify-between px-4 py-[10px]">
      <Logo className="h-6 w-[143px]" />

      <div className="flex items-center justify-center gap-6">
        <button onClick={() => router.push("/friends")}>
          <FriendIcon className="text-neutral-03 cursor-pointer" />
        </button>
        <div>
          {isAlarmNew ? (
            <button
              className="relative flex cursor-pointer items-center justify-center"
              onClick={() => setIsAlarmNew(false)}
            >
              <AlarmIcon className="text-neutral-03 h-6 w-6 cursor-pointer" />
              <span className="bg-red-01 absolute top-[1px] right-[1px] h-[9px] w-[9px] rounded-full" />
            </button>
          ) : (
            <AlarmIcon className="text-neutral-03 h-6 w-6 cursor-pointer" />
          )}
        </div>
      </div>
    </header>
  );
};
