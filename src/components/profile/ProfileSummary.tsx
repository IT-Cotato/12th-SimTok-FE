"use client";

import { useEffect, useState } from "react";

import DateIcon from "@/assets/date.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import LoadingModal from "@/components/common/LoadingModal";
import { InfoRow } from "@/components/mypage/InfoRow";
import UploadButton from "@/components/onboarding/UploadButton";

import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

import type { UserProfile } from "@/types/user.type";

import { ProfileWrapper } from "../common/ProfileWrapper";

interface ProfileSummaryProps {
  userProfileData: UserProfile | null;
  onModalStateChange?: (isOpen: boolean) => void;
}

export const ProfileSummary = ({
  userProfileData,
  onModalStateChange,
}: ProfileSummaryProps) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editedNickname, setEditedNickname] = useState<string | null>(null);

  const { profileImage, isLoading, uploadImage, resetImage, cancelUpload } =
    useProfileImageUpload();

  useEffect(() => {
    onModalStateChange?.(isUploadOpen || isLoading);
  }, [isUploadOpen, isLoading, onModalStateChange]);

  if (!userProfileData) return null;

  const {
    profileImg: originalProfileImg,
    userName,
    phoneNumber,
    birthDate,
    nickname: originalNickname,
  } = userProfileData;

  const handleCloseModal = () => {
    setIsUploadOpen(false);
  };

  const currentProfileImage = profileImage ?? originalProfileImg;
  const currentNickname = editedNickname ?? originalNickname;

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center">
      <ProfileWrapper
        key={originalNickname}
        imageUrl={currentProfileImage}
        name={currentNickname}
        onChangeName={setEditedNickname}
        onProfileClick={() => setIsUploadOpen(true)}
        canEdit
        placeholder="닉네임을 입력해주세요"
      />

      <div className="mt-[68px] flex w-full flex-col gap-2.5 px-4 py-2.5">
        <InfoRow Icon={ProfileIcon} value={userName} />
        <InfoRow Icon={DateIcon} value={birthDate} />
        <InfoRow Icon={PhoneIcon} value={phoneNumber} />
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
        title="프로필 사진 업로드 중"
        confirmLabel="취소하기"
        isLoading
        backdrop="blur"
        onClose={cancelUpload}
      />
    </div>
  );
};
