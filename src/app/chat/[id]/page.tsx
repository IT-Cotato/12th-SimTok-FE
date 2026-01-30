"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import AiIcon from "@/assets/AI.svg";
import BackToKeywordIcon from "@/assets/backtokeyword.svg";
import MenuIcon from "@/assets/list.svg";

import { ChatDateDivider } from "@/components/chat/ChatDateDivider";
import { ChatField } from "@/components/chat/ChatField";
import { FriendMessage } from "@/components/chat/FriendMessage";
import { MyMessage } from "@/components/chat/MyMessage";
import TopicKeyword from "@/components/chat/TopicKeyword";
import { BackHeader } from "@/components/common/BackHeader";

import { CHAT_TOPIC } from "@/constants/friendsSettings";

import friendListData from "@/mock/friendList.json";

const Chatting = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "mine",
      content: "오늘 반찬은 뭐 드셨어요?",
      time: "오후 12:11",
    },
    {
      id: 2,
      type: "friend",
      content: "어제 할아버지가 키운 당근 볶아서 맛있는 비빔밥 해먹었어^^",
      time: "오후 12:11",
    },
  ]);

  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [selectedTopicKey, setSelectedTopicKey] = useState<string | null>(null);

  const [inputValue, setInputValue] = useState<string>("");

  const selectedTopic = CHAT_TOPIC.find(t => t.key === selectedTopicKey);
  const targetFriend = friendListData.find(
    friend => friend.userId === Number(id),
  );
  const displayName = targetFriend ? targetFriend.userName : "...";

  const handleRecommendationClick = (text: string) => {
    setInputValue(text);
    setSelectedTopicKey(null); // Dim 배경 닫기 및 키워드 목록으로 복귀
  };

  const handleSend = (text: string) => {
    const newMessage = {
      id: Date.now(),
      type: "mine",
      content: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      {isTopicOpen && selectedTopicKey && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity"
          onClick={() => setSelectedTopicKey(null)}
        />
      )}

      <div className="flex h-full w-full flex-col">
        <BackHeader title={displayName}>
          <button
            className="flex items-center justify-center"
            onClick={() => router.push(`/chat/${params.id}/setting`)}
          >
            <MenuIcon />
          </button>
        </BackHeader>
        <section className="flex-1 overflow-y-auto">
          <ChatDateDivider date="2025년 12월 18일 목요일" />
        </section>
        <div className="flex flex-col">
          {messages.map(msg =>
            msg.type === "mine" ? (
              <MyMessage key={msg.id} content={msg.content} time={msg.time} />
            ) : (
              <FriendMessage
                key={msg.id}
                userName={displayName}
                profileImage={targetFriend?.profileImg}
                content={msg.content}
                time={msg.time}
              />
            ),
          )}
        </div>

        <div className="fixed bottom-0 z-40 w-full max-w-[440px] pb-[52px]">
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
                          <BackToKeywordIcon /> 키워드로 돌아가기
                        </button>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        {selectedTopic.recommendations.map((text, idx) => (
                          <TopicKeyword
                            key={idx}
                            label={text}
                            onClick={() => handleRecommendationClick(text)}
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

            <ChatField
              value={inputValue}
              onChange={setInputValue}
              isDimmed={isTopicOpen && Boolean(selectedTopicKey)}
              onSend={handleSend}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chatting;
