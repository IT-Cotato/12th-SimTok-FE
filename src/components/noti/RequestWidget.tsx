"use client";

import Image from "next/image";

import RightIcon from "@/assets/right-arrow.svg";

import { ProfileImage } from "../common/ProfileImage";

interface FriendRequestWidgetProps {
  imgUrl?: string | null;
  requesterName?: string;
  count?: number;
  onClick?: () => void;
}

export const RequestWidget = ({
  imgUrl,
  requesterName = "두쫀쿠",
  count = 2,
  onClick,
}: FriendRequestWidgetProps) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between bg-white px-4 py-2 select-none"
    >
      <div className="flex items-center gap-2.5">
        <ProfileImage
          src={imgUrl}
          alt={`${requesterName} 프로필 이미지`}
          size="sm"
        />
        <div className="flex flex-col gap-0.5 py-2.5">
          <span className="text-neutral-03 text-h2 leading-none">친구요청</span>
          <span className="text-neutral-03 text-sub1-r leading-none font-medium">
            {requesterName} 외 {count}명
          </span>
        </div>
      </div>

      <RightIcon className="h-6 w-6 text-black" />
    </div>
  );
};
