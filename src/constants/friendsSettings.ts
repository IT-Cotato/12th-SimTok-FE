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
  { key: "formal", label: "존댓말" },
  { key: "casual", label: "반말" },
] as const;

export const CHAT_TOPIC = [
  {
    key: "weather",
    label: "날씨",
    icon: "/images/chatTopic/weather.svg",
    recommendations: [
      "오늘 날씨가 한결 따뜻하대요☺️",
      "오늘은 포근한 하루래요🤗",
      "오늘은 옷 따뜻하게 입으세요😊",
      "오늘은 비가 오네요. 우산 챙기세요☔️",
      "오늘은 날씨가 더워요. 물 자주 드세요🥺",
      "오늘은 하늘이 흐려요🙌",
    ],
  },
  {
    key: "health",
    label: "건강",
    icon: "/images/chatTopic/health.svg",
    recommendations: [
      "영양제는 챙겨 드셨나요?💊",
      "가벼운 산책 어떠세요?🏃‍♂️",
      "충분한 휴식이 필요한 날이에요😴",
    ],
  },
  {
    key: "meal",
    label: "식사",
    icon: "/images/chatTopic/meal.svg",
    recommendations: [
      "오늘 점심은 맛있게 드셨나요?🍚",
      "저녁 메뉴는 정하셨어요?🥘",
      "좋아하는 간식 챙겨 드세요🍎",
    ],
  },
  {
    key: "mood",
    label: "기분",
    icon: "/images/chatTopic/mood.svg",
    recommendations: [
      "오늘 기분은 어떠신가요?✨",
      "행복한 소식이 있었나요?🌈",
      "가끔은 마음을 비우는 것도 좋아요🍀",
    ],
  },
  {
    key: "hobby",
    label: "취미",
    icon: "/images/chatTopic/hobby.svg",
    recommendations: [
      "요즘 즐겨 하시는 활동이 있나요?🎨",
      "좋아하는 음악 추천해 드릴까요?🎵",
      "독서하며 여유를 즐겨보세요📚",
    ],
  },
  {
    key: "joke",
    label: "농담",
    icon: "/images/chatTopic/joke.svg",
    recommendations: [
      "세상에서 가장 가난한 왕은? 최저임금🤴",
      "딸기가 직장을 잃으면? 딸기시럽🍓",
      "바나나가 웃으면? 바나나킥🍌",
    ],
  },
] as const;
