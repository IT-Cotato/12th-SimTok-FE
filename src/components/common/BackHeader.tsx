"use client";

import { useRouter } from "next/navigation";

import CalendarIcon from "@/assets/calendar.svg";
import BackIcon from "@/assets/left-arrow.svg";
import ListIcon from "@/assets/list.svg";

interface BackHeaderProps {
  title?: string;
  timeAgo?: string; // 하루한컷보기에서 사용
  menuIcon?: () => void;
  calendarIcon?: () => void; // 공유일기에서 사용
  onBack?: () => void;
  titleColor?: string; //하루한컷 업로드에서 사용
  iconColor?: string;
  subtext?: string; // 친구목록에서 사용
  isEditMode?: boolean; //친구목록에서 사용;
  onClickEdit?: () => void; //친구목록에서 사용;
  selectedCount?: number; //친구목록에서 사용;
}

export const BackHeader = ({
  title,
  timeAgo,
  menuIcon,
  calendarIcon,
  onBack,
  titleColor = "neutral",
  iconColor = "neutral-01",
  subtext,
  isEditMode,
  onClickEdit,
  selectedCount,
}: BackHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className={`relative flex px-4 py-[10px] pt-[13px] ${!title && "h-9"}`}
    >
      <button
        type="button"
        onClick={handleBackClick}
        className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer"
      >
        <BackIcon className={`text-${iconColor} h-6 w-6`} />
      </button>
      <h1
        className={`text-h1 flex w-full items-center justify-center whitespace-nowrap text-${titleColor}`}
      >
        {title}
      </h1>

      {timeAgo && (
        <p className="text-h3 text-neutral-11 absolute top-1/2 right-4 -translate-y-1/2">
          {timeAgo}
        </p>
      )}
      {menuIcon && (
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
          type="button"
          onClick={menuIcon}
        >
          <ListIcon />
        </button>
      )}
      {subtext && (
        <button
          className={` ${isEditMode ? "text-neutral-07" : "text-neutral-04"} text-h3 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer`}
          onClick={onClickEdit}
        >
          {isEditMode ? (
            <div className="flex gap-1">
              {selectedCount !== undefined && selectedCount > 0 && (
                <p className="text-mint-01">{selectedCount}</p>
              )}
              <p
                className={`${selectedCount != undefined && selectedCount > 0 && "text-neutral-04"}`}
              >
                선택해제
              </p>
            </div>
          ) : (
            subtext
          )}
        </button>
      )}
      {calendarIcon && (
        <button onClick={calendarIcon}>
          <CalendarIcon
            className={`text-${iconColor} h-6 w-6 cursor-pointer`}
          />
        </button>
      )}
    </header>
  );
};
