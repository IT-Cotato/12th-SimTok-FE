export const MISSION_STATUS = {
  NOT_STARTED: {
    title: "하루한컷 미션 도착!",
    subtitle: (localday: string) => localday,
    buttonText: "시작하기",
  },
  IMAGE_UPLOADED: {
    title: "하루한컷 미션을 공유할까요?",
    subtitle: "확인을 누르면 미션이 완료돼요",
    buttonText: "공유하기",
  },
  IMAGE_CONFIRMED: {
    title: "미션이 완료되었어요",
    subtitle: "소중한 오늘의 한컷을 기록했어요",
    buttonText: "보러가기",
  },
} as const;

export const MISSION_SORT = [
  { sort: "food", icon: "/images/missionIcon/food.svg" },
  {
    sort: "plant",
    icon: "/images/missionIcon/plant.svg",
  },
  { sort: "color", icon: "/images/missionIcon/color.svg" },
  { sort: "time", icon: "/images/missionIcon/time.svg" },
  { sort: "tv", icon: "/images/missionIcon/tv.svg" },
];
