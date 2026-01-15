import { useRef } from "react";

import { UploadImageResult, uploadImage } from "@/utils/uploadImage.util";

interface UseImageUploadProps {
  onSelect: (result: UploadImageResult) => void;
  maxSizeMB?: number;
}

export const useImageUpload = ({
  onSelect,
  maxSizeMB,
}: UseImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = uploadImage(file, { maxSizeMB });
      onSelect(result);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }

    // 같은 파일 재선택 가능하게
    e.target.value = "";
  };

  return {
    inputRef,
    openFilePicker,
    onChangeFile,
  };
};
