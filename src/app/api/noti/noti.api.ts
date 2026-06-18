import { NotificationListResponse } from "@/types/noti.type";

import { apiInstance } from "../apiInstance";

export const getUnreadNotificationCount = async (): Promise<number> => {
  const { data } = await apiInstance.get("/notifications/unread-count");
  return data.data.count;
};

export const getNotifications = async (): Promise<NotificationListResponse> => {
  const { data } = await apiInstance.get("/notifications");
  return data.data;
};
