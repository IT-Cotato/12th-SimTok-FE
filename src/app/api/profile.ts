import { apiInstance } from "./apiInstance";

export interface ProfileData {
  profileImageUrl: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
}

export const profileApi = {
  getProfile: async () => {
    const { data } = await apiInstance.get("/profile");
    return data;
  },

  getPresignedUrl: async (fileName: string) => {
    const { data } = await apiInstance.post("/image/presigned-url", {
      folder: "PROFILE",
      fileName,
    });
    return data;
  },

  uploadToS3: async (presignedUrl: string, file: File, contentType: string) => {
    const res = await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
    return res.ok;
  },

  updateProfile: async (imageUrl: string) => {
    const { data } = await apiInstance.put("/profile", {
      profileImageUrl: imageUrl,
    });
    return data;
  },

  createProfile: async (name: string, profileImageUrl: string | null) => {
    const { data } = await apiInstance.post("/profile", {
      name,
      profileImageUrl,
    });
    return data;
  },
};
