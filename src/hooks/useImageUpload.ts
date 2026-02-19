import { useRef, useState } from "react";

import { UploadFolderType, uploadToS3 } from "@/utils/uploadImage.util";

interface useImageUploadProps {
  onSelect: (imageUrl: string) => void;
  folder?: UploadFolderType;
}

export const useImageUpload = ({ onSelect, folder }: useImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempPreviewUrl = URL.createObjectURL(file);
    onSelect(tempPreviewUrl);

    try {
      setIsUploading(true);
      // S3 업로드 실행
      const imageUrl = await uploadToS3(file, folder);
      onSelect(imageUrl); // 부모에게 최종 S3 URL 전달
    } catch (error) {
      console.error(error instanceof Error ? error.message : "업로드 실패");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return {
    inputRef,
    openFilePicker: () => inputRef.current?.click(),
    onChangeFile,
    isUploading,
  };
};
