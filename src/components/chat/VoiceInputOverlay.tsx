"use client";

import { useState } from "react";

import CloseIcon from "@/assets/close.svg";
import MicFillIcon from "@/assets/mic_fill.svg";
import MouthIcon from "@/assets/mouth.svg";
import PencilChatIcon from "@/assets/pencil_chat.svg";

import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";

interface VoiceInputOverlayProps {
  onClose: () => void;
}

export const VoiceInputOverlay = ({ onClose }: VoiceInputOverlayProps) => {
  const [selectTitle, setSelectTitle] = useState<"left" | "right">("right");
  const [status, setStatus] = useState<"idle" | "recording" | "finished">(
    "idle",
  );

  const handleMicClick = () => {
    if (status === "idle" || status === "finished") {
      setStatus("recording");
    } else {
      setStatus("finished");
    }
  };

  return (
    <div className="fixed inset-y-0 left-1/2 z-50 flex w-full max-w-110 -translate-x-1/2 flex-col bg-black/83 backdrop-blur-sm">
      <div className="relative w-full items-center justify-center">
        <GlassStyleHeader
          leftText="글"
          rightText="음성"
          bgColor="neutral-02"
          selectTitle={selectTitle}
          onChangeSelectTitle={setSelectTitle}
        />
        <button
          onClick={onClose}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-2"
        >
          <CloseIcon className="text-neutral-07 h-6 w-6" />
        </button>
      </div>

      <div className="mt-[53px] px-4 py-[10px]">
        <h2 className="text-d2 text-neutral-11 whitespace-pre-line">
          {selectTitle === "left"
            ? "말씀하신 목소리를\n글로 보내요"
            : "말씀하신 목소리를 그대로\n담아 보내요"}
        </h2>
      </div>

      <div className="mt-[71px] mb-[71px] flex items-center justify-center">
        {selectTitle === "left" ? <PencilChatIcon /> : <MouthIcon />}
      </div>

      <div className="flex flex-col items-center gap-[23px]">
        <p className="text-sub-number text-neutral-11">
          {status === "idle" && "마이크를 눌러서 말해보세요"}
          {status === "recording" && "인식중이에요"}
          {status === "finished" && "마이크를 눌러 다시 말씀해주세요"}
        </p>
        <button
          onClick={handleMicClick}
          className={`flex h-[72px] w-[72px] items-center justify-center rounded-full transition-all active:scale-95 ${
            status === "recording"
              ? "bg-mic"
              : status === "finished"
                ? "bg-neutral-05"
                : "bg-mic"
          }`}
        >
          <MicFillIcon
            className={`h-8 w-8 ${status === "finished" ? "text-white" : "text-white"}`}
          />
        </button>
      </div>
    </div>
  );
};
