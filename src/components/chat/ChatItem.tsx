"use client";

import Image from "next/image";

import { useState } from "react";

import { motion } from "framer-motion";

interface ChatItemProps {
  id: number;
  name: string;
  lastMessage: string;
  date: string;
  unreadCount?: number;
  profileImg?: string;
  onDelete?: (id: number) => void;
  onClick?: () => void;
}

export const ChatItem = ({
  id,
  name,
  lastMessage,
  date,
  unreadCount,
  profileImg,
  onDelete,
}: ChatItemProps) => {
  const [isSwiped, setIsSwiped] = useState(false);

  return (
    <div className="border-neutral-11 relative overflow-hidden border-b bg-white">
      <div
        className="bg-orange-00 absolute inset-y-0 right-0 flex h-[100px] w-[100px] cursor-pointer items-center justify-center"
        onClick={() => onDelete?.(id)}
      >
        <span className="text-neutral-11 text-d3">나가기</span>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }} // 왼쪽으로 최대 10px까지
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x < -20) {
            setIsSwiped(true);
          } else {
            setIsSwiped(false);
          }
        }}
        animate={{ x: isSwiped ? -100 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 flex cursor-pointer items-center gap-3 bg-white px-4 py-3"
      >
        <div className="bg-neutral-08 relative h-[80px] w-[80px] flex-shrink-0 overflow-hidden rounded-2xl">
          {profileImg && (
            <Image src={profileImg} alt={name} fill className="object-cover" />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[7px] overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-h2 text-neutral-01">{name}</span>
            <span className="text-b3 text-neutral-06">{date}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sub1-r text-neutral-04 truncate">
              {lastMessage}
            </span>
            {unreadCount && unreadCount > 0 && (
              <div className="bg-mint-02 flex h-[26px] w-[26px] items-center justify-center rounded-full px-1.5 text-[10px] text-white">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
