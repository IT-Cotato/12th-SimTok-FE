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
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { CHAT_TOPIC } from "@/constants/friendsSettings";

import chatData from "@/mock/chatdata.json";
import friendListData from "@/mock/friendList.json";

const Chatting = () => {
  const [messages, setMessages] = useState(chatData);

  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [selectedTopicKey, setSelectedTopicKey] = useState<string | null>(null);
  const [clickedText, setClickedText] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const selectedTopic = CHAT_TOPIC.find(t => t.key === selectedTopicKey);
  const targetFriend = friendListData.find(
    friend => friend.userId === Number(id),
  );
  const displayName = targetFriend ? targetFriend.userName : "...";
  const isDimmed = isTopicOpen && Boolean(selectedTopicKey);

  const handleCloseTopic = () => {
    setIsTopicOpen(false);
    setSelectedTopicKey(null);
  };

  const handleRecommendationClick = (text: string) => {
    setClickedText(text);
    setInputValue(text);
    setIsTopicOpen(false);
    setSelectedTopicKey(null);
    setClickedText(null);
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
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);

    const newMessage = {
      id: Date.now(),
      type: "mine",
      content: imageUrl,
      isImage: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <main className="relative flex h-dvh w-full justify-center bg-white">
      {isTopicOpen && (
        <div
          className={`fixed inset-0 z-30 transition-opacity ${
            selectedTopicKey ? "bg-black/50" : "bg-transparent"
          }`}
          onClick={handleCloseTopic}
        />
      )}

      <div className="flex h-full w-full flex-col">
        <BackHeader title={displayName}>
          <button
            type="button"
            aria-label="채팅방 설정"
            onClick={() => router.push(`/chat/${params.id}/setting`)}
          >
            <MenuIcon />
          </button>
        </BackHeader>
        <section className="scrollbar-hide flex-1 overflow-y-auto">
          <ChatDateDivider date="2025년 12월 18일 목요일" />
          <div className="flex flex-col">
            {messages.map((msg, index) => {
              const isPrevSame =
                index > 0 && messages[index - 1].type === msg.type;
              const isNextSame =
                index < messages.length - 1 &&
                messages[index + 1].type === msg.type &&
                messages[index + 1].time === msg.time;

              return msg.type === "mine" ? (
                <MyMessage
                  key={msg.id}
                  content={msg.content}
                  time={msg.time}
                  isPrevSame={isPrevSame}
                  isNextSame={isNextSame}
                />
              ) : (
                <FriendMessage
                  key={msg.id}
                  userName={displayName}
                  profileImage={targetFriend?.profileImg}
                  content={msg.content}
                  time={msg.time}
                  isPrevSame={isPrevSame}
                  isNextSame={isNextSame}
                />
              );
            })}
          </div>
        </section>

        <div
          className={`z-40 w-full max-w-[440px] flex-shrink-0 pb-[52px] transition-colors ${
            isDimmed ? "bg-transparent" : "bg-white"
          }`}
        >
          <div className="relative w-full">
            <div
              className={`relative w-full overflow-hidden px-4 pb-4 transition-colors ${
                isDimmed ? "bg-transparent" : "bg-white"
              }`}
            >
              {isTopicOpen && (
                <div className="flex flex-col">
                  {selectedTopic ? (
                    <div className="flex flex-col gap-[19px]">
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
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex items-start">
                        <InfoMessage
                          text="대화하고 싶은 주제키워드를 골라보세요!"
                          triangleUp={false}
                        />
                      </div>

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
              isDimmed={isDimmed}
              onSend={handleSend}
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chatting;
