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
      className="relative flex h-40 w-40 cursor-pointer items-center justify-center"
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
        className="absolute top-[120px] left-[129.5px] cursor-pointer object-cover"
      >
        <PhotoIcon className="h-[40px] w-[40px]" />
      </button>
    </div>
  );
};

export default ProfileImagePicker;
