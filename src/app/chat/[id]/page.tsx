"use client";

import { useParams, useRouter } from "next/navigation";

import AiIcon from "@/assets/AI.svg";
import MenuIcon from "@/assets/list.svg";

import { MessageInput } from "@/components/chat/ChatField";
import { BackHeader } from "@/components/common/BackHeader";

import friendListData from "@/mock/friendList.json";

const Chatting = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const targetFriend = friendListData.find(
    friend => friend.userId === Number(id),
  );

  const displayName = targetFriend ? targetFriend.userName : "...";

  return (
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-full flex-col">
        <BackHeader title={displayName}>
          <button
            className="flex items-center justify-center"
            onClick={() => router.push(`/chat/${params.id}/setting`)}
          >
            <MenuIcon />
          </button>
        </BackHeader>

        <section className="flex-1 overflow-y-auto px-4 pt-4 pb-32">
          <div className="flex flex-col gap-4">{/* 메시지 내용 렌더링 */}</div>
        </section>

        <div className="fixed bottom-0 z-40 w-full max-w-[440px] bg-white pb-[52px]">
          <div className="relative w-full">
            <div className="absolute right-4 bottom-full mb-4">
              <button className="transition-transform active:scale-95">
                <AiIcon />
              </button>
            </div>
            <MessageInput />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chatting;
