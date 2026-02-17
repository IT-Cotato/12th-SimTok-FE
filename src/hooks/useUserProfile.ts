"use client";

import { useEffect, useState } from "react";

import { profileApi } from "@/app/api/profile";

import type { UserProfile } from "@/types/user.type";

interface UseUserProfileResult {
  userProfileData: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
}

export const useUserProfile = (): UseUserProfileResult => {
  const [userProfileData, setUserProfileData] = useState<UserProfile | null>(
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

  //       await new Promise(resolve => setTimeout(resolve, 500));

  //       const data = myProfileMock as UserProfile;
  //       setUserProfileData(data);
  //     } catch (err) {
  //       setError(err as Error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProfileData();
  // }, []);

  return { userProfileData, isLoading, error };
};
