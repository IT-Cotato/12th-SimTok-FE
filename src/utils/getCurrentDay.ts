// 월:0 ~ 일:6
export const getMondayStartIndex = (day: number) => (day === 0 ? 6 : day - 1);

// 오늘 요일 인덱스
export const getTodayIndex = () => {
  const today = new Date().getDay();
  return getMondayStartIndex(today);
};

type DayStatus = "past" | "today" | "future";

export const getWeekDayStatus = (targetIndex: number): DayStatus => {
  const todayIndex = 4;

  if (targetIndex < todayIndex) return "past";
  if (targetIndex > todayIndex) return "future";
  return "today";
};
