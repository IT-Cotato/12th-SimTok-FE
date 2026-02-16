import { useRef, useState } from "react";

import { SendButton } from "@/assets/SendButton";
import CameraIcon from "@/assets/camera.svg";
import HeartfillIcon from "@/assets/heart-fill.svg";
import HeartBlankIcon from "@/assets/heart.svg";

interface MessageInputProps {
  value?: string;
  onChange?: (val: string) => void;
  isChatting?: boolean;
  isDimmed?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onSend?: (message: string) => void;
  onImageUpload?: (file: File) => void;
  className?: string;
  blackMode?: boolean;
}

export const MessageInput = ({
  value = "",
  onChange,
  isChatting = false,
  isDimmed = false,
  onFocus,
  onSend,
  onImageUpload,
  blackMode = false,
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasText = Boolean(value);

  const sendMessage = () => {
    if (!hasText) return;
    onSend?.(text.trim());
    onChange?.("");
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div
      className={`focus:border-mint-01 relative flex h-[50px] w-full items-center justify-between rounded-2xl border border-solid border-transparent pr-[5px] pl-[15px] transition-colors focus:outline-none ${
        isDimmed ? "bg-neutral-04" : "bg-neutral-10"
      } `}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex gap-[10px]">
        {isChatting ? (
          <>
            <button
              onClick={e => {
                e.stopPropagation();
                handleCameraClick();
              }}
              className="bg-neutral-06 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full"
            >
              <CameraIcon className="h-[18px] w-5 text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" // 화면에서 숨김
            />
          </>
        ) : (
          <button
            className="cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              setHeartClicked(prev => !prev);
            }}
          >
            {heartClicked ? (
              <HeartfillIcon className="text-mint-01 mr-[3px] h-[26px] w-[26px]" />
            ) : (
              <HeartBlankIcon
                className={`${blackMode ? "text-neutral-06" : "text-neutral-04"} mr-[3px] h-[26px] w-[26px]`}
              />
            )}
          </button>
        )}
        <input
          ref={inputRef}
          className={`text-sub1-r ${blackMode ? "text-neutral-05" : "text-neutral-01"} mr-2 w-full flex-1 focus:outline-none`}
          type="text"
          value={value}
          onChange={e => {
            onChange?.(e.target.value);
          }}
          onFocus={onFocus}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={isChatting ? "대화를 보내보세요" : "댓글을 달아보세요"}
          onKeyDown={e => {
            if (e.key === "Enter" && !isComposing) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
      </div>
      {hasText && <SendButton hasText={hasText} onClick={sendMessage} />}
    </div>
  );
};
