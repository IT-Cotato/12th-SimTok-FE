"use client";
import Image from "next/image";

import { useState } from "react";

import DateIcon from "@/assets/date.svg";
import OnboardingProfileIcon from "@/assets/onboarding_profile.svg";
import PhoneIcon from "@/assets/phone.svg";
import PhotoIcon from "@/assets/photo.svg";
import ProfileIcon from "@/assets/profile.svg";

import LoadingModal from "@/components/common/LoadingModal";
import { InfoRow } from "@/components/mypage/InfoRow";
import ProfileImagePicker from "@/components/onboarding/ProfileImagePicker";
import UploadButton from "@/components/onboarding/UploadButton";

import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";

import type { UserProfile } from "@/types/user.type";

interface ProfileSummaryProps {
  userProfileData: UserProfile | null;
}

export const ProfileSummary = ({ userProfileData }: ProfileSummaryProps) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { profileImage, isLoading, uploadImage, resetImage, cancelUpload } =
    useProfileImageUpload();

  if (!userProfileData) return null;

  const {
    profileImg: originalProfileImg,
    nickname,
    userName,
    phoneNumber,
    birthDate,
  } = userProfileData;
  const currentProfileImage = profileImage ?? originalProfileImg;

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center">
      <div className="mt-[11px] flex flex-col items-center">
        <ProfileImagePicker
          imageUrl={currentProfileImage}
          onClick={() => setIsUploadOpen(true)}
        />

        <div className="border-mint-01 mt-4 rounded-2xl border px-4 py-2">
          <span className="text-d3 text-neutral-01">{nickname}</span>
        </div>
      </div>

      <div className="mt-[68px] flex w-full flex-col gap-2.5 px-4 py-2.5">
        <InfoRow Icon={ProfileIcon} value={userName} />
        <InfoRow Icon={DateIcon} value={birthDate} />
        <InfoRow Icon={PhoneIcon} value={phoneNumber} />
      </div>

      <UploadButton
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSelectAlbum={async file => {
          try {
            await uploadImage(file);
            setIsUploadOpen(false);
          } catch (error) {
            console.error("이미지 업로드 실패:", error);
          }
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
        backdrop="blur"
        onClose={cancelUpload}
      />
    </div>
  );
};
