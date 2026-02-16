"use client";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { MessageInput } from "@/components/common/MessageInput";

import CommentData from "@/mock/diaryComment.json";
import MyProfile from "@/mock/myProfile.json";

import { CommentList } from "./CommentList";

export const SharedDiaryComment = () => {
  const [comments, setComments] = useState(CommentData);

  const profileImg = MyProfile.profileImg;
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : null;

  return (
    <div
      className="fixed inset-0 bottom-0 left-1/2 z-50 flex w-full max-w-[440px] -translate-x-1/2 items-end justify-center bg-black/50"
      onClick={() => {
        router.back();
      }}
    >
      <section
        className="flex h-[545px] w-full max-w-[440px] flex-col rounded-t-2xl bg-white"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-center px-4 pt-[10px] pb-9">
          <div className="bg-neutral-08 h-[3px] w-[38px] rounded-[2px]"></div>
        </div>
        <div className="flex-1 overflow-y-auto pb-[109px]">
          <CommentList comments={comments} />
        </div>

        <footer className="fixed bottom-0 flex w-full max-w-[440px] items-center gap-[13px] bg-white px-4 pt-4 pb-[11px]">
          <MessageInput
            onSend={message => {
              setComments(prev => [
                ...prev,
                {
                  id: Date.now(), //TODO: mock id
                  userName: MyProfile.userName,
                  profileImg: profileImg,
                  comment: message,
                  createdAt: new Date().toISOString(),
                },
              ]);
            }}
          />
        </footer>
      </section>
    </div>
  );
};
