import { useState } from "react";

import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";

import PrevButton from "@/assets/calendar_prev.svg";

export const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 달
  const monthStart = startOfMonth(currentDate); // 현재 달의 시작 날짜
  const monthEnd = endOfMonth(monthStart); // 현재 달의 마지막 날짜
  const startDate = startOfWeek(monthStart); // 현재 달의 첫 주 시작 날짜
  const endDate = endOfWeek(monthEnd); // 현재 달의 마지막 주 마지막 날짜

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // date-fns 함수인 addMonths를 사용하여 클릭 시 현재 달에서 1달을 더해줌
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="w-full rounded-xl bg-white p-[15px]">
      {/* header */}
      <div className="flex w-full justify-between py-[7.5px]">
        <button onClick={prevMonth}>
          <PrevButton />
        </button>
        <p className="text-sub0 text-neutral-01">
          {format(currentDate, "MM")}월 {format(currentDate, "yyyy")}
        </p>
        <button onClick={nextMonth}>
          <PrevButton className="rotate-180" />
        </button>
      </div>
      {/* body */}
      <div>
        <div className="mb-2 grid grid-cols-7 text-center">
          {week.map((day, idx) => (
            <div key={idx} className="text-sub0-sb text-neutral0=-01 py-1">
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
