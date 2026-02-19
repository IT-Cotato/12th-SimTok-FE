import RECOMMENDATIONS from "@/mock/recommendations.json";

export const FRIENDS_SETTINGS_MENU = [
  { key: "friendName", title: "친구의 이름은 변경할 수 없어요" },
  { key: "chatFrequency", title: "친구와 대화의 빈도를 설정할 수 있어요" },
  { key: "chatStyle", title: "대화 말투를 변경할 수 있어요" },
  { key: "chatTopic", title: "친구와 대화하고 싶은 주제를 골라주세요" },
] as const;

export type SettingsMenuKey = (typeof FRIENDS_SETTINGS_MENU)[number]["key"];

export const CHAT_FREQUENCY_OPTIONS = [
  { value: 1, label: "주 1일" },
  { value: 2, label: "주 2일" },
  { value: 3, label: "주 3일" },
  { value: 4, label: "주 4일" },
  { value: 5, label: "주 5일" },
  { value: 6, label: "주 6일" },
  { value: 7, label: "매일" },
  { value: 0, label: "선택하지않음" },
] as const;

export const CHAT_STYLE = [
  { key: "존댓말", label: "존댓말" },
  { key: "반말", label: "반말" },
] as const;

export const CHAT_TOPIC = [
  {
    key: "WEATHER",
    label: "날씨",
    icon: "/images/chatTopic/weather.svg",
    recommendations: RECOMMENDATIONS.weather,
  },
  {
    key: "HEALTH",
    label: "건강",
    icon: "/images/chatTopic/health.svg",
    recommendations: RECOMMENDATIONS.health,
  },
  {
    key: "MEAL",
    label: "식사",
    icon: "/images/chatTopic/meal.svg",
    recommendations: RECOMMENDATIONS.meal,
  },
  {
    key: "MOOD",
    label: "기분",
    icon: "/images/chatTopic/mood.svg",
    recommendations: RECOMMENDATIONS.mood,
  },
  {
    key: "HOBBY",
    label: "취미",
    icon: "/images/chatTopic/hobby.svg",
    recommendations: RECOMMENDATIONS.hobby,
  },
  {
    key: "JOKE",
    label: "농담",
    icon: "/images/chatTopic/joke.svg",
    recommendations: RECOMMENDATIONS.joke,
  },
] as const;
