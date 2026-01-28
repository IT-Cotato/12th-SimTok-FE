"use client";

import Image from "next/image";

import ProfileIcon from "@/assets/onboarding_profile.svg";
import PhotoIcon from "@/assets/photo.svg";

type ProfileImagePickerProps = {
  imageUrl: string | null;
  onClick?: () => void;
  canEdit: boolean;
};

export const ProfileImagePicker = ({
  imageUrl,
  onClick,
  canEdit,
}: ProfileImagePickerProps) => {
  return (
    <div
      className={`relative flex items-center justify-center ${canEdit ? "cursor-pointer" : "cursor-default"} `}
      onClick={canEdit ? onClick : undefined}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          width={160}
          height={160}
          className="h-40 w-40 rounded-[36px] object-cover"
        />
      ) : (
        <ProfileIcon className="h-40 w-40" />
      )}

      {canEdit && (
        <button
          type="button"
          className="absolute top-[120px] left-[129.5px] z-10 cursor-pointer object-cover"
        >
          <PhotoIcon className="h-[45px] w-[45px]" />
        </button>
      )}
    </div>
  );
};
