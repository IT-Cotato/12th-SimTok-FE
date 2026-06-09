import { getImagePresignedUrl } from "@/app/api/profile/profile.api";

export type UploadFolderType =
  | "DIARY"
  | "PROFILE"
  | "CHALLENGE"
  | "CHAT"
  | "ATTACHMENTS";

export const uploadToS3 = async (
  file: File,
  folder: UploadFolderType = "PROFILE",
) => {
  const response = await getImagePresignedUrl(folder, file.name);

  if (!response?.data) throw new Error("Presigned URL 발급 실패");

  const { presignedUrl, imageUrl } = response.data;

  const uploadRes = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  if (!uploadRes.ok) throw new Error("S3 업로드 실패");

  return imageUrl;
};
