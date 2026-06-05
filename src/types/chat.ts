export interface ChatOpponent {
  name: string;
  profileImageUrl: string;
}

export interface ChatRoomItem {
  roomId: number;
  roomName: string;
  friendshipId: number;
  lastMessagePreview: string;
  lastMessageAt: string;
  unreadCount: number;
  opponent: {
    name: string;
    profileImageUrl: string;
  } | null;
}

export type MessageType = "TEXT" | "ATTACHMENT";

export interface ChatAttachment {
  attachmentType: string;
  objectKey: string;
}

export interface ApiMessageItem {
  messageId: number;
  messageSeq: number;
  senderMemberId: number;
  messageType: MessageType;
  content: string | null;
  createdAt: string;
  attachment?: ChatAttachment | null;
}

export interface ChatMessage {
  id: string | number;
  type: "mine" | "friend";
  content: string;
  time: string;
  createdAt: string;
  messageSeq?: number;
  isImage?: boolean;
}

export interface ChatTopicItem {
  name: string;
  code: string;
}

export interface ChatListResponse {
  items: ChatRoomItem[];
}
