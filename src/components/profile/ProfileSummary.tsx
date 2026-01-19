"use client";

import Image from "next/image";

import DateIcon from "@/assets/date.svg";
import OnboardingProfileIcon from "@/assets/onboarding_profile.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import { InfoRow } from "@/components/mypage/InfoRow";

import type { UserProfile } from "@/types/user.type";

interface ProfileSummaryProps {
  userProfileData: UserProfile | null;
}

export const ProfileSummary = ({ userProfileData }: ProfileSummaryProps) => {
  if (!userProfileData) return null;
  const { profileImg, nickname, userName, phoneNumber, birthDate } =
    userProfileData;

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center">
      <div className="mt-[11px] flex flex-col items-center">
        <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-[36px]">
          {profileImg ? (
            <Image
              src={profileImg}
              alt={`${nickname}의 프로필 이미지`}
              fill
              className="object-cover"
            />
          ) : (
            <OnboardingProfileIcon className="h-full w-full" />
          )}
        </div>

        <h2 className="text-d3 mt-2 text-black">{nickname}</h2>
      </div>

      <div className="mt-[68px] flex w-full flex-col gap-2.5 px-4 py-2.5">
        <InfoRow Icon={ProfileIcon} value={userName} />
        <InfoRow Icon={DateIcon} value={birthDate} />
        <InfoRow Icon={PhoneIcon} value={phoneNumber} />
      </div>
    </div>
  );
};
