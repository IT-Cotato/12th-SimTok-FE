export interface ProfileData {
  profileImageUrl: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
}

export const profileApi = {
  getProfile: async () => {
    const res = await fetch("/api/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
};
