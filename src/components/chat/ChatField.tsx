"use client";

import { useState } from "react";

import CameraIcon from "@/assets/camera.svg";
import ImageIcon from "@/assets/image.svg";
import MicIcon from "@/assets/mic.svg";
import SendIcon from "@/assets/send.svg";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  const isNotEmpty = message.trim().length > 0;

  return (
    <div className="flex w-full justify-center px-4">
      <div className="bg-neutral-10 flex min-h-[50px] w-full max-w-[440px] items-center rounded-2xl px-[5px]">
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
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="대화를 보내보세요"
            className="text-sub1-r text-neutral-01 placeholder:text-neutral-07 w-full bg-transparent focus:outline-none"
          />
        </div>

        <div className="flex flex-shrink-0 items-center justify-end">
          {isNotEmpty ? (
            <button
              className="flex h-10 w-14 items-center justify-center transition-transform active:scale-95"
              onClick={() => setMessage("")} //전송 시 필드 초기화
            >
              <SendIcon className="h-full w-full object-contain" />
            </button>
          ) : (
            <div className="flex items-center">
              <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                <ImageIcon className="text-neutral-02 h-7 w-7" />
              </button>
              <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                <MicIcon className="text-neutral-02 h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
