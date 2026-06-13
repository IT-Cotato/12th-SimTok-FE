import { MyProfile } from "@/types/myProfile.type";

import { apiInstance } from "../apiInstance";

export const getMyProfile = async (): Promise<MyProfile> => {
  const { data } = await apiInstance.get("/profile");
  return data.data;
};

export const updateMyProfile = async (profileImageUrl: string) => {
  const { data } = await apiInstance.put("/profile", { profileImageUrl });
  return data;
};

export const createProfile = async (
  name: string,
  profileImageUrl: string | null,
) => {
  const { data } = await apiInstance.post("/profile", {
    name,
    profileImageUrl,
  });
  return data;
};

export const getImagePresignedUrl = async (
  folder: string,
  fileName: string,
) => {
  const { data } = await apiInstance.post("/image/presigned-url", {
    folder,
    fileName,
  });
  return data;
};

export const uploadToS3 = async (
  presignedUrl: string,
  file: File,
  contentType: string,
): Promise<boolean> => {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
  });
  return res.ok;
};
