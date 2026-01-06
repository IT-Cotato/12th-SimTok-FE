import { useState } from "react";

import { SendButton } from "@/assets/SendButton";

interface MessageInputProps {
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onSend?: (message: string) => void;
}

export const MessageInput = ({ onFocus, onSend }: MessageInputProps) => {
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const hasText = Boolean(text);
  const sendMessage = () => {
    if (!hasText) return;
    onSend?.(text.trim());
    setText("");
  };

  return (
    <div className="relative flex-1">
      <input
        className="border-neutral-07 bg-neutral-11 focus:border-mint-01 w-full rounded-2xl border border-solid px-4 py-1 focus:outline-none"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onFocus={onFocus}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={e => {
          if (e.key === "Enter" && !isComposing) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <SendButton hasText={hasText} onClick={sendMessage} />
    </div>
  );
};
