export type UploadFolderType =
  | "DIARY"
  | "PROFILE"
  | "CHALLENGE"
  | "CHAT"
  | "CHAT/attachments";

export const uploadToS3 = async (
  file: File,
  folder: UploadFolderType = "DIARY",
) => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch("/api/image/presigned-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      folder: folder,
    }),
  });

  if (!res.ok) {
    const errorDetail = await res.json().catch(() => ({}));
    console.error("서버 응답 에러 상세:", errorDetail); // 서버가 보낸 'reasons' 확인 가능
    throw new Error(`Presigned URL 발급 실패: ${res.status}`);
  }

  const response = await res.json();
  const { presignedUrl, imageUrl } = response.data;

  const uploadRes = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });

  if (!uploadRes.ok) throw new Error("S3 업로드 실패");

  return imageUrl;
};
