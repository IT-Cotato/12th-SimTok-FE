"use client";

import { useEffect, useRef, useState } from "react";

import AiIcon from "@/assets/AI.svg";
import BackToKeywordIcon from "@/assets/backtokeyword.svg";
import ChatReplyIcon from "@/assets/chat_reply.svg";
import CloseThinIcon from "@/assets/close-thin.svg";

import { ChatDateDivider } from "@/components/chat/ChatDateDivider";
import { FriendMessage } from "@/components/chat/FriendMessage";
import { MyMessage } from "@/components/chat/MyMessage";
import TopicKeyword from "@/components/chat/TopicKeyword";
import { BackHeader } from "@/components/common/BackHeader";
import { MessageInput } from "@/components/common/MessageInput";
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { useChattingRoom } from "@/hooks/useChattingRoom";

import { getChatTopicMeta } from "@/utils/getChatTopicMeta";

const Chatting = () => {
  const {
    scrollRef,
    roomId,
    fsId,
    displayName,
    opponentProfileImg,
    messages,
    apiTopics,
    isTopicOpen,
    setIsTopicOpen,
    selectedTopic,
    selectedTopicKey,
    isDimmed,
    inputValue,
    setInputValue,
    recommendations,
    handleSend,
    handleBack,
    handleCloseTopic,
    handleTopicClick,
    handleRecommendationClick,
    handleRefreshAiPhrases,
    handleImageUpload,
    formatDateForDivider,
    fetchTopics,
  } = useChattingRoom();

  const [replyMessage, setReplyMessage] = useState<{ content: string } | null>(
    null,
  );
  const [focusTrigger, setFocusTrigger] = useState(0);
  const pendingReplyRef = useRef<{
    userName: string;
    content: string;
    mineCount: number;
  } | null>(null);
  const [localReplyMap, setLocalReplyMap] = useState<
    Record<string, { userName: string; content: string }>
  >({});

  useEffect(() => {
    if (!pendingReplyRef.current) return;
    const myMessages = messages.filter(m => m.type === "mine");
    if (myMessages.length > pendingReplyRef.current.mineCount) {
      const newMsg = myMessages[pendingReplyRef.current.mineCount];
      const { userName, content } = pendingReplyRef.current;
      setLocalReplyMap(prev => ({
        ...prev,
        [String(newMsg.id)]: { userName, content },
      }));
      pendingReplyRef.current = null;
    }
  }, [messages]);

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
        <BackHeader
          title={displayName}
          onBack={handleBack}
          menuIcon={() => {
            window.location.href = `/chat/${roomId}/setting?name=${encodeURIComponent(displayName)}&img=${opponentProfileImg}&fsId=${fsId}`;
          }}
        />
        <section
          ref={scrollRef}
          className="scrollbar-hide flex-1 overflow-y-auto scroll-smooth"
        >
          <div className="flex flex-col">
            {messages.map((msg, index) => {
              const prevMsg = messages[index - 1];
              const isNewDay =
                !prevMsg ||
                new Date(prevMsg.createdAt).toDateString() !==
                  new Date(msg.createdAt).toDateString();

              const isPrevSame =
                index > 0 &&
                messages[index - 1].type === msg.type &&
                messages[index - 1].time === msg.time;
              const isNextSame =
                index < messages.length - 1 &&
                messages[index + 1].type === msg.type &&
                messages[index + 1].time === msg.time;

              return (
                <div key={msg.id}>
                  {isNewDay && (
                    <ChatDateDivider
                      date={formatDateForDivider(msg.createdAt)}
                    />
                  )}
                  {msg.type === "mine" ? (
                    <MyMessage
                      key={msg.id}
                      content={msg.content}
                      time={msg.time}
                      isPrevSame={isPrevSame}
                      isNextSame={isNextSame}
                      isImage={
                        msg.isImage ||
                        msg.content?.includes("http") ||
                        msg.content?.startsWith("blob:")
                      }
                      replyTo={localReplyMap[String(msg.id)]}
                    />
                  ) : (
                    <FriendMessage
                      key={msg.id}
                      userName={displayName}
                      profileImage={opponentProfileImg ?? undefined}
                      content={msg.content}
                      time={msg.time}
                      isPrevSame={isPrevSame}
                      isNextSame={isNextSame}
                      isImage={
                        msg.isImage ||
                        msg.content?.includes("http") ||
                        msg.content?.startsWith("blob:")
                      }
                      onReply={() => {
                        setReplyMessage({ content: msg.content });
                        setFocusTrigger(prev => prev + 1);
                      }}
                    />
                  )}
                </div>
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
            {replyMessage && !isTopicOpen && (
              <div className="border-neutral-09 flex items-center justify-between border-t bg-white px-4">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="border-neutral-06 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2">
                    <ChatReplyIcon className="text-neutral-06 h-4 w-4" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sub1-sb text-neutral-01">
                      {displayName}에게 답장
                    </span>
                    <span className="text-sub1-r text-neutral-01 truncate">
                      {replyMessage.content}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setReplyMessage(null)}
                  className="shrink-0 p-1"
                >
                  <CloseThinIcon className="text-neutral-02 h-4 w-4 cursor-pointer" />
                </button>
              </div>
            )}
            <div
              className={`relative w-full overflow-hidden px-4 pb-4 transition-colors ${
                isDimmed ? "bg-transparent" : "bg-white"
              }`}
            >
              {isTopicOpen && (
                <div className="flex flex-col">
                  {selectedTopic ? (
                    <div className="flex flex-col gap-[19px]">
                      <div className="flex w-full flex-col items-center">
                        <div
                          className="mb-[6px] cursor-pointer"
                          onClick={handleRefreshAiPhrases}
                        >
                          <AiIcon />
                        </div>
                        <button
                          onClick={() => {
                            // selectedTopicKey 초기화 (키워드 목록으로 복귀)
                            handleCloseTopic();
                            setIsTopicOpen(true);
                          }}
                          className="text-sub1-r text-orange-01 flex cursor-pointer items-center gap-1"
                        >
                          <BackToKeywordIcon />
                          키워드로 돌아가기
                        </button>
                      </div>
                      <div className="flex w-full flex-col items-start gap-2">
                        {recommendations.map((text, idx) => (
                          <div
                            key={idx}
                            className="scrollbar-hide w-full overflow-x-auto whitespace-nowrap"
                          >
                            <div className="inline-block min-w-full">
                              <TopicKeyword
                                label={text}
                                onClick={() => handleRecommendationClick(text)}
                              />
                            </div>
                          </div>
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
                        {apiTopics.map(topic => (
                          <TopicKeyword
                            key={topic.code}
                            label={topic.name}
                            icon={
                              getChatTopicMeta(topic.code).icon ?? undefined
                            }
                            isActive={selectedTopicKey === topic.code}
                            onClick={() => handleTopicClick(topic.code)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!isTopicOpen && !replyMessage && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIsTopicOpen(true);
                      fetchTopics();
                    }}
                  >
                    <AiIcon />
                  </button>
                </div>
              )}
            </div>
            <div
              className={`px-4 ${isDimmed ? "pointer-events-none opacity-50" : ""}`}
            >
              <MessageInput
                suggestedMessage={inputValue}
                onMessageChange={setInputValue}
                isChatting={true}
                isDimmed={isDimmed}
                onSend={() => {
                  if (replyMessage) {
                    pendingReplyRef.current = {
                      userName: displayName,
                      content: replyMessage.content,
                      mineCount: messages.filter(m => m.type === "mine").length,
                    };
                  }
                  handleSend();
                  setReplyMessage(null);
                }}
                focusTrigger={focusTrigger}
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chatting;
