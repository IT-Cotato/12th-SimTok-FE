"use client";

import CheckIcon from "@/assets/check.svg";
import CrossIcon from "@/assets/close-bold.svg";
import QuestionIcon from "@/assets/questionMark.svg";

import { WEEK_DAYS_KOR, WeekDayKor } from "@/constants/weekDays";

import { WeeklyStatus } from "@/types/dailyRecord.type";

interface DailyMissionProgressProps {
  weeklyStatus: WeeklyStatus[];
}

export const DailyMissionProgress = ({
  weeklyStatus,
}: DailyMissionProgressProps) => {
  return (
    <ul className="scrollbar-hide mt-8 flex gap-[9px] overflow-x-auto px-4">
      {weeklyStatus.map((item, index) => {
        const showCheck = item.status === "DONE";
        const showCross = item.status === "MISSED";
        const showQuestion =
          item.status === "WAITING" || item.status === "FUTURE";

        const weekDayKor = WEEK_DAYS_KOR[index] as WeekDayKor;

        return (
          <li key={weekDayKor} className="h-[82px] w-[74px] shrink-0">
            <div
              className={`flex h-full flex-col items-center justify-center gap-[3px] rounded-2xl border border-solid px-[10px] py-[6px] ${showQuestion ? "bg-white" : "bg-spring-01"} ${item.status !== "FUTURE" ? "border-mint-01" : "border-neutral-08"} `}
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
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${item.status === "WAITING" ? "bg-mint-01" : "bg-neutral-08"} `}
                >
                  <QuestionIcon
                    className={`h-6 w-6 ${
                      item.status === "WAITING"
                        ? "text-white"
                        : "text-neutral-06"
                    } `}
                  />
                </div>
              )}

              <span
                className={`text-sub1-sb ${
                  item.status !== "FUTURE"
                    ? "text-neutral-01"
                    : "text-neutral-06"
                } `}
              >
                {weekDayKor}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
