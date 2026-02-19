"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ProfileSummary } from "@/components/profile/ProfileSummary";

import { useImageUpload } from "@/hooks/useImageUpload";
import { useUserProfile } from "@/hooks/useUserProfile";

import { formatDateWithSlash, formatPhone } from "@/utils/format";

const ProfileSettingPage = () => {
  const router = useRouter();
  const { userProfileData } = useUserProfile();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userProfileData?.profileImageUrl) {
      setProfileImageUrl(userProfileData.profileImageUrl);
    }
  }, [userProfileData]);

  const { inputRef, openFilePicker, onChangeFile, isUploading } =
    useImageUpload({
      onSelect: url => setProfileImageUrl(url), // 미리보기 및 S3 URL 순차 반영
      folder: "PROFILE",
    });

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/profile", {
        method: "PUT", // 프로필 이미지 수정 API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileImageUrl: profileImageUrl, // S3에서 받은 URL
        }),
      });

      if (!res.ok) throw new Error("프로필 수정 실패");
      router.push("/mypage");
    } catch (error) {
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
            />
            <input
              type="file"
              ref={inputRef}
              onChange={onChangeFile}
              className="hidden"
              accept="image/*"
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
