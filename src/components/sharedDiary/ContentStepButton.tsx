import { useState } from "react";

import { GalleryAssets } from "@/assets/GalleryIcon";

import { useImageUpload } from "@/hooks/useImageUpload";

import { InfoMessage } from "../dailyRecord/InfoMessage";
import { WritePage } from "./WritePage";

interface WriteStepButtonProps {
  onSelectImage: (imageUrl: string) => void;
  showInfoMessage: boolean;
  text: string;
  onChangeText: (value: string) => void;
  hasText?: boolean;
  hasImage?: boolean;
}
export const WriteStepButton = ({
  onSelectImage,
  showInfoMessage,
  text,
  onChangeText,
  hasText,
  hasImage,
}: WriteStepButtonProps) => {
  const { inputRef, openFilePicker, onChangeFile, isUploading } =
    useImageUpload({
      onSelect: (imageUrl: string) => {
        onSelectImage(imageUrl); // 업로드 완료된 S3 URL을 부모에게 전달
      },
      maxSizeMB: 10,
    });

  const [openTextPage, setOpenTextPage] = useState(false);

  return (
    <section className="relative flex flex-col gap-[7.8px]">
      {showInfoMessage && (
        <div className="px-4">
          <InfoMessage
            text="사진이나 글을 추가해서 일기를 꾸며보세요!"
            triangleUp={false}
          />
        </div>
      )}

      <div
        className={`flex justify-between gap-2 bg-white px-4 ${!showInfoMessage && "py-5"}`}
      >
        <button
          disabled={hasImage || isUploading}
          className={`bg-neutral-11 ${hasImage || isUploading ? "cursor-not-allowed" : "border-mint-01 cursor-pointer border border-solid"} flex h-[95px] max-w-[196px] flex-1 flex-col items-center gap-1 rounded-2xl px-[10px] py-[10px] pt-[20px]`}
          onClick={openFilePicker}
        >
          <div className="inline-flex items-center justify-center rounded-2xl bg-white p-[10px] shadow-[0_0_14px_0_rgba(0,0,0,0.05)]">
            <GalleryAssets />
          </div>
          <p
            className={`text-sub2-sb ${hasImage || isUploading ? "text-neutral-07" : "text-green-01"}`}
          >
            사진추가하기
          </p>
        </button>
        <button
          className={`bg-neutral-11 ${!hasText && "border-mint-01 border border-solid"} flex h-[95px] max-w-[196px] flex-1 cursor-pointer flex-col items-center gap-1 rounded-2xl px-[10px] py-[10px] pt-[20px]`}
          onClick={() => setOpenTextPage(true)}
        >
          <div className="text-sub2-sb inline-flex h-[35px] w-[59px] items-center justify-center rounded-2xl bg-white px-[10px] text-black shadow-[0_0_14px_0_rgba(0,0,0,0.05)]">
            TEXT
          </div>
          <p
            className={`text-sub2-sb ${hasText ? "text-neutral-07" : "text-green-01"}`}
          >
            글쓰기
          </p>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChangeFile}
      />
      {openTextPage && (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/0">
          <div className="h-full w-full max-w-[440px] bg-white">
            <WritePage
              onClose={() => setOpenTextPage(false)}
              text={text}
              onChangeText={onChangeText}
            />
          </div>
        </div>
      )}
    </section>
  );
};
