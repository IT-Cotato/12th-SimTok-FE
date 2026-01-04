"use client";

import ProfileIcon from "@/assets/onboarding_profile.svg";
import PhotoIcon from "@/assets/photo.svg";

type ProfileImagePickerProps = {
  imageUrl: string | null;
  onClick: () => void;
};

const ProfileImagePicker = ({ imageUrl, onClick }: ProfileImagePickerProps) => {
  return (
    <div
      className="relative flex h-[160px] w-[160px] cursor-pointer items-center justify-center"
      onClick={onClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="프로필 이미지"
          className="h-full w-full rounded-[36px] object-cover"
        />
      ) : (
        <ProfileIcon />
      )}

      <button
        type="button"
        className="absolute right-[16px] bottom-[16px] h-[32px] w-[32px]"
      >
        <PhotoIcon />
      </button>
    </div>
  );
};

export default ProfileImagePicker;
