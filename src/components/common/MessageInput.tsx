import { useRef, useState } from "react";

import {
  deleteChallengeLike,
  postChallengeLike,
} from "@/app/api/dailyRecord/dayLog.api";
import {
  deleteDiaryLike,
  postDiaryLike,
} from "@/app/api/dailyRecord/sharedDiary.api";

import { SendButton } from "@/assets/SendButton";
import CameraIcon from "@/assets/camera.svg";
import HeartfillIcon from "@/assets/heart-fill.svg";
import HeartBlankIcon from "@/assets/heart.svg";
import ReplyIcon from "@/assets/reply.svg";

import { SheetType } from "../dailyRecord/ChatBottomSheet";

interface MessageInputProps {
  type?: SheetType; // 하루미션 or 공유일기
  onInputClick?: () => void;
  readOnly?: boolean;
  targetId?: number;
  isLiked?: boolean;
  isChatting?: boolean;
  isDimmed?: boolean; // 채팅에서 추천문구 활성화 시
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onSend?: (message: string) => void;
  onImageUpload?: (file: File) => void;
  className?: string;
  //채팅에서 사용하는 추천 문구
  suggestedMessage?: string;
  onMessageChange?: (text: string) => void;
  onHeartClick?: () => void;
}

export const MessageInput = ({
  type,
  targetId,
  onInputClick,
  readOnly,
  isLiked = false,
  isChatting = false,
  isDimmed = false,
  onFocus,
  onSend,
  onImageUpload,
  suggestedMessage,
  onMessageChange,
  onHeartClick,
}: MessageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [localText, setLocalText] = useState(""); // 댓글 모드용 내부 상태
  const [isComposing, setIsComposing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentText = (isChatting ? suggestedMessage : localText) || "";
  const hasText = currentText.trim().length > 0;

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

  return (
    <div
      className={`focus-within:border-mint-01 relative flex h-[50px] w-full items-center gap-[10px] rounded-2xl px-[15px] transition-colors ${
        isDimmed ? "bg-neutral-04" : "bg-neutral-10"
      } ${type === "challenge" ? "border-neutral-02 border bg-transparent" : ""} `}
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
              onHeartClick?.();
            }}
          >
            {isLiked ? (
              <HeartfillIcon className="text-mint-01 h-[26px] w-[26px]" />
            ) : (
              <HeartBlankIcon
                className={`${type === "challenge" ? "text-neutral-06" : "text-neutral-04"} h-[26px] w-[26px]`}
              />
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        className={`text-sub1-r ${
          type === "challenge" ? "text-neutral-05" : "text-neutral-01"
        } h-full min-w-0 flex-1 bg-transparent focus:outline-none`}
        type="text"
        readOnly={readOnly}
        onClick={() => {
          if (readOnly) {
            onInputClick?.();
          }
        }}
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

      {isChatting && hasText && (
        <div className="ml-1 flex-shrink-0">
          <SendButton hasText={hasText} onClick={sendMessage} />
        </div>
      )}
      {!isChatting && (
        <ReplyIcon className="text-neutral-02 h-[30px] w-[30px]" />
      )}
    </div>
  );
};
