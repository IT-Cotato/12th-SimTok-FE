"use client";

import { useState } from "react";

import AlarmIcon from "@/assets/bell.svg";
import PencilIcon from "@/assets/pencil.svg";

export const Header = () => {
  const [isAlaramNew, setIsAlarmNew] = useState(true);

  return (
    <header className="relative mt-[13px] flex items-center justify-center px-4 py-[10px]">
      <h1>하루기록</h1>
      <div className="absolute right-4 flex gap-2">
        {isAlaramNew ? (
          <button
            className="relative cursor-pointer"
            onClick={() => setIsAlarmNew(false)}
          >
            <AlarmIcon className="h-6 w-6 cursor-pointer" />
            <span className="bg-orange-00 absolute top-[3px] right-1 h-1 w-1 rounded-full" />
          </button>
        ) : (
          <AlarmIcon className="h-6 w-6 cursor-pointer" />
        )}
        <PencilIcon className="h-6 w-6 cursor-pointer" />
      </div>
    </header>
  );
};
