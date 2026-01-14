"use client";

import Image from "next/image";

import DateIcon from "@/assets/date.svg";
import OnboardingProfileIcon from "@/assets/onboarding_profile.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import type { UserProfile } from "@/types/user.type";

type Props = {
  profile: UserProfile;
};

export function ProfileSummary({ profile }: Props) {
  const { imageUrl, nickname, name, phone, birth } = profile;

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center">
      <div className="mt-[86px] flex flex-col items-center">
        <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-[36px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="프로필 이미지"
              fill
              className="object-cover"
            />
          ) : (
            <OnboardingProfileIcon className="h-full w-full" />
          )}
        </div>

        <h2 className="text-d3 mt-2 text-black">{nickname}</h2>
      </div>

      <div className="mt-[10px] flex w-full flex-col gap-2.5 px-4 py-2.5">
        <div className="bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl">
          <div className="pr-2.5">
            <ProfileIcon />
          </div>
          <span className="text-h2 text-neutral-07">{name}</span>
        </div>

        <div className="bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl">
          <div className="pr-2.5">
            <PhoneIcon />
          </div>
          <span className="text-h2 text-neutral-07">{phone}</span>
        </div>

        <div className="bg-neutral-11 flex h-[55px] w-full items-center rounded-2xl">
          <div className="pr-2.5">
            <DateIcon />
          </div>
          <span className="text-h2 text-neutral-07">{birth}</span>
        </div>
      </div>
    </div>
  );
}
