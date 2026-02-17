export const WEEK_DAYS_KOR = [
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
  "일",
] as const;

export type WeekDayKor = (typeof WEEK_DAYS_KOR)[number];

export const WEEK_DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type WeekDayKey = (typeof WEEK_DAY_KEYS)[number];
