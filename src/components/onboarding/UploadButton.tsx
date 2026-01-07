"use client";

import React, { useRef } from "react";

import FullButton from "@/components/common/FullButton";

interface UploadButtonProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlbum: (file: File) => void;
  onSelectDefault: () => void;
}

const UploadButton = ({
  isOpen,
  onClose,
  onSelectAlbum,
  onSelectDefault,
}: UploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleAlbumClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onSelectAlbum(file);
    e.target.value = "";
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: "rgba(36, 38, 40, 0.3)" }}
      onClick={onClose}
    >
      <div
        className="mb-[42px] w-full max-w-[440px] px-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-neutral-11 overflow-hidden rounded-2xl">
          <div className="text-h3 text-neutral-06 h-[48px] px-[14px] py-[10px] text-center">
            프로필 사진 설정
          </div>

          <button
            type="button"
            className="bg-neutral-11 text-button-sb text-mint-01 flex h-[58px] w-full cursor-pointer items-center justify-center px-[14px]"
            onClick={handleAlbumClick}
          >
            앨범에서 사진 선택
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="bg-neutral-11 text-button-sb text-mint-01 flex h-[58px] w-full cursor-pointer items-center justify-center px-[14px]"
            onClick={onSelectDefault}
          >
            기본 이미지 적용
          </button>
        </div>

        <div className="mt-[6px]">
          <FullButton isActive onClick={onClose}>
            취소하기
          </FullButton>
        </div>
      </div>
    </div>
  );
};

export default UploadButton;
