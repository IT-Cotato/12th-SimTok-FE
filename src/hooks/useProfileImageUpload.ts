"use client";

import { useEffect, useRef, useState } from "react";

export const useProfileImageUpload = () => {
  const DEFAULT_IMAGE_PATH = "/assets/onboarding_profile.svg";
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const objectUrlRef = useRef<string | null>(null);

  const revokeCurrentUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const uploadImage = async (file: File) => {
    setIsLoading(true);
    try {
      revokeCurrentUrl(); //이전 URL 정리

      const blobUrl = URL.createObjectURL(file);
      objectUrlRef.current = blobUrl;
      setProfileImage(blobUrl);
    } finally {
      setIsLoading(false);
    }
  };

  const resetImage = () => {
    revokeCurrentUrl();
    setProfileImage(DEFAULT_IMAGE_PATH);
  };

  const cancelUpload = () => {
    revokeCurrentUrl();
    setProfileImage(null);
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      revokeCurrentUrl();
    };
  }, []);

  return {
    profileImage,
    isLoading,
    uploadImage,
    resetImage,
    cancelUpload,
  };
};
