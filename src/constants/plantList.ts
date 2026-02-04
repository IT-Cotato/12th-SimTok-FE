export const PLANT_SORT_SIMPLE = [
  { id: "daisy", name: "데이지" },
  { id: "tulip", name: "튤립" },
  { id: "lily", name: "은방울꽃" },
  { id: "sunflower", name: "해바라기" },
  { id: "baby-breath", name: "안개" },
] as const;

export const PLANT_IMAGE_MAP = {
  SEED: {
    good: "/images/garden/seed.svg",
    bad: "/images/garden/seed_bad.svg",
  },
  SPROUT: {
    good: "/images/garden/sprout.svg",
    bad: "/images/garden/sprout_bad.svg",
  },
  STEM: {
    good: "/images/garden/stem.svg",
    bad: "/images/garden/stem_bad.svg",
  },
  BUD: {
    good: "/images/garden/bud.svg",
    bad: "/images/garden/bud_bad.svg",
  },
} as const;

export const PlantSort = [
  {
    id: "daisy",
    name: "데이지",
    duration: 10,
    length: 12,
    difficulty: 1,
    meanings: ["새로운시작", "순수한마음", "기다림의기쁨"],
    bgColor: "bg-mint-02",
    textColor: "text-green-01",
    shadow: "0 0 30px 0 #4EFFA7",
    img: "/images/garden/daisy.svg",
  },
  {
    id: "tulip",
    name: "튤립",
    duration: 12,
    length: 12,
    difficulty: 2,
    meanings: ["애정", "희망", "행복한사랑"],
    bgColor: "bg-blue-01",
    textColor: "text-blue-00",
    shadow: "0 0 30px 0 #65BEFF",
    img: "/images/garden/tulip.svg",
  },
  {
    id: "lily",
    name: "은방울꽃",
    duration: 12,
    length: 15,
    difficulty: 2,
    meanings: ["겸손", "순수함", "행복의방문"],
    bgColor: "bg-blue-01",
    textColor: "text-blue-00",
    shadow: "0 0 30px 0 #65BEFF",
    img: "/images/garden/lily.svg",
  },
  {
    id: "sunflower",
    name: "해바라기",
    duration: 17,
    length: 14,
    difficulty: 4,
    meanings: ["존경", "동경", "사랑의고백"],
    bgColor: "bg-pink-00",
    textColor: "text-red-01",
    shadow: "0 0 30px 0 #FF3C00",
    img: "/images/garden/sunflower.svg",
  },
  {
    id: "baby-breath",
    name: "안개",
    duration: 19,
    length: 18,
    difficulty: 4,
    meanings: ["배려", "맑은마음", "순수한사랑"],
    bgColor: "bg-pink-00",
    textColor: "text-red-01",
    shadow: "0 0 30px 0 #FF3C00",
    img: "/images/garden/baby-breath.svg",
  },
];
