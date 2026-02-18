export type InvitationContent = {
  inviteId: number;
  inviterId: number;
  plantName: string;
  inviterName: string;
  nickname: string;
  message: string;
  status: string;
  createdAt: string;
};

export type PlantInvite = {
  count: number;
  invitations: InvitationContent[];
};

export type InviteResponse = "ACCEPTED" | "REJECTED";
