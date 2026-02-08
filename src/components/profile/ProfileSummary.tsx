"use client";

import { useEffect, useState } from "react";

import { type ProfileData, profileApi } from "@/app/api/profile";

import DateIcon from "@/assets/date.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import LoadingModal from "@/components/common/LoadingModal";
import { InfoRow } from "@/components/mypage/InfoRow";
import UploadButton from "@/components/onboarding/UploadButton";

import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

import { ProfileWrapper } from "../common/ProfileWrapper";

export const ProfileSummary = ({
  onModalStateChange,
}: {
  onModalStateChange?: (open: boolean) => void;
}) => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { profileImage, isLoading, uploadImage, resetImage, cancelUpload } =
    useProfileImageUpload();

  useEffect(() => {
    onModalStateChange?.(isUploadOpen || isLoading);
  }, [isUploadOpen, isLoading, onModalStateChange]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await profileApi.getProfile();
        if (result.success) setData(result.data);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      }
    };
    loadData();
  }, []);

  if (!data) return null;

  const handleCloseModal = () => setIsUploadOpen(false);
  const currentProfileImage = profileImage ?? data.profileImageUrl;

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center">
      <ProfileWrapper
        imageUrl={currentProfileImage}
        onProfileClick={() => setIsUploadOpen(true)}
        canEdit
        showInput={false}
      />

      <div className="mt-[35px] flex w-full flex-col gap-2.5 px-4 py-2.5">
        <InfoRow Icon={ProfileIcon} value={data.name} />
        <InfoRow Icon={DateIcon} value={data.birthDate} />
        <InfoRow Icon={PhoneIcon} value={data.phoneNumber} />
      </div>

      <UploadButton
        isOpen={isUploadOpen}
        onClose={handleCloseModal}
        onSelectAlbum={async file => {
          try {
            await uploadImage(file);
            handleCloseModal();
          } catch (error) {
            console.error("이미지 업로드 실패:", error);
          }
        }}
        onSelectDefault={() => {
          resetImage();
          handleCloseModal();
        }}
      />

      <LoadingModal
        isOpen={isLoading}
        title="업로드 중"
        confirmLabel="취소하기"
        isLoading
        backdrop="blur"
        onClose={cancelUpload}
      />
    </div>
  );
};
