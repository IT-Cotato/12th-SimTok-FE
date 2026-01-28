"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ProfileSummary } from "@/components/profile/ProfileSummary";

import { useUserProfile } from "@/hooks/useUserProfile";

const ProfileSettingPage = () => {
  const router = useRouter();
  const { userProfileData } = useUserProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-110 flex-1 flex-col pb-20">
        <BackHeader title="프로필 설정" />

        <div className="flex flex-1 flex-col items-center">
          <section className="w-full">
            <ProfileSummary
              userProfileData={userProfileData}
              onModalStateChange={setIsModalOpen}
            />
          </section>
        </div>

        {!isModalOpen && (
          <div className="mb-13 w-full px-4 py-[10px]">
            <FullButton onClick={() => router.push("/mypage")}>
              설정완료
            </FullButton>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileSettingPage;
