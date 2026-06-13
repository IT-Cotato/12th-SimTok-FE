"use client";
import { useState } from "react";

import { motion, useAnimation } from "framer-motion";

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
  const controls = useAnimation();
  const [dragX, setDragX] = useState(0);

  const SWIPE_THRESHOLD = 60;
  const MAX_SWIPE = 80;

  const opacity = dragX < 0 ? Math.min(-dragX / SWIPE_THRESHOLD, 1) : 0;
  const isThresholdPassed = dragX < -SWIPE_THRESHOLD;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute top-1/2 right-4 z-0 -translate-y-1/2 transition-opacity duration-150"
        style={{ opacity }}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-150 ${
            isThresholdPassed ? "bg-neutral-06" : "bg-transparent"
          }`}
        >
          <ChatReplyIcon className="h-5 w-5 text-white" />
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -MAX_SWIPE, right: 0 }}
        dragElastic={0.1}
        onDrag={(_, info) => setDragX(info.offset.x)}
        onDragEnd={(_, info) => {
          if (info.offset.x < -SWIPE_THRESHOLD) {
            onReply?.();
          }
          setDragX(0);
          controls.start({
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          });
        }}
        animate={controls}
        className={`relative z-10 flex w-full cursor-pointer justify-start gap-[6px] bg-white px-4 ${paddingTop} ${paddingBottom}`}
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
      </motion.div>
    </div>
  );
};
