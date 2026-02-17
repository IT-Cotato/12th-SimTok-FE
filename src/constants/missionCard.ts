import { MissionCategory } from "@/types/dailyRecord.type";

export const MISSION_STATUS = {
  NOT_STARTED: {
    title: "하루한컷 미션 도착!",
    buttonText: "시작하기",
  },
  IMAGE_UPLOADED: {
    title: "하루한컷 미션 중",
    buttonText: "공유하기",
  },
  IMAGE_CONFIRMED: {
    title: "하루한컷 미션 완료",
    buttonText: "보러가기",
  },
} as const;

export const MISSION_ICONS: Record<MissionCategory, string> = {
  FOOD: "/images/missionIcon/food.svg",
  PLANT: "/images/missionIcon/plant.svg",
  COLOR: "/images/missionIcon/color.svg",
  MOMENT: "/images/missionIcon/moment.svg",
  TV: "/images/missionIcon/tv.svg",
};
