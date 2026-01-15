export interface UploadImageOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
}

export interface UploadImageResult {
  file: File;
  previewUrl: string;
}

export const uploadImage = (
  file: File,
  options: UploadImageOptions = {},
): UploadImageResult => {
  const {
    maxSizeMB = 5,
    allowedTypes = ["image/jpeg", "image/png", "image/webp"],
  } = options;

  // 타입 검사
  if (!allowedTypes.includes(file.type)) {
    throw new Error("지원하지 않는 이미지 형식입니다.");
  }

  // 용량 검사
  const maxSize = maxSizeMB * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`이미지 용량은 ${maxSizeMB}MB 이하만 가능합니다.`);
  }

  return {
    file,
    previewUrl: URL.createObjectURL(file),
  };
};
