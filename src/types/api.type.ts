export interface FriendshipResponse {
  friendshipId: number;
  friendId: number;
  showName: string;
  profileImageUrl: string | null;
  status: "ACTIVE" | "PENDING";
  lastInteractedAt: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    count: number;
    friendshipList: FriendshipResponse[];
  };
}
