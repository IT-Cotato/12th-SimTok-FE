"use client";

import { useState } from "react";

export const useProfileImageUpload = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file: File) => {
    setIsLoading(true);

    await new Promise(res => setTimeout(res, 2000));

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    setIsLoading(false);
  };

  const resetImage = () => {
    setProfileImage(null);
  };

  return {
    profileImage,
    isLoading,
    uploadImage,
    resetImage,
  };
};
