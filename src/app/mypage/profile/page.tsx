"use client";

import { useRouter } from "next/navigation";

import { FullButton } from "@/components/common/FullButton";
import { ProfileSummary } from "@/components/profile/ProfileSummary";

import { useUserProfile } from "@/hooks/useUserProfile";

const ProfileSettingPage = () => {
  const router = useRouter();
  const { profile, isLoading } = useUserProfile();

  return (
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <ProfileSummary profile={profile} />
        <div className="mt-[252px] flex w-full justify-center px-4">
          <FullButton onClick={() => router.push("/mypage")}>
            설정완료
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default ProfileSettingPage;
