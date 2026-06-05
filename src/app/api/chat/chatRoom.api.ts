import { ApiMessageItem } from "@/types/chat";

import { apiInstance } from "../apiInstance";

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

export const enterChatRoom = async (roomId: string): Promise<void> => {
  await fetch(`/api/chat/rooms/${roomId}/enter`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const getChatMessages = async (
  roomId: string,
): Promise<ApiMessageItem[]> => {
  const res = await fetch(`/api/chat/rooms/${roomId}/messages?limit=500`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  const result = await res.json();
  return result.success ? (result.data?.items ?? []) : [];
};
