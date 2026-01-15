"use client";

import { useRouter } from "next/navigation";

import { FullButton } from "@/components/common/FullButton";
import { ProfileSummary } from "@/components/profile/ProfileSummary";

import { useUserProfile } from "@/hooks/useUserProfile";

const ProfileSettingPage = () => {
  const router = useRouter();
  const { userProfileData, error } = useUserProfile();

  if (error || !userProfileData) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        프로필을 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <ProfileSummary userProfileData={userProfileData} />
        <div className="mt-252px] fixed flex w-full justify-center px-4">
          <FullButton onClick={() => router.push("/mypage")}>
            설정완료
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default ProfileSettingPage;
