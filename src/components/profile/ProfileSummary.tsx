"use client";

import { useEffect, useState } from "react";

import { type ProfileData, profileApi } from "@/app/api/profile";

import DateIcon from "@/assets/date.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import LoadingModal from "@/components/common/LoadingModal";
import { InfoRow } from "@/components/mypage/InfoRow";
import UploadButton from "@/components/onboarding/UploadButton";

import { useImageUpload } from "@/hooks/useImageUpload";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

import { ProfileWrapper } from "../common/ProfileWrapper";

export const ProfileSummary = ({
  userProfileData,
  onModalStateChange,
}: {
  userProfileData?: ProfileData | null;
  onModalStateChange?: (open: boolean) => void;
}) => {
  const [data, setData] = useState<ProfileData | null>(userProfileData || null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { profileImage, isLoading, resetImage, cancelUpload } =
    useProfileImageUpload();

  const { inputRef, openFilePicker, onChangeFile, isUploading } =
    useImageUpload({
      folder: "PROFILE",
      onSelect: url => {
        // blob URL(미리보기)이 아닌 실제 S3 URL일 때만 서버 업데이트
        if (!url.startsWith("blob:")) {
          handleUpdateProfile(url);
        }
      },
    });

  useEffect(() => {
    onModalStateChange?.(isUploadOpen || isLoading);
  }, [isUploadOpen, isLoading, onModalStateChange]);

  useEffect(() => {
    if (userProfileData) {
      setData(userProfileData);
    }
  }, [userProfileData]);

  useEffect(() => {
    if (!userProfileData) {
      const loadData = async () => {
        try {
          const result = await profileApi.getProfile();
          if (result.success) setData(result.data);
        } catch (error) {
          console.error("데이터 조회 실패:", error);
        }
      };
      loadData();
    }
  }, [userProfileData]);

  const handleUpdateProfile = async (imageUrl: string) => {
    try {
      const result = await profileApi.updateProfile(imageUrl);
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("프로필 갱신 실패:", error);
    } finally {
      setIsUploadOpen(false);
    }
  };

  const handleCloseModal = () => setIsUploadOpen(false);
  const handleDefaultImage = () => handleUpdateProfile("");

  if (!data) return null;

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center">
      <ProfileWrapper
        imageUrl={data.profileImageUrl}
        onProfileClick={() => setIsUploadOpen(true)}
        canEdit
        showInput={false}
      />

      <div className="mt-[35px] flex w-full flex-col gap-2.5 px-4 py-2.5">
        <InfoRow Icon={ProfileIcon} value={data.name} />
        <InfoRow Icon={DateIcon} value={data.birthDate} />
        <InfoRow Icon={PhoneIcon} value={data.phoneNumber} />
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={onChangeFile}
        accept="image/*"
        className="hidden"
      />

      <UploadButton
        isOpen={isUploadOpen}
        onClose={handleCloseModal}
        onSelectAlbum={openFilePicker}
        onSelectDefault={handleDefaultImage}
      />

      <LoadingModal
        isOpen={isLoading || isUploading}
        title="업로드 중"
        confirmLabel="취소하기"
        isLoading
        backdrop="blur"
        onClose={cancelUpload}
      />
    </div>
  );
};
