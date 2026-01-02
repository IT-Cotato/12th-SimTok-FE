"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

import HeartFillIcon from "@/assets/heart-fill.svg";
import HeartIcon from "@/assets/heart.svg";
import CommentIcon from "@/assets/reply.svg";

import { Diary } from "@/types/diary.type";

import { getEmotionMeta } from "@/utils/getEmotionMeta";
import { getTimeAgo } from "@/utils/getTimeAgo";

import { SharedDiaryChat } from "./SharedDiaryChat";

interface SharedDiaryItemProps {
  item: Diary;
  commentMode?: boolean;
}

export const SharedDiaryItem = ({
  item,
  commentMode = false,
}: SharedDiaryItemProps) => {
  const router = useRouter();
  const [heartClicked, setHeartClicked] = useState(false);

  const emotionMeta = getEmotionMeta(item.emotion);
  const timeAgo = getTimeAgo(item.createdAt);

  return (
    <section key={item.id} className="flex w-full flex-col">
      <div className="flex items-center justify-start gap-[5px] px-4 py-[10px]">
        <Image
          src={item.profile}
          alt={item.userName}
          width={46}
          height={46}
          className="rounded-full object-cover"
        />
        <p className="text-sub2-sb text-neutral-01">{item.userName}</p>
      </div>
      {emotionMeta && (
        <figure className="-mt-[32px] flex flex-col items-center">
          <Image
            src={emotionMeta.imageSrc}
            alt={item.emotion}
            width={89}
            height={89}
            className="p-[10px]"
          />
          <figcaption className="text-sub1-sb -mt-[16px] text-black">
            {`"오늘 하루는 ${emotionMeta.pastText}"`}
          </figcaption>
        </figure>
      )}
      <div className="bg-neutral-11 relative mt-2 h-[589px] w-full">
        <Image
          src={item.image}
          alt={item.image}
          fill
          className="w-full object-contain"
        />
      </div>

      <div className="flex flex-col gap-[10px] px-4 pt-[10px] pb-4">
        <p className="text-body1-md text-black">{item.text}</p>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div
              className="cursor-pointer"
              onClick={() => setHeartClicked(prev => !prev)}
            >
              {heartClicked ? (
                <HeartFillIcon width={24} height={24} />
              ) : (
                <HeartIcon width={24} height={24} />
              )}
            </div>
            <CommentIcon
              className="cursor-pointer"
              onClick={() => router.push(`/shared-diary/${item.id}`)}
            />
          </div>
          <p className="text-neutral-04 text-sub2-sb">{timeAgo}</p>
        </div>
      </div>
      {commentMode && (
        <div className="w-full">
          <SharedDiaryChat />
        </div>
      )}
    </section>
  );
};
