"use client";

import { ProfileImagePicker } from "@/components/common/ProfileImagePicker";

interface NotiItemProps {
  imgUrl?: string | null;
  content: string;
  timeText: string;
  onClick?: () => void;
}

export const NotiItem = ({
  imgUrl,
  content,
  timeText,
  onClick,
}: NotiItemProps) => {
  return (
    <div
      className="flex w-full items-center justify-between bg-white px-4 py-2.5 select-none"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
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
