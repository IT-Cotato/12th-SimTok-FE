"use client";

import Image from "next/image";

import ProfileIcon from "@/assets/onboarding_profile.svg";
import PhotoIcon from "@/assets/photo.svg";

type ProfileImagePickerProps = {
  imageUrl: string | null;
  onClick: () => void;
};

const ProfileImagePicker = ({ imageUrl, onClick }: ProfileImagePickerProps) => {
  return (
    <div
      className="relative flex cursor-pointer items-center justify-center"
      onClick={onClick}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          className="h-full w-full rounded-[36px] object-cover"
        />
      ) : (
        <ProfileIcon className="h-40 w-40" />
      )}

      <button
        type="button"
        className="absolute top-[120px] left-[129.5px] cursor-pointer object-cover"
      >
        <PhotoIcon className="h-[45px] w-[45px]" />
      </button>
    </div>
  );
};

export default ProfileImagePicker;
