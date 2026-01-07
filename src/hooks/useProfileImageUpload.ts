"use client";

import { useState } from "react";

//import { uploadImageFile } from "@/utils/upload";

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

  const cancelUpload = () => {
    setIsLoading(false);
  };

  // const uploadImage = async (file: File) => {
  //   try {
  //     setIsLoading(true);
  //     const { url } = await uploadImageFile(file);
  //     setProfileImage(url);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const resetImage = () => {
    setProfileImage(null);
  };

  // return {
  //   profileImage,
  //   isLoading,
  //   uploadImage,
  //   resetImage,
  // };
  return {
    profileImage,
    isLoading,
    uploadImage,
    resetImage,
    cancelUpload,
  } as const;
};
