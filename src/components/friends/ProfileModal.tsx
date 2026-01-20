import Image from "next/image";

interface ProfileModalProps {
  profileImg: string;
  userName: string;
}
export const ProfileModal = ({ profileImg, userName }: ProfileModalProps) => {
  return (
    <div>
      <Image
        src={profileImg}
        alt={`${userName}의 프로필이미지`}
        width={174}
        height={174}
        className="object-cover"
      />
    </div>
  );
};
