// export interface UserProfile {
//   userId: number;
//   profileImg: string | null;
//   nickName?: string;
//   userName: string;
//   phoneNumber: string;
//   birthDate: string;
//   inviteCode: string;
// }

export interface UserProfile {
  memberId: number;
  name: string;
  profileImageUrl: string;
  phoneNumber: string;
  birthDate: string;
}
