"use client";

import { useState } from "react";

import CameraIcon from "@/assets/camera.svg";
import ImageIcon from "@/assets/image.svg";
import MicIcon from "@/assets/mic.svg";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full justify-center bg-white px-4 pb-4">
      <div className="bg-neutral-10 flex h-[50px] w-full max-w-[440px] items-center gap-[10px] rounded-[16px] px-[5px]">
        <CameraIcon className="text-neutral-02 h-10 w-10" />

        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="대화를 보내보세요"
          className="text-sub1-r text-neutral-01 placeholder:text-neutral-07 flex-1 bg-transparent focus:outline-none"
        />

        <div className="flex items-center gap-[10px]">
          <button className="flex-shrink-0">
            <ImageIcon className="text-neutral-02 h-8 w-8" />
          </button>
          <button className="flex-shrink-0">
            <MicIcon className="text-neutral-02 h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
