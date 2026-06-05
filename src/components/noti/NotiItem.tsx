"use client";

import { ProfileImagePicker } from "@/components/common/ProfileImagePicker";

interface NotiItemProps {
  imgUrl?: string | null;
  content: string;
  timeText: string;
}

export const NotiItem = ({ imgUrl, content, timeText }: NotiItemProps) => {
  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-2.5 select-none">
      <div className="flex items-center gap-4">
        <ProfileImagePicker
          imageUrl={imgUrl || null}
          canEdit={false}
          width={48}
          height={48}
          radius={16}
        />
        <span className="text-sub1-r text-neutral-03">{content}</span>
      </div>
      <span className="text-sub1-r text-neutral-04 min-w-fit pl-2">
        {timeText}
      </span>
    </div>
  );
};
