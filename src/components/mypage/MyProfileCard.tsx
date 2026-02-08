"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { type ProfileData, profileApi } from "@/app/api/profile";

export const MyProfileCard = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await profileApi.getProfile();
        if (result.success) setProfile(result.data);
      } catch (err) {
        console.error("프로필 로드 실패:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile)
    return (
      <div className="bg-neutral-10 h-24 w-full animate-pulse rounded-2xl" />
    );

  const defaultImage = "images/onboarding_profile.svg";

  return (
    <div
      onClick={() => router.push("/mypage/profile")}
      className="border-neutral-10 flex w-full cursor-pointer items-center justify-between border-b px-4 py-2"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
          <Image
            src={profile.profileImageUrl || defaultImage}
            alt={`${profile.name} 프로필`}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-h2 text-neutral-01">{profile.name}</span>
      </div>

      <button
        type="button"
        className="border-neutral-08 text-body3 text-neutral-04 cursor-pointer rounded-2xl border px-4 py-1.5"
      >
        편집
      </button>
    </div>
  );
};
