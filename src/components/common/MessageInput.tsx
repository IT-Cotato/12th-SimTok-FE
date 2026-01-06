import { useState } from "react";

import { SendButton } from "@/assets/SendButton";

interface MessageInputProps {
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export const MessageInput = ({ onClick }: MessageInputProps) => {
  const [text, setText] = useState("");
  const hasText = Boolean(text);

  return (
    <div className="relative flex-1">
      <input
        className="border-neutral-07 bg-neutral-11 focus:border-mint-01 w-full rounded-2xl border border-solid px-4 py-1 focus:outline-none"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onClick={onClick}
      />
      <SendButton hasText={hasText} />
    </div>
  );
};
