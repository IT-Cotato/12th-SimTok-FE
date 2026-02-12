"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import AlarmIcon from "@/assets/bell.svg";
import PencilIcon from "@/assets/pencil.svg";

import { InfoMessage } from "../dailyRecord/InfoMessage";

interface HeaderWithIconProps {
  havePencil?: boolean;
  title?: string;
  haveAlarm?: boolean;
}

export const HeaderWithIcon = ({
  title,
  havePencil = false,
  haveAlarm = true,
}: HeaderWithIconProps) => {
  const router = useRouter();
  const [isAlarmNew, setIsAlarmNew] = useState(true);
  const [isPencilClick, setIsPencilClick] = useState(false);

  const pencilClick = () => {
    setIsPencilClick(true);
    router.push("/shared-diary/upload");
  };

  return (
    <header className="relative mt-[13px] flex items-center justify-center px-4 py-[10px]">
      <h1 className="text-h1 text-black">{title}</h1>
      <div className="absolute right-4 flex gap-2">
        {haveAlarm && isAlarmNew ? (
          <button
            className="relative cursor-pointer"
            onClick={() => setIsAlarmNew(false)}
          >
            <AlarmIcon className="h-6 w-6 cursor-pointer" />
            <span className="bg-red-00 absolute top-[2px] left-[14px] h-[10px] w-[10px] rounded-full" />
          </button>
        ) : (
          <AlarmIcon className="h-6 w-6 cursor-pointer" />
        )}

        {havePencil && (
          <PencilIcon
            className="h-6 w-6 cursor-pointer"
            onClick={pencilClick}
          />
        )}
      </div>
      {havePencil && !isPencilClick && (
        <div className="absolute top-[41px] right-3">
          <InfoMessage text=" 공유일기를 작성하고 친구들과 공유해보세요!" />
        </div>
      )}
    </header>
  );
};
