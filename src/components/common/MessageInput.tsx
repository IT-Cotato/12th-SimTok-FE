import { useRef, useState } from "react";

import { SendButton } from "@/assets/SendButton";
import CameraIcon from "@/assets/camera.svg";
import HeartfillIcon from "@/assets/heart-fill.svg";
import HeartBlankIcon from "@/assets/heart.svg";

interface MessageInputProps {
  isChatting?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onSend?: (message: string) => void;
  blackMode?: boolean;
}

export const MessageInput = ({
  isChatting = false,
  onFocus,
  onSend,
  blackMode = false,
}: MessageInputProps) => {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasText = Boolean(text);
  const sendMessage = () => {
    if (!hasText) return;
    onSend?.(text.trim());
    setText("");
  };

  return (
    <div
      className={`${blackMode ? "border-neutral-05 border bg-transparent" : "bg-neutral-10"} relative flex min-h-[50px] w-full items-center justify-between rounded-2xl pr-[5px] pl-[15px] focus:outline-none`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex min-w-0 flex-1 gap-[10px]">
        {isChatting ? (
          <button
            className="bg-neutral-06 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <CameraIcon className="h-[18px] w-5 text-white" />
          </button>
        ) : (
          <button
            className="cursor-pointer"
            onClick={() => setHeartClicked(prev => !prev)}
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
          value={text}
          onChange={e => setText(e.target.value)}
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
