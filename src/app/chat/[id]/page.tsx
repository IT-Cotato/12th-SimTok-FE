"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import AiIcon from "@/assets/AI.svg";
import BackToKeywordIcon from "@/assets/backtokeyword.svg";
import MenuIcon from "@/assets/list.svg";

import { MessageInput } from "@/components/chat/ChatField";
import TopicKeyword from "@/components/chat/TopicKeyword";
import { BackHeader } from "@/components/common/BackHeader";

import { CHAT_TOPIC } from "@/constants/friendsSettings";

import friendListData from "@/mock/friendList.json";

const Chatting = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  // const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isTopicOpen, setIsTopicOpen] = useState(false);

  const [selectedTopicKey, setSelectedTopicKey] = useState<string | null>(null);

  // 선택된 토픽 객체 찾기
  const selectedTopic = CHAT_TOPIC.find(t => t.key === selectedTopicKey);

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
            <div className="absolute bottom-full left-0 mb-4 w-full overflow-hidden px-4">
              {isTopicOpen && (
                <div className="flex flex-col gap-[19px]">
                  {selectedTopic ? (
                    <>
                      <div className="flex justify-center">
                        <button
                          onClick={() => setSelectedTopicKey(null)}
                          className="text-sub1-r text-orange-01 flex items-center gap-1"
                        >
                          <BackToKeywordIcon />
                          키워드로 돌아가기
                        </button>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        {CHAT_TOPIC.find(
                          t => t.key === selectedTopicKey,
                        )?.recommendations.map((text, idx) => (
                          <TopicKeyword
                            key={idx}
                            label={text}
                            onClick={() => console.log(text)}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="scrollbar-hide flex w-full flex-nowrap gap-[12px] overflow-x-auto">
                      {CHAT_TOPIC.map(topic => (
                        <TopicKeyword
                          key={topic.key}
                          label={topic.label}
                          icon={topic.icon}
                          isActive={false}
                          onClick={() => setSelectedTopicKey(topic.key)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!isTopicOpen && (
                <div className="flex justify-end">
                  <button onClick={() => setIsTopicOpen(true)}>
                    <AiIcon />
                  </button>
                </div>
              )}
            </div>
            <MessageInput />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chatting;
