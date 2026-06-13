"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { updateMyProfile } from "@/app/api/profile/profile.api";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ProfileSummary } from "@/components/profile/ProfileSummary";

import { useUserProfile } from "@/hooks/useUserProfile";

import { formatDateWithSlash, formatPhone } from "@/utils/format";

const ProfileSettingPage = () => {
  const router = useRouter();
  const { userProfileData } = useUserProfile();
  const [localProfileImageUrl, setLocalProfileImageUrl] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileImageUrl =
    localProfileImageUrl ?? userProfileData?.profileImageUrl ?? "";

  const isUploading = profileImageUrl.startsWith("blob:");

  const handleUpdateProfile = async () => {
    if (isUploading) return;
    try {
      await updateMyProfile(profileImageUrl);
      router.push("/mypage");
    } catch {
      alert("프로필 저장에 실패했습니다.");
    }
  };

  return (
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-110 flex-1 flex-col pb-20">
        <BackHeader title="프로필 설정" />

        <div className="flex flex-1 flex-col items-center">
          <section className="w-full">
            <ProfileSummary
              userProfileData={
                userProfileData
                  ? {
                      profileImageUrl: profileImageUrl,
                      name: userProfileData.name || "",
                      phoneNumber: userProfileData.phoneNumber
                        ? formatPhone(userProfileData.phoneNumber)
                        : "",
                      birthDate: userProfileData.birthDate
                        ? formatDateWithSlash(userProfileData.birthDate)
                        : "",
                    }
                  : null
              }
              onModalStateChange={setIsModalOpen}
              onImageUrlChange={setLocalProfileImageUrl}
            />
          </section>
        </div>

        {!isModalOpen && (
          <div className="mb-13 w-full px-4 py-[10px]">
            <FullButton onClick={handleUpdateProfile} disabled={isUploading}>
              설정완료
            </FullButton>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfileSettingPage;
