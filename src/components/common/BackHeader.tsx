"use client";

import { useRouter } from "next/navigation";

import BackIcon from "@/assets/left-arrow.svg";
import ListIcon from "@/assets/list.svg";

interface HeaderProps {
  title?: string;
  timeAgo?: string; // 하루한컷보기에서 사용
  menuIcon?: boolean; // 채팅페이지에서 사용
  titleColor?: string; //하루한컷 업로드에서 사용
  subtext?: string; // 친구목록에서 사용
  isEditMode?: boolean; //친구목록에서 사용;
  onClickEdit?: () => void; //친구목록에서 사용;
  selectedCount?: number; //친구목록에서 사용;
}

export const BackHeader = ({
  title,
  timeAgo,
  menuIcon,
  titleColor = "black",
  subtext,
  isEditMode,
  onClickEdit,
  selectedCount,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <header
      className={`relative mt-[13px] flex px-4 py-[10px] ${!title && "h-9"}`}
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer"
      >
        <BackIcon className={`text-${titleColor} h-6 w-6`} />
      </button>
      <h1
        className={`text-h1 flex w-full items-center justify-center whitespace-nowrap text-${titleColor}`}
      >
        {title}
      </h1>
      {timeAgo && (
        <p className="text-sub2-sb text-neutral-04 absolute right-4 bottom-[10px]">
          {timeAgo}
        </p>
      )}
      {menuIcon && (
        <button className="absolute top-1/2 right-4 -translate-y-1/2">
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
    </header>
  );
};
