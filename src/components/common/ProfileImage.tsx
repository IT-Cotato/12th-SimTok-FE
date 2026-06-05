"use client";

import Image from "next/image";

interface ProfileImageProps {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md";
}

export const ProfileImage = ({
  src,
  alt = "프로필 이미지",
  size = "sm",
}: ProfileImageProps) => {
  const defaultImage = "/images/onboarding_profile.svg";

  const sizeClasses = {
    sm: "h-[55px] w-[55px]",
    md: "h-18 w-18",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${sizeClasses[size]}`}
    >
      <Image
        src={src || defaultImage}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
};
