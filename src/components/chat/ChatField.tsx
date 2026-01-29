"use client";

import { useState } from "react";

import CameraIcon from "@/assets/camera.svg";
import ImageIcon from "@/assets/image.svg";
import MicIcon from "@/assets/mic.svg";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex w-full justify-center px-4">
      <div className="bg-neutral-10 flex min-h-[50px] w-full max-w-[440px] items-center rounded-2xl px-[5px]">
        <div className="flex-shrink-0">
          <CameraIcon className="text-neutral-02 h-10 w-10" />
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

        <div className="flex items-center">
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
