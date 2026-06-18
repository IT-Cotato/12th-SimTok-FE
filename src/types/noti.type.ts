export type NotificationSection = "GARDEN" | "DAILY_RECORD" | "CHAT";

export interface Notification {
  notificationId: number;
  section: NotificationSection;
  type: string;
  content: string;
  imageUrl: string | null;
  targetType: string;
  targetId: number;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationListResponse {
  notifications: Notification[];
  lastId: number;
  hasNext: boolean;
}
