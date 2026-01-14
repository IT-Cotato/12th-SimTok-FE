"use client";

import { useEffect, useState } from "react";

import type { UserProfile } from "@/types/user.type";

// ✅ 여기서 기본 프로필 선언
const DEFAULT_PROFILE: UserProfile = {
  id: "temp",
  imageUrl: null,
  nickname: "닉네임",
  name: "이름",
  phone: "010-1234-5678",
  birth: "1990.01.01",
};

type UseUserProfileResult = {
  profile: UserProfile;
  isLoading: boolean;
  error: Error | null;
};

export function useUserProfile(): UseUserProfileResult {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setIsLoading(true);

        // TODO: 나중에 실제 API로 교체
        const data = DEFAULT_PROFILE;
        setProfile(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, isLoading, error };
}
