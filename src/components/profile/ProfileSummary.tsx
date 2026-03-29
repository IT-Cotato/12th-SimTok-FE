"use client";

import { useEffect, useMemo, useState } from "react";

import { type ProfileData, profileApi } from "@/app/api/profile";

import DateIcon from "@/assets/date.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import LoadingModal from "@/components/common/LoadingModal";
import { InfoRow } from "@/components/mypage/InfoRow";
import UploadButton from "@/components/onboarding/UploadButton";

import { useImageUpload } from "@/hooks/useImageUpload";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

import { ApiResponse } from "@/types/common";

import { ProfileWrapper } from "../common/ProfileWrapper";

export const ProfileSummary = ({
  userProfileData,
  onModalStateChange,
  onImageUrlChange,
}: {
  userProfileData?: ProfileData | null;
  onModalStateChange?: (open: boolean) => void;
  onImageUrlChange?: (url: string) => void;
}) => {
  const [fetchedData, setFetchedData] = useState<ProfileData | null>(null);
  const [overrideImageUrl, setOverrideImageUrl] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { isLoading, cancelUpload } = useProfileImageUpload();

  const { uploadFile, isUploading } = useImageUpload({
    folder: "PROFILE",
    onSelect: url => {
      // blob URL은 미리보기용으로 바로 표시
      setOverrideImageUrl(url);
      if (!url.startsWith("blob:")) {
        // S3 URL이 확정되면 부모에 알림
        onImageUrlChange?.(url);
        setIsUploadOpen(false);
      }
    },
  });

  const baseData = userProfileData ?? fetchedData;
  const data = useMemo<ProfileData | null>(() => {
    if (!baseData) return null;
    if (overrideImageUrl !== null)
      return { ...baseData, profileImageUrl: overrideImageUrl };
    return baseData;
  }, [baseData, overrideImageUrl]);

  useEffect(() => {
    onModalStateChange?.(isUploadOpen || isLoading);
  }, [isUploadOpen, isLoading, onModalStateChange]);

  useEffect(() => {
    if (!userProfileData) {
      const loadData = async () => {
        try {
          const result = await profileApi.getProfile();
          if (result.success) setFetchedData(result.data);
        } catch (error) {
          console.error("데이터 조회 실패:", error);
        }
      };
      loadData();
    }
  }, [userProfileData]);

  const handleCloseModal = () => setIsUploadOpen(false);
  const handleDefaultImage = () => {
    setOverrideImageUrl("");
    onImageUrlChange?.("");
    setIsUploadOpen(false);
  };

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

      <UploadButton
        isOpen={isUploadOpen}
        onClose={handleCloseModal}
        onSelectAlbum={uploadFile}
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
