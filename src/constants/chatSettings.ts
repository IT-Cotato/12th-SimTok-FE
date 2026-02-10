interface ChatListItem {
  label: string;
  path: string;
}

export const CHAT_LIST_ITEMS: ChatListItem[] = [
  { label: "예약메세지 설정", path: "/chat/" },
  { label: "채팅방 이름", path: "/chat/" },
  { label: "채팅방 배경화면", path: "/chat/" },
  { label: "채팅방 알림", path: "/chat/" },
  { label: "AI 모드", path: "/chat/" },
] as const;
