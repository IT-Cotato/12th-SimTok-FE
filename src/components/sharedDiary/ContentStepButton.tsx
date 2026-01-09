import { useState } from "react";

import { GalleryAssets } from "@/assets/GalleryIcon";

import { useImageUpload } from "@/hooks/useImageUpload";

import { InfoMessage } from "../dailyRecord/InfoMessage";
import { WritePage } from "./WritePage";

interface WriteStepButtonProps {
  onSelectImage: (file: File) => void;
  showInfoMessage: boolean;
  text: string;
  onChangeText: (value: string) => void;
}
export const WriteStepButton = ({
  onSelectImage,
  showInfoMessage,
  text,
  onChangeText,
}: WriteStepButtonProps) => {
  const { inputRef, openFilePicker, onChangeFile } = useImageUpload({
    onSelect: ({ file }) => {
      onSelectImage(file);
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
        className={`flex justify-between bg-white px-4 ${!showInfoMessage && "py-5"}`}
      >
        <button
          className="bg-neutral-11 border-mint-01 h-[95px] max-w-[196px] flex-1 cursor-pointer rounded-2xl border border-solid px-[10px] py-[10px] pt-[20px]"
          onClick={openFilePicker}
        >
          <div className="inline-flex items-center justify-center rounded-2xl bg-white p-[10px]">
            <GalleryAssets />
          </div>
          <p>사진추가하기</p>
        </button>
        <button
          className="bg-neutral-11 border-mint-01 h-[95px] max-w-[196px] flex-1 cursor-pointer rounded-2xl border border-solid px-[10px] py-[10px] pt-[20px]"
          onClick={() => setOpenTextPage(true)}
        >
          <div className="text-sub2-sb inline-flex items-center justify-center rounded-2xl bg-white p-[10px] text-black">
            TEXT
          </div>
          <p>글쓰기</p>
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
