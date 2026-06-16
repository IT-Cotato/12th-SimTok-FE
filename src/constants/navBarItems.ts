import RecordBlankIcon from "@/assets/navBar/book_blank.svg";
import RecordFillIcon from "@/assets/navBar/book_fill.svg";
import ChatBlankIcon from "@/assets/navBar/chat_blank.svg";
import ChatFillIcon from "@/assets/navBar/chat_fill.svg";
import HomeBlankIcon from "@/assets/navBar/home_blank.svg";
import HomeFillIcon from "@/assets/navBar/home_fill.svg";
import MypageBlankIcon from "@/assets/navBar/mypage_blank.svg";
import MypageFillIcon from "@/assets/navBar/mypage_fill.svg";
import GardenBlankIcon from "@/assets/navBar/plant_blank.svg";
import GardenFillIcon from "@/assets/navBar/plant_fill.svg";

export const NAV_ITEMS = [
  {
    key: "home",
    label: "홈",
    href: "/home",
    icons: {
      blank: HomeBlankIcon,
      fill: HomeFillIcon,
    },
  },
  {
    key: "record",
    label: "하루기록",
    href: "/day-log",
    icons: {
      blank: RecordBlankIcon,
      fill: RecordFillIcon,
    },
  },
  {
    key: "chat",
    label: "채팅",
    href: "/chat",
    icons: {
      blank: ChatBlankIcon,
      fill: ChatFillIcon,
    },
  },
  {
    key: "garden",
    label: "정원",
    href: "/garden",
    icons: {
      blank: GardenBlankIcon,
      fill: GardenFillIcon,
    },
  },
  {
    key: "mypage",
    label: "마이페이지",
    href: "/mypage",
    icons: {
      blank: MypageBlankIcon,
      fill: MypageFillIcon,
    },
  },
] as const;
