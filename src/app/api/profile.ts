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

  // S3 Presigned URL 발급 요청
  getPresignedUrl: async (fileName: string) => {
    const res = await fetch("/api/image/presigned-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder: "PROFILE", fileName }),
    });
    return res.json();
  },
  // S3 버킷에 실제 이미지 파일 업로드
  uploadToS3: async (presignedUrl: string, file: File, contentType: string) => {
    const res = await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
    return res.ok;
  },
  updateProfile: async (imageUrl: string) => {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileImageUrl: imageUrl }),
    });
    return res.json();
  },

  createProfile: async (name: string, profileImageUrl: string | null) => {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        profileImageUrl,
      }),
    });
    return res.json();
  },
};
