import { ApiMessageItem } from "@/types/chat";

import { apiInstance } from "../apiInstance";

interface ChatRoomsParams {
  limit?: number;
  cursorAt?: string;
  cursorRoomId?: string;
}

export const getChatRooms = async (params?: ChatRoomsParams) => {
  const { data } = await apiInstance.get("/chat/rooms", { params });
  return data;
};

export const enterChatRoom = async (roomId: string): Promise<void> => {
  await apiInstance.post(`/chat/rooms/${roomId}/enter`);
};

export const getChatMessages = async (
  roomId: string,
  limit = 500,
  cursorSeq?: string,
): Promise<ApiMessageItem[]> => {
  const params: Record<string, string | number> = { limit };
  if (cursorSeq) params.cursorSeq = cursorSeq;

  const { data } = await apiInstance.get(`/chat/rooms/${roomId}/messages`, {
    params,
  });
  if (!data.success) throw new Error("Failed to load chat messages");
  return data.data?.items ?? [];
};

export const resolveDirectRoom = async (opponentMemberId: string) => {
  const { data } = await apiInstance.get("/chat/rooms/direct/resolve", {
    params: { opponentMemberId },
  });
  return data;
};

export const leaveChatRoom = async (roomId: string) => {
  const { data } = await apiInstance.post(`/chat/rooms/left/${roomId}`);
  return data;
};

export const getPresignedUrl = async (
  objectKey: string,
): Promise<string | null> => {
  try {
    const { data } = await apiInstance.get(
      `/chat/attachments/presigned-get?objectKey=${encodeURIComponent(objectKey)}`,
    );
    return data?.url ?? null;
  } catch {
    return null;
  }
};
