export interface UserProfile {
  userId: number;
  profileImg: string | null;
  nickname?: string;
  userName: string;
  phoneNumber: string;
  birthDate: string;
  inviteCode: string;
}
