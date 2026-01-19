export interface UserProfile {
  id: string;
  profileImg: string | null;
  nickname: string;
  userName: string; // name -> userName
  phoneNumber: string; // phone -> phoneNumber
  birthDate: string; // birth -> birthDate
}
