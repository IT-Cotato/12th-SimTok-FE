"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { useStomp } from "@/context/StompContext";

import AiIcon from "@/assets/AI.svg";
import BackToKeywordIcon from "@/assets/backtokeyword.svg";
import MenuIcon from "@/assets/list.svg";

import { ChatDateDivider } from "@/components/chat/ChatDateDivider";
import { FriendMessage } from "@/components/chat/FriendMessage";
import { MyMessage } from "@/components/chat/MyMessage";
import TopicKeyword from "@/components/chat/TopicKeyword";
import { BackHeader } from "@/components/common/BackHeader";
//import { ChatField } from "@/components/chat/ChatField";
import { MessageInput } from "@/components/common/MessageInput";
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { CHAT_TOPIC } from "@/constants/friendsSettings";

import friendListData from "@/mock/friendList.json";

interface ChatMessage {
  id: string | number;
  type: "mine" | "friend";
  content: string;
  time: string;
  messageSeq?: number;
  isImage?: boolean;
}

interface ApiMessageItem {
  messageId: number;
  senderMemberId: number;
  content: string;
  createdAt: string;
  messageSeq: number;
}

interface HistoryResponse {
  success: boolean;
  data: {
    items: ApiMessageItem[];
  };
}

const Chatting = () => {
  const { client, isConnected } = useStomp();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const roomId = params?.id as string;
  const targetId = searchParams.get("target");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const myMemberId = 1;
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [selectedTopicKey, setSelectedTopicKey] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const [prevRoomId, setPrevRoomId] = useState(roomId);
  if (roomId !== prevRoomId) {
    setPrevRoomId(roomId);
    setMessages([]);
  }

  const selectedTopic = CHAT_TOPIC.find(t => t.key === selectedTopicKey);
  const targetFriend = friendListData.find(f => f.userId === Number(roomId));
  const displayName = targetFriend ? targetFriend.userName : "...";
  const isDimmed = isTopicOpen && Boolean(selectedTopicKey);

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  // 초기 메시지 히스토리 로드
  const fetchHistory = useCallback(
    async (id: string) => {
      if (!id || id === "new") return;
      const token = localStorage.getItem("accessToken");

      try {
        const res = await fetch(`/api/chat/rooms/${id}/messages?limit=20`, {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더 추가 필수
          },
        });

        const result: HistoryResponse = await res.json();
        if (result.success) {
          const history: ChatMessage[] = result.data.items.map(msg => ({
            id: msg.messageId,
            type: msg.senderMemberId === myMemberId ? "mine" : "friend",
            content: msg.content,
            time: formatTime(msg.createdAt),
            messageSeq: msg.messageSeq,
          }));
          setMessages(history.reverse());
        }
      } catch (err) {
        console.error("히스토리 로드 실패", err);
      }
    },
    [myMemberId],
  );

  // 초기화 및 실시간 메시지 구독
  useEffect(() => {
    if (!roomId || roomId === "new") return;

    const timer = setTimeout(() => {
      fetchHistory(roomId);
    }, 0);

    if (!client || !isConnected) {
      return () => clearTimeout(timer);
    }

    const sub = client.subscribe(`/topic/chat/rooms/${roomId}`, msg => {
      const body = JSON.parse(msg.body);
      const formattedMsg: ChatMessage = {
        id: body.messageId,
        type: body.senderMemberId === myMemberId ? "mine" : "friend",
        content: body.content,
        time: new Date(body.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prev => [...prev, formattedMsg]);
    });

    return () => sub.unsubscribe();
  }, [roomId, client, isConnected, fetchHistory, myMemberId]);

  // 방 생성 리다이렉트 구독
  useEffect(() => {
    if (!client || !isConnected || roomId !== "new") return;

    const sub = client.subscribe("/user/queue/chat/rooms", msg => {
      const body = JSON.parse(msg.body);
      if (body.roomId) router.replace(`/chat/${body.roomId}`);
    });

    return () => sub.unsubscribe();
  }, [client, isConnected, roomId, router]);

  // 메시지 전송
  const handleSend = (text: string) => {
    if (!client || !isConnected || !text.trim()) return;

    const payload = {
      clientMessageId: crypto.randomUUID(),
      roomId: roomId === "new" ? null : Number(roomId),
      opponentMemberId: roomId ? null : Number(targetId),
      messageType: "TEXT",
      content: text,
    };

    client.publish({
      destination: "/app/chat/messages/send",
      body: JSON.stringify(payload),
    });
    // setInputValue("");
  };

  const handleCloseTopic = () => {
    setIsTopicOpen(false);
    setSelectedTopicKey(null);
  };

  const handleRecommendationClick = (text: string) => {
    setInputValue(text);
    setIsTopicOpen(false);
    setSelectedTopicKey(null);
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    const newMessage: ChatMessage = {
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

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
        <section
          ref={scrollRef}
          className="scrollbar-hide mb-40 flex-1 overflow-y-auto scroll-smooth"
        >
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
                          className="text-sub1-r text-orange-01 flex cursor-pointer items-center gap-1"
                        >
                          <BackToKeywordIcon />
                          키워드로 돌아가기
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
            {/* <ChatField
              value={inputValue}
              onChange={setInputValue}
              isDimmed={isDimmed}
              onSend={handleSend}
              onImageUpload={handleImageUpload}
            /> */}
            <div
              className={`px-4 ${isDimmed ? "pointer-events-none opacity-50" : ""}`}
            >
              <MessageInput
                value={inputValue}
                onChange={setInputValue}
                isChatting={true}
                isDimmed={isDimmed}
                onSend={handleSend}
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
