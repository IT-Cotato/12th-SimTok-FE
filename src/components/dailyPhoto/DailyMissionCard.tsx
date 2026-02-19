"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { postChallenge } from "@/app/api/dailyRecord/dayLog.api";

import { MISSION_ICONS, MISSION_STATUS } from "@/constants/missionCard";
import { WEEK_DAYS_KOR } from "@/constants/weekDays";

import { useImageUpload } from "@/hooks/useImageUpload";

import { MissionInfo, MyChallenge } from "@/types/dailyRecord.type";

import { getTodayIndex } from "@/utils/getCurrentDay";

import { OnlyLoader } from "../common/OnlyLoader";

interface DailyMissionCardProps {
  status: keyof typeof MISSION_STATUS;
  setStatus: React.Dispatch<React.SetStateAction<keyof typeof MISSION_STATUS>>;
  missionData: MissionInfo;
  myChallenge: MyChallenge | null;
}

export const DailyMissionCard = ({
  status,
  setStatus,
  missionData,
  myChallenge,
}: DailyMissionCardProps) => {
  const router = useRouter();

  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 오늘 요일 인덱스와 한글 요일
  const currentDayIndex = getTodayIndex();
  const koreanDay = WEEK_DAYS_KOR[currentDayIndex];

  // 미션 종류 찾기
  const missionKind = missionData.category;
  const missionIcon = MISSION_ICONS[missionKind as keyof typeof MISSION_ICONS];

  const { inputRef, openFilePicker, onChangeFile, isUploading } =
    useImageUpload({
      folder: "CHALLENGE",
      onSelect: (url: string) => {
        if (url.startsWith("blob:")) {
          setPreviewUrl(url);
          setStatus("IMAGE_UPLOADED");
        } else {
          setFinalImageUrl(url); // S3 업로드 완료 시 URL 저장
        }
      },
    });

  const handleConfirmClick = async () => {
    if (!finalImageUrl) return <OnlyLoader />;

    try {
      await postChallenge(missionData.missionId, finalImageUrl);
      setStatus("IMAGE_CONFIRMED");
    } catch (error) {
      console.error("챌린지 제출 실패:", error);
    }
  };

  if (isUploading) {
    return <OnlyLoader />;
  }
  return (
    <section className="flex h-[385px] w-[353px] flex-col items-center justify-center gap-5 rounded-2xl bg-white">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-green-01 text-h3">
          {MISSION_STATUS[status].title}
        </h3>
        <p className="text-neutral-06 text-sub1-r -mt-[4px]">{koreanDay}요일</p>
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
      {status !== "NOT_STARTED" && (previewUrl || myChallenge?.imageUrl) && (
        <div
          className={`h-27 w-27 overflow-hidden rounded-full ${status === "IMAGE_CONFIRMED" ? "border border-[4px] border-white shadow-[0_0_12px_-1px_#00C362]" : ""}`}
        >
          <Image
            src={previewUrl || myChallenge?.imageUrl || ""}
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
            ? "미션 공유가 완료되었어요"
            : missionData.content}
        </div>
        <button
          className={`${status == "NOT_STARTED" ? "bg-gradient-orange" : "bg-mint-01"} text-button-sb h-[50px] w-[90px] cursor-pointer rounded-2xl text-white`}
          onClick={() => {
            if (status === "NOT_STARTED") openFilePicker();
            if (status === "IMAGE_UPLOADED") handleConfirmClick();
            if (status === "IMAGE_CONFIRMED") router.push("/day-log/");
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
