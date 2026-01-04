"use client";

import React, { useRef } from "react";

import FullButton from "@/components/common/FullButton";

interface UploadAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlbum: (file: File) => void;
  onSelectDefault: () => void;
}

const UploadAlert = ({
  isOpen,
  onClose,
  onSelectAlbum,
  onSelectDefault,
}: UploadAlertProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleAlbumClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onSelectAlbum(file);
    onClose();
  };

  return (
    <div
      className="bg-dim-00 fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="mb-[32px] w-full max-w-[440px] px-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-neutral-11 text-h3 text-neutral-06 h-[48px] rounded-t-2xl px-[14px] py-[10px] text-center">
          프로필 사진 설정
        </div>

        <button
          type="button"
          className="bg-neutral-11 text-button-sb text-mint-01 flex h-[58px] w-full items-center justify-center px-[14px]"
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
          className="bg-neutral-11 text-button-sb text-mint-01 flex h-[58px] w-full items-center justify-center rounded-b-2xl px-[14px]"
          onClick={onSelectDefault}
        >
          기본 이미지 적용
        </button>

        <div className="mt-[6px] py-[10px]">
          <FullButton isActive onClick={onClose}>
            취소하기
          </FullButton>
        </div>
      </div>
    </div>
  );
};

export default UploadAlert;
