"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import type { UserProfile } from "@/types/user.type";

interface MyProfileCardProps {
  userProfileData: UserProfile;
  onEdit?: () => void;
}

export const MyProfileCard = ({
  userProfileData,
  onEdit,
}: MyProfileCardProps) => {
  //const router = useRouter();
  const { profileImg, nickName } = userProfileData;

  // const handleEditRedirect = () => {
  //   router.push("/mypage/profile");
  // };

  return (
    <div
      onClick={onEdit}
      className="border-neutral-10 flex w-full items-center justify-between border-b px-4 py-2"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
          <Image
            src={profileImg || "/images/default-profile.png"}
            alt={`${nickName} 프로필`}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-h2 text-neutral-01">{nickName}</span>
      </div>

      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          onEdit?.();
        }}
        className="border-neutral-08 text-body3 text-neutral-04 cursor-pointer rounded-2xl border px-4 py-1.5"
      >
        편집
      </button>
    </div>
  );
};
