export interface UploadImageResult {
  url: string;
  fileName: string;
}

export const uploadImageFile = async (
  file: File,
): Promise<UploadImageResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/uploads/image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("이미지 업로드에 실패했습니다.");
  }

  const data = (await res.json()) as { url: string; fileName: string };

  return {
    url: data.url,
    fileName: data.fileName,
  };
};
