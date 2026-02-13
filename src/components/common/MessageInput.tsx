import { useRef, useState } from "react";

import { SendButton } from "@/assets/SendButton";
import CameraIcon from "@/assets/camera.svg";
import HeartfillIcon from "@/assets/heart-fill.svg";

interface MessageInputProps {
  isChatting?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onSend?: (message: string) => void;
}

export const MessageInput = ({
  isChatting = false,
  onFocus,
  onSend,
}: MessageInputProps) => {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasText = Boolean(text);
  const sendMessage = () => {
    if (!hasText) return;
    onSend?.(text.trim());
    setText("");
  };

  return (
    <div
      className="bg-neutral-10 relative flex h-[50px] w-full items-center justify-between rounded-2xl pr-[5px] pl-[15px] focus:outline-none"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex gap-[10px]">
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
          <HeartfillIcon className="text-mint-01 mr-[3px] h-6 w-6" />
        )}
        <input
          ref={inputRef}
          className="text-sub1-r text-neutral-01 flex-1 focus:outline-none"
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
