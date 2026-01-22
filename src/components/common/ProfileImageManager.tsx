"use client";

import { useEffect, useState } from "react";

import LoadingModal from "@/components/common/LoadingModal";
import UploadButton from "@/components/onboarding/UploadButton";

import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

import { ProfileWrapper } from "../common/ProfileWrapper";

interface ProfileImageManagerProps {
  initialImageUrl: string;
  name: string;
  onChangeName?: (name: string) => void;
  onStateChange?: (isBusy: boolean) => void;
  canEdit?: boolean;
}

export const ProfileImageManager = ({
  initialImageUrl,
  name,
  onChangeName = () => {},
  onStateChange,
  canEdit = false,
}: ProfileImageManagerProps) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { profileImage, isLoading, uploadImage, resetImage, cancelUpload } =
    useProfileImageUpload();

  useEffect(() => {
    onStateChange?.(isUploadOpen || isLoading);
  }, [isUploadOpen, isLoading, onStateChange]);

  const currentImage = profileImage ?? initialImageUrl;

  return (
    <>
      <ProfileWrapper
        imageUrl={currentImage}
        name={name}
        onChangeName={onChangeName}
        onProfileClick={canEdit ? () => setIsUploadOpen(true) : undefined}
        canEdit={canEdit}
        placeholder="닉네임을 입력해주세요"
      />

      {canEdit && (
        <>
          <UploadButton
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            onSelectAlbum={async file => {
              await uploadImage(file);
              setIsUploadOpen(false);
            }}
            onSelectDefault={() => {
              resetImage();
              setIsUploadOpen(false);
            }}
          />
          <LoadingModal
            isOpen={isLoading}
            title="프로필 사진 업로드 중"
            confirmLabel="취소하기"
            isLoading
            onClose={cancelUpload}
          />
        </>
      )}
    </>
  );
};
