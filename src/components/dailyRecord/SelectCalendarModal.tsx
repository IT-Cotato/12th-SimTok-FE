import CalendarIcon from "@/assets/calendar-mint.svg";

import { DatePicker } from "../sharedDiary/DatePicker";

export const SelectCalendarModal = () => {
  return (
    <div className="z-100 mx-auto flex w-[376px] flex-col gap-3">
      <div className="border-neutral-09 flex gap-4 rounded-xl border-[1.5px] bg-white px-[22.5px] py-3">
        <CalendarIcon />
      </div>

      <div>
        <DatePicker />
      </div>
    </div>
  );
};
