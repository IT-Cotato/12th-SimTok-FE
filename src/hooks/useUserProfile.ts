"use client";

import { useEffect, useState } from "react";

import { profileApi } from "@/app/api/profile";

import type { MyProfile } from "@/types/myProfile.type";

interface UseUserProfileResult {
  userProfileData: MyProfile | null;
  isLoading: boolean;
  error: Error | null;
}

export const useUserProfile = (): UseUserProfileResult => {
  const [userProfileData, setUserProfileData] = useState<MyProfile | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const result = await profileApi.getProfile();
        if (result.success) {
          setUserProfileData(result.data);
        } else {
          throw new Error(result.message || "프로필 로드 실패");
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return { userProfileData, isLoading, error };
};
