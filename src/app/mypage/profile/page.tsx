"use client";

import { useRouter } from "next/navigation";

import { BackHeader } from "@/components/common/BackHeader";
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
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-110 flex-1 flex-col pb-20">
        <BackHeader title="프로필 설정" />

        <section className="flex flex-col items-center">
          <ProfileSummary userProfileData={userProfileData} />
        </section>
      </div>

      <div className="fixed right-0 bottom-0 left-0 z-10 px-4 pb-4">
        <div className="mx-auto max-w-110">
          <FullButton onClick={() => router.push("/mypage")}>
            설정완료
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default ProfileSettingPage;
