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

  const handleImageUpload = async (file: File) => {
    try {
      // Presigned URL 발급 받기
      const preRes = await profileApi.getPresignedUrl(file.name);
      if (!preRes.success) throw new Error("URL 발급 실패");

      const { presignedUrl, imageUrl, contentType } = preRes.data;

      // S3에 파일 직접 업로드
      const isS3Success = await profileApi.uploadToS3(
        presignedUrl,
        file,
        contentType,
      );
      if (!isS3Success) throw new Error("S3 업로드 실패");

      // 백엔드 DB에 최종 S3 이미지 경로 저장
      const updateRes = await profileApi.updateProfile(imageUrl);

      if (updateRes.success) {
        setData(updateRes.data); // 프로필 정보 갱신 (이미지 포함)
      }
    } catch (error) {
      console.error("업로드 과정 중 에러:", error);
    } finally {
      handleCloseModal();
    }
  };

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
        onSelectAlbum={handleImageUpload}
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
