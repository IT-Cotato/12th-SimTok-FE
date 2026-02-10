"use client";

import { useRef, useState } from "react";

import CameraIcon from "@/assets/camera.svg";
import ImageIcon from "@/assets/image.svg";
import MicIcon from "@/assets/mic.svg";
import SendIcon from "@/assets/send.svg";

import { VoiceInputOverlay } from "./VoiceInputOverlay";

interface ChatFieldProps {
  value: string;
  onChange: (val: string) => void;
  onSend?: (msg: string) => void;
  onImageUpload?: (file: File) => void;
  isDimmed?: boolean;
}

export const ChatField = ({
  value,
  onChange,
  onSend,
  onImageUpload,
  isDimmed,
}: ChatFieldProps) => {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isNotEmpty = value.trim().length > 0;

  const handleSend = () => {
    if (!isNotEmpty) return;
    onSend?.(value);
    onChange(""); // 전송 후 부모 상태 초기화
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload?.(file);
      e.target.value = "";
    }
  };

  return (
    <>
      <div className="flex w-full justify-center px-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          className={`flex min-h-[50px] w-full max-w-[440px] items-center rounded-2xl px-[5px] transition-colors ${isDimmed ? "bg-neutral-04" : "bg-neutral-10"}`}
        >
          <div className="flex flex-shrink-0 items-center justify-center">
            <CameraIcon
              className={`h-10 w-10 transition-colors ${
                isNotEmpty ? "text-neutral-09" : "text-neutral-06"
              }`}
            />
          </div>

          <div className="ml-[10px] flex flex-1 items-center">
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder="대화를 보내보세요"
              className="text-sub1-r text-neutral-01 placeholder:text-neutral-07 w-full bg-transparent focus:outline-none"
              onKeyDown={e => {
                if (e.key === "Enter") handleSend();
              }}
            />
          </div>

          <div className="flex flex-shrink-0 items-center justify-end">
            {isNotEmpty ? (
              <button
                type="button"
                aria-label="메시지 전송"
                className="flex h-10 w-14 items-center justify-center transition-transform active:scale-95"
                onClick={handleSend}
              >
                <SendIcon className="h-full w-full object-contain" />
              </button>
            ) : (
              <div className="flex items-center">
                <button
                  type="button"
                  aria-label="이미지 첨부"
                  onClick={handleImageClick}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center"
                >
                  <ImageIcon className="text-neutral-02 h-7 w-7" />
                </button>
                <button
                  type="button"
                  aria-label="음성 녹음"
                  onClick={() => setIsVoiceOpen(true)}
                  className="flex h-8 w-8 items-center justify-center"
                >
                  <MicIcon className="text-neutral-02 h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isVoiceOpen && (
        <VoiceInputOverlay onClose={() => setIsVoiceOpen(false)} />
      )}
    </>
  );
};
