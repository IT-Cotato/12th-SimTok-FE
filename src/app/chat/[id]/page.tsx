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
          <div className="flex flex-col gap-4"></div>
        </section>

        <div className="pointer-events-none fixed bottom-[82px] left-0 z-40 flex w-full justify-center">
          <div className="flex w-full max-w-[440px] justify-end px-4">
            <button className="pointer-events-auto transition-transform active:scale-95">
              <AiIcon />
            </button>
          </div>
        </div>
        <MessageInput />
      </div>
    </main>
  );
};

export default Chatting;
