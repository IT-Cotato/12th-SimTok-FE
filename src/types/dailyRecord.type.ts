export interface UserActivity {
  userId: number;
  userName: string;
  topic: "sky" | "meal" | "cloth";
  image: string;
  isRead: boolean;
  createdAt: string;
}
