"use client";

import CheckIcon from "@/assets/check.svg";
import CrossIcon from "@/assets/close-bold.svg";
import QuestionIcon from "@/assets/questionMark.svg";

import { MISSION_STATUS } from "@/constants/missionCard";
import { WEEK_DAYS_KOR, WEEK_DAY_KEYS } from "@/constants/weekDays";

import dailyRecordProgress from "@/mock/dailyRecordProgress.json";

import { getWeekDayStatus } from "@/utils/getCurrentDay";

type WeekDayKey = keyof typeof dailyRecordProgress;

interface DailyMissionProgressProps {
  status: keyof typeof MISSION_STATUS;
}

export const DailyMissionProgress = ({ status }: DailyMissionProgressProps) => {
  return (
    <ul className="scrollbar-hide mt-8 flex gap-[9px] overflow-x-auto px-4">
      {WEEK_DAYS_KOR.map((item, index) => {
        const dayStatus = getWeekDayStatus(index); // past | today | future
        const dayKey = WEEK_DAY_KEYS[index] as WeekDayKey;

        const isCompleted =
          dayStatus === "today" && status === "IMAGE_CONFIRMED"
            ? true
            : dailyRecordProgress[dayKey];

        const showCheck =
          (dayStatus === "past" && isCompleted) ||
          (dayStatus === "today" && isCompleted);

        const showCross = dayStatus === "past" && !isCompleted;

        const showQuestion =
          dayStatus === "future" || (dayStatus === "today" && !isCompleted);

        return (
          <li key={item} className="h-[82px] w-[74px] shrink-0">
            <div
              className={`flex h-full flex-col items-center justify-center gap-[3px] rounded-2xl border border-solid px-[10px] py-[6px] ${showQuestion ? "bg-white" : "bg-spring-01"} ${dayStatus !== "future" ? "border-mint-01" : "border-neutral-08"} `}
            >
              {showCheck && (
                <div className="bg-mint-01 flex h-8 w-8 items-center justify-center rounded-full">
                  <CheckIcon className="text-spring-01 h-6 w-6" />
                </div>
              )}

              {showCross && (
                <div className="bg-neutral-03 flex h-8 w-8 items-center justify-center rounded-full">
                  <CrossIcon className="text-neutral-08 h-[13px] w-[13px]" />
                </div>
              )}

              {showQuestion && (
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${dayStatus === "today" ? "bg-mint-01" : "bg-neutral-08"} `}
                >
                  <QuestionIcon
                    className={`h-6 w-6 ${
                      dayStatus === "today" ? "text-white" : "text-neutral-06"
                    } `}
                  />
                </div>
              )}

              <span
                className={`text-sub1-sb ${
                  dayStatus !== "future" ? "text-neutral-01" : "text-neutral-06"
                } `}
              >
                {item}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
