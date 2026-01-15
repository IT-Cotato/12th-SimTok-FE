"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { MISSION_SORT, MISSION_STATUS } from "@/constants/missionCard";
import { WEEK_DAYS_KOR } from "@/constants/weekDays";

import { useImageUpload } from "@/hooks/useImageUpload";

import missionCardData from "@/mock/randomMission.json";

import { getTodayIndex } from "@/utils/getCurrentDay";
import { getMissionSubtitle } from "@/utils/getMissionSubtitle";

interface DailyMissionCardProps {
  status: keyof typeof MISSION_STATUS;
  setStatus: React.Dispatch<React.SetStateAction<keyof typeof MISSION_STATUS>>;
}

export const DailyMissionCard = ({
  status,
  setStatus,
}: DailyMissionCardProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const currentDayIndex = getTodayIndex();
  const currentDay = WEEK_DAYS_KOR[currentDayIndex]; // 현재 요일

  const subtitle = getMissionSubtitle(status, currentDayIndex);

  const missionKind = missionCardData[0].kind;

  const missionIcon = MISSION_SORT.find(
    item => item.sort === missionKind,
  )?.icon;

  const onSelectImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setStatus("IMAGE_UPLOADED");
  };

  const { inputRef, openFilePicker, onChangeFile } = useImageUpload({
    onSelect: ({ file }) => {
      onSelectImage(file);
    },
    maxSizeMB: 10,
  });
  const router = useRouter();
  return (
    <section className="flex h-[385px] w-[353px] flex-col items-center justify-center gap-5 rounded-2xl bg-white">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-green-01 text-h3">
          {MISSION_STATUS[status].title}
        </h3>
        <p className="text-neutral-06 text-sub1-r -mt-[4px]">{subtitle}</p>
      </div>
      {status === "NOT_STARTED" && missionIcon && (
        <div className="bg-neutral-11 flex h-28 w-28 items-center justify-center rounded-full">
          <Image
            src={missionIcon}
            alt="미션카드종류 이미지"
            width={88}
            height={88}
          />
        </div>
      )}
      {status !== "NOT_STARTED" && previewUrl && (
        <div
          className={`h-27 w-27 overflow-hidden rounded-full ${status === "IMAGE_CONFIRMED" ? "border border-[4px] border-white shadow-[0_0_12px_-1px_#00C362]" : ""}`}
        >
          <Image
            src={previewUrl}
            alt="하루한컷이미지"
            width={108}
            height={108}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <div className="text-sub-number p-[10px]">
          {status === "IMAGE_CONFIRMED"
            ? "미션이 완료되었어요!"
            : missionCardData[0].mission}
        </div>
        <button
          className={`${status == "NOT_STARTED" ? "bg-gradient-orange" : "bg-mint-01"} text-button-sb h-[50px] w-[90px] cursor-pointer rounded-2xl text-white`}
          onClick={() => {
            if (status === "NOT_STARTED") openFilePicker();
            if (status === "IMAGE_UPLOADED") setStatus("IMAGE_CONFIRMED");
            if (status === "IMAGE_CONFIRMED") router.push("/day-log");
          }}
        >
          {MISSION_STATUS[status].buttonText}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChangeFile}
      />
    </section>
  );
};
