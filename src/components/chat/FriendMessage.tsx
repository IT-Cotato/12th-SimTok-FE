"use client";
import { TouchEvent, useState } from "react";

import ChatReplyIcon from "@/assets/chat_reply.svg";

import { ProfileImagePicker } from "../common/ProfileImagePicker";

interface FriendMessageProps {
  userName: string;
  profileImage?: string;
  content: string;
  time: string;
  isPrevSame?: boolean;
  isNextSame?: boolean;
  isImage?: boolean;
  onReply?: () => void;
}

export const FriendMessage = ({
  userName,
  profileImage,
  content,
  time,
  isPrevSame,
  isNextSame,
  onReply,
}: FriendMessageProps) => {
  const isImage = content.startsWith("blob:") || content.startsWith("http");
  const paddingTop = isPrevSame ? "pt-[2px]" : "pt-[10px]";
  const paddingBottom = isNextSame ? "pb-[2px]" : "pb-[10px]";
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  const SWIPE_THRESHOLD = 60;
  const MAX_SWIPE = 80; // 최대 스와이프 한도

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (touchStart === null) return;

    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 0) {
      const move = Math.min(diff, MAX_SWIPE);
      setTranslateX(-move);
    } else {
      setTranslateX(0);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);

    // 임계값을 넘었을 때만 콜백 실행
    if (Math.abs(translateX) >= SWIPE_THRESHOLD && onReply) {
      onReply();
    }

    setTranslateX(0);
    setTouchStart(null);
  };

  const isThresholdPassed = Math.abs(translateX) >= SWIPE_THRESHOLD;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute top-1/2 right-4 z-0 -translate-y-1/2 transition-opacity duration-150"
        style={{
          opacity:
            translateX < 0 ? Math.min(-translateX / SWIPE_THRESHOLD, 1) : 0,
        }}
      >
        <ChatReplyIcon
          className={`transition-colors duration-150 ${
            isThresholdPassed ? "text-neutral-06" : "text-white"
          }`}
        />
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(${translateX}px)` }}
        className={`relative z-10 flex w-full justify-start gap-[6px] bg-white px-4 ${paddingTop} ${paddingBottom} ${
          isSwiping ? "" : "transition-transform duration-200 select-none"
        }`}
      >
        <div className="w-12 flex-shrink-0">
          {!isPrevSame ? (
            <ProfileImagePicker
              imageUrl={profileImage || null}
              radius={16}
              width={48}
              height={48}
              canEdit={false}
            />
          ) : (
            <div className="w-12" />
          )}
        </div>

        <div className="flex max-w-[calc(100%-60px)] flex-col gap-2">
          {!isPrevSame && (
            <span className="text-sub2-r text-neutral-05 mb-1">{userName}</span>
          )}
          <div className="flex items-end gap-1">
            {isImage ? (
              <div className="relative max-w-full overflow-hidden rounded-2xl">
                <img
                  src={content}
                  alt="전송 이미지"
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-neutral-11 rounded-2xl px-4 py-[10px]">
                <p className="text-sub1-r text-neutral-01 break-all">
                  {content}
                </p>
              </div>
            )}
            {!isNextSame && (
              <span className="text-sub2-r text-neutral-06 mb-[2px] flex-shrink-0">
                {time}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
