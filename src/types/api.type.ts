interface FriendshipResponse {
  friendshipId: number;
  friendId: number;
  showName: string;
  profileImageUrl: string | null;
  status: "ACTIVE" | "PENDING";
  lastInteractedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    count: number;
    friendshipList: FriendshipResponse[];
  };
}
