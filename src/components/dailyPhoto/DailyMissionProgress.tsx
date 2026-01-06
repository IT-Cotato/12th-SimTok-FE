"use client";

import CheckIcon from "@/assets/check.svg";
import QuestionIcon from "@/assets/questionMark.svg";

import { WEEK_DAYS } from "@/constants/dayToKorean";

import { getWeekDayStatus } from "@/utils/getCurrentDay";

export const DailyMissionProgress = () => {
  return (
    <ul className="scrollbar-hide mt-8 flex gap-[9px] overflow-x-auto px-4">
      {WEEK_DAYS.map((item, index) => {
        const status = getWeekDayStatus(index); // past | today | future
        const isTodayCompleted = false;

        const showCheck =
          status === "past" || (status === "today" && isTodayCompleted);

        return (
          <li key={item} className="h-[82px] w-[74px] shrink-0">
            <div
              className={`${showCheck ? "bg-spring-01" : "bg-white"} ${status != "future" ? "border-mint-01" : "border-neutral-08"} flex h-full flex-col items-center justify-center gap-[3px] rounded-2xl border border-solid px-[10px] py-[6px]`}
            >
              {showCheck ? (
                <div className="bg-mint-01 flex h-8 w-8 items-center justify-center rounded-full">
                  <CheckIcon className="text-spring-01 h-6 w-6" />
                </div>
              ) : (
                <div
                  className={`${status === "today" ? "bg-mint-01" : "bg-neutral-08"} flex h-8 w-8 items-center justify-center rounded-full`}
                >
                  <QuestionIcon
                    className={`${status === "today" ? "text-white" : "text-neutral-06"} h-6 w-6`}
                  />
                </div>
              )}
              <span
                className={`text-sub1-sb ${status === "today" ? "text-neutral-01" : "text-neutral-06"}`}
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
