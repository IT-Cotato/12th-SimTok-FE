import { useRef, useState } from "react";

import { deleteLike, postLike } from "@/app/api/dailyRecord/sharedDiary.api";

import { SendButton } from "@/assets/SendButton";
import CameraIcon from "@/assets/camera.svg";
import HeartfillIcon from "@/assets/heart-fill.svg";
import HeartBlankIcon from "@/assets/heart.svg";

interface MessageInputProps {
  diaryId?: number;
  isLiked?: boolean;
  isChatting?: boolean;
  isDimmed?: boolean; // 채팅에서 추천문구 활성화 시
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onSend?: (message: string) => void;
  onImageUpload?: (file: File) => void;
  className?: string;
  blackMode?: boolean; // 하루기록 댓글에서 사용
  //채팅에서 사용하는 추천 문구
  suggestedMessage?: string;
  onMessageChange?: (text: string) => void;
}

export const MessageInput = ({
  diaryId,
  isLiked = false,
  isChatting = false,
  isDimmed = false,
  onFocus,
  onSend,
  onImageUpload,
  blackMode = false,
  suggestedMessage,
  onMessageChange,
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [localText, setLocalText] = useState(""); // 댓글 모드용 내부 상태
  const [isComposing, setIsComposing] = useState(false);
  const [heartClicked, setHeartClicked] = useState(isLiked);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentText = (isChatting ? suggestedMessage : localText) || "";
  const hasText = currentText.trim().length > 0;

  // 2. 입력값이 바뀔 때 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isChatting) {
      onMessageChange?.(val); // 채팅 모드: 부모 상태 업데이트
    } else {
      setLocalText(val); // 댓글 모드: 내부 상태 업데이트
    }
  };

  const sendMessage = () => {
    if (!hasText) return;
    onSend?.(currentText.trim());

    if (isChatting) {
      onMessageChange?.(""); // 채팅 모드: 부모 상태 비움
    } else {
      setLocalText(""); // 댓글 모드: 내부 상태 비움
    }
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

  const handleHeartClick = async () => {
    if (!diaryId) return;
    const previousState = heartClicked;
    setHeartClicked(!previousState);
    try {
      const apiCall = heartClicked ? deleteLike : postLike;
      await apiCall(diaryId);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      setHeartClicked(previousState);
    }
  };

  return (
    <div
      className={`focus-within:border-mint-01 relative flex h-[50px] w-full items-center gap-[10px] rounded-2xl px-[15px] transition-colors ${
        isDimmed ? "bg-neutral-04" : "bg-neutral-10"
      } ${blackMode ? "border-neutral-02 border bg-transparent" : ""} `}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="flex flex-shrink-0 items-center">
        {isChatting ? (
          <button
            onClick={e => {
              e.stopPropagation();
              handleCameraClick();
            }}
            className="bg-neutral-06 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full"
          >
            <CameraIcon className="h-[18px] w-5 text-white" />
          </button>
        ) : (
          <button
            className="flex cursor-pointer items-center justify-center"
            onClick={e => {
              e.stopPropagation();
              handleHeartClick();
            }}
          >
            {heartClicked ? (
              <HeartfillIcon className="text-mint-01 h-[26px] w-[26px]" />
            ) : (
              <HeartBlankIcon
                className={`${blackMode ? "text-neutral-06" : "text-neutral-04"} h-[26px] w-[26px]`}
              />
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        className={`text-sub1-r ${
          blackMode ? "text-neutral-05" : "text-neutral-01"
        } h-full min-w-0 flex-1 bg-transparent focus:outline-none`}
        type="text"
        value={currentText}
        onChange={handleInputChange}
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

      {hasText && (
        <div className="ml-1 flex-shrink-0">
          <SendButton hasText={hasText} onClick={sendMessage} />
        </div>
      )}
    </div>
  );
};
