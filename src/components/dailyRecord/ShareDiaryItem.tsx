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

import { SharedDiaryComment } from "./SharedDiaryChat";

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
    <section key={item.id} className="mb-6 flex w-full flex-col">
      <div className="flex items-center justify-between px-4 py-[10px]">
        <div className="flex items-center justify-start gap-[5px]">
          <Image
            src={item.profile}
            alt={item.userName}
            width={46}
            height={46}
            className="rounded-2xl object-cover"
          />
          <p className="text-sub1-sb text-neutral-01">{item.userName}</p>
        </div>
        <p className="text-neutral-04 text-sub2-sb">{timeAgo}</p>
      </div>

      <section className="flex flex-col gap-4">
        {emotionMeta && (
          <figure className="-mt-[32px] flex flex-col items-center">
            <div className="p-[10px]">
              <Image
                src={emotionMeta.imageSrc}
                alt={item.emotion}
                width={89}
                height={89}
              />
            </div>
            <figcaption className="text-sub1-sb text-black">
              {`"오늘 하루는 ${emotionMeta.pastText}"`}
            </figcaption>
          </figure>
        )}
        {item.image && (
          <div className="w-full px-4">
            <Image
              src={item.image}
              alt="diary image"
              width={800}
              height={600}
              className="h-auto w-full rounded-2xl object-contain"
            />
          </div>
        )}

        {!item.image && (
          <section className="px-4">
            <div className="bg-neutral-10 border-mint-01 rounded-2xl border px-[10px] py-4">
              {item.text}
            </div>
          </section>
        )}
      </section>

      <div className="flex justify-between p-[10px] px-4">
        {item.image && <p className="text-body1-md text-black">{item.text}</p>}

        <div className="flex items-center justify-between">
          <div className="flex gap-3 pl-[10px]">
            <div
              className="cursor-pointer"
              onClick={() => setHeartClicked(prev => !prev)}
            >
              {heartClicked ? (
                <HeartFillIcon
                  width={26}
                  height={26}
                  className="text-mint-01"
                />
              ) : (
                <HeartIcon width={26} height={26} className="text-neutral-01" />
              )}
            </div>
            <CommentIcon
              className="text-neutral-01 h-[26px] w-[26px] cursor-pointer"
              onClick={() => router.push(`/shared-diary/${item.id}`)}
            />
          </div>
        </div>
      </div>
      {commentMode && (
        <div className="w-full">
          <SharedDiaryComment />
        </div>
      )}
    </section>
  );
};
