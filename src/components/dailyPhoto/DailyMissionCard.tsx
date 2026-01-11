"use client";
import Image from "next/image";

import { useState } from "react";

import { WEEK_DAYS } from "@/constants/dayToKorean";
import { MISSION_SORT, MISSION_STATUS } from "@/constants/missionCard";

import missionCardData from "@/mock/randomMission.json";

import { getTodayIndex } from "@/utils/getCurrentDay";

export const DailyMissionCard = () => {
  const [status, setStatus] =
    useState<keyof typeof MISSION_STATUS>("NOT_STARTED");
  const currentDayIndex = getTodayIndex();
  const currentDay = WEEK_DAYS[currentDayIndex]; // 현재 요일

  const subtitle =
    typeof MISSION_STATUS[status].subtitle === "function"
      ? `${MISSION_STATUS[status].subtitle(currentDay)}요일`
      : MISSION_STATUS[status].subtitle;

  const missionKind = missionCardData[0].kind;

  const missionIcon = MISSION_SORT.find(
    item => item.sort === missionKind,
  )?.icon;

  return (
    <section className="flex h-[385px] w-[353px] flex-col items-center justify-center gap-5 rounded-2xl bg-white">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-green-01 text-h3">
          {MISSION_STATUS[status].title}
        </h3>
        <p className="text-neutral-06 text-sub1-r -mt-[4px]">{subtitle}</p>
      </div>
      {missionIcon && (
        <div className="bg-neutral-11 flex h-28 w-28 items-center justify-center rounded-full">
          <Image
            src={missionIcon}
            alt="미션카드종류 이미지"
            width={88}
            height={88}
          />
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <div className="text-sub-number p-[10px]">
          {missionCardData[0].mission}
        </div>
        <button
          className={`${status == "NOT_STARTED" ? "bg-gradient-orange" : "bg-green-01"} text-button-sb h-[50px] w-[90px] cursor-pointer rounded-2xl text-white`}
        >
          {MISSION_STATUS[status].buttonText}
        </button>
      </div>
    </section>
  );
};
