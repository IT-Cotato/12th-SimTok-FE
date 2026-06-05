"use client";

import Image from "next/image";

import { useState } from "react";

import ProfileIcon from "@/assets/onboarding_profile.svg";
import PhotoIcon from "@/assets/photo.svg";

type ProfileImagePickerProps = {
  imageUrl: string | null;
  onClick?: () => void;
  canEdit: boolean;
  width?: number;
  height?: number;
  radius?: number;
};

export const ProfileImagePicker = ({
  imageUrl,
  onClick,
  canEdit = true,
  radius = 36,
  width = 160,
  height = 160,
}: ProfileImagePickerProps) => {
  const [imgError, setImgError] = useState(false);
  const [prevImageUrl, setPrevImageUrl] = useState(imageUrl);

  if (imageUrl !== prevImageUrl) {
    setPrevImageUrl(imageUrl);
    setImgError(false);
  }

  return (
    <div
      className={`relative ${canEdit ? "cursor-pointer" : "cursor-default"} `}
      onClick={canEdit ? onClick : undefined}
    >
      {imageUrl && !imgError ? (
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          width={width}
          height={height}
          style={{ borderRadius: radius, width, height }}
          className="object-cover"
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <ProfileIcon style={{ width, height }} />
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
