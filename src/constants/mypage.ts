import { ElementType } from "react";

import BellIcon from "@/assets/fi_bell.svg";
import FileIcon from "@/assets/file.svg";
// 아이콘 에셋 임포트 (경로는 프로젝트 구조에 따라 조정)
import LockIcon from "@/assets/lock.svg";
import LogoutIcon from "@/assets/logout.svg";
import ResignIcon from "@/assets/resign.svg";
import SpeakerIcon from "@/assets/speaker.svg";
import SupportIcon from "@/assets/support.svg";

interface MyPageMenuItem {
  label: string;
  path: string;
  Icon: ElementType;
}

export const MY_PAGE_MENU_ITEMS: MyPageMenuItem[] = [
  { label: "비밀번호변경", path: "/mypage/", Icon: LockIcon },
  { label: "알림설정", path: "/mypage/alarm", Icon: BellIcon },
  { label: "공지사항", path: "/mypage/", Icon: SpeakerIcon },
  { label: "서비스 이용약관", path: "/mypage/", Icon: FileIcon },
  { label: "로그아웃", path: "/mypage/", Icon: LogoutIcon },
  { label: "회원탈퇴", path: "/mypage/", Icon: ResignIcon },
  { label: "고객센터", path: "/mypage/cs", Icon: SupportIcon },
] as const;
