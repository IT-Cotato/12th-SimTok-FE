"use client";
import { useState } from "react";

import AlarmIcon from "@/assets/bell.svg";
import FriendIcon from "@/assets/friend.svg";

export const Header = () => {
  const [isAlarmNew, setIsAlarmNew] = useState(true);
  return (
    <header className="flex items-center justify-between px-4 py-[10px]">
      <div className="text-h1 text-mint-01">SIMTALK</div>

      <div className="flex gap-6">
        <div>
          <FriendIcon className="text-neutral-03" />
        </div>
        <div>
          {isAlarmNew ? (
            <button
              className="relative cursor-pointer"
              onClick={() => setIsAlarmNew(false)}
            >
              <AlarmIcon className="text-neutral-03 h-6 w-6 cursor-pointer" />
              <span className="bg-red-00 absolute top-[2px] left-[14px] h-[10px] w-[10px] rounded-full" />
            </button>
          ) : (
            <AlarmIcon className="text-neutral-03 h-6 w-6 cursor-pointer" />
          )}
        </div>
      </div>
    </header>
  );
};
