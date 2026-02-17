"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { useStomp } from "@/context/StompContext";
import { StompSubscription } from "@stomp/stompjs";
import { JwtPayload, jwtDecode } from "jwt-decode";

import AiIcon from "@/assets/AI.svg";
import BackToKeywordIcon from "@/assets/backtokeyword.svg";

//import MenuIcon from "@/assets/list.svg";

import { ChatDateDivider } from "@/components/chat/ChatDateDivider";
import { FriendMessage } from "@/components/chat/FriendMessage";
import { MyMessage } from "@/components/chat/MyMessage";
import TopicKeyword from "@/components/chat/TopicKeyword";
import { BackHeader } from "@/components/common/BackHeader";
import { MessageInput } from "@/components/common/MessageInput";
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { CHAT_TOPIC } from "@/constants/friendsSettings";

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

// interface HistoryResponse {
//   success: boolean;
//   data: {
//     items: ApiMessageItem[];
//   };
// }

interface ChatMessageResponse {
  messageId: string;
  senderMemberId: number;
  content: string;
  createdAt: string;
  messageSeq: number;
}

interface CustomJwtPayload extends JwtPayload {
  memberId?: string | number;
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
  const [myMemberId] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);
          return decoded.memberId || decoded.sub
            ? Number(decoded.memberId || decoded.sub)
            : null;
        } catch (e) {
          console.error("토큰 디코딩 실패", e);
          return null;
        }
      }
    }
    return null;
  });

  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [selectedTopicKey, setSelectedTopicKey] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const displayName = searchParams.get("name") || "상대방";
  const opponentProfileImg = searchParams.get("img");

  const [prevRoomId, setPrevRoomId] = useState(roomId);
  if (roomId !== prevRoomId) {
    setPrevRoomId(roomId);
    setMessages([]);
  }

  const selectedTopic = CHAT_TOPIC.find(t => t.key === selectedTopicKey);
  const isDimmed = isTopicOpen && Boolean(selectedTopicKey);

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  // 초기 메시지 히스토리 로드
  const fetchHistory = useCallback(
    async (id: string, isRetry = false) => {
      if (!id || id === "new" || isNaN(Number(id))) return;

      try {
        const res = await fetch(`/api/chat/rooms/${id}/messages?limit=20`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (res.status === 403) {
          throw new Error("FORBIDDEN");
        }

        const result = await res.json();
        if (result.success && result.data?.items) {
          const history = result.data.items.map((msg: ChatMessageResponse) => ({
            id: msg.messageId,
            type: msg.senderMemberId === myMemberId ? "mine" : "friend",
            content: msg.content,
            time: formatTime(msg.createdAt),
            messageSeq: msg.messageSeq,
          }));
          setMessages(history.reverse());
        }
      } catch (err) {
        console.error("히스토리 로드 실패:", err);
      }
    },
    [myMemberId],
  );

  useEffect(() => {
    if (roomId && roomId !== "new") {
      fetchHistory(roomId);
    }
  }, [roomId, fetchHistory]);

  useEffect(() => {
    if (!client || !isConnected) return;

    if (roomId !== "new") {
      fetchHistory(roomId);
    }

    const subscriptions: StompSubscription[] = [];

    try {
      // 1. 공통 에러 구독
      subscriptions.push(
        client.subscribe("/user/queue/errors", msg => {
          console.error("STOMP Server Error:", JSON.parse(msg.body));
        }),
      );

      subscriptions.push(
        client.subscribe("/user/queue/chat/events", msg => {
          const body = JSON.parse(msg.body);
          console.log("📩 [EVENT 수신]:", body);

          if (body.type === "ROOM_CREATED" && body.roomId) {
            const nameParam = encodeURIComponent(displayName || "");
            const targetParam = searchParams.get("target");

            router.replace(
              `/chat/${body.roomId}?target=${targetParam}&name=${nameParam}`,
            );

            fetchHistory(body.roomId.toString());

            router.replace(
              `/chat/${body.roomId}?target=${targetId}&name=${encodeURIComponent(displayName)}`,
            );
          }
        }),
      );

      if (roomId && roomId !== "new") {
        subscriptions.push(
          client.subscribe(`/topic/chat/rooms/${roomId}`, msg => {
            const body = JSON.parse(msg.body);
            console.log("메시지 수신:", body);
            setMessages(prev => [
              ...prev,
              {
                id: body.messageId || Date.now(),
                type: body.senderMemberId === myMemberId ? "mine" : "friend",
                content: body.content,
                time: formatTime(body.createdAt),
              },
            ]);
          }),
          client.subscribe("/user/queue/connection/ack", msg => {
            console.log("Connection ACK:", JSON.parse(msg.body));
          }),
        );

        // 연결 확인용 ACK
        client.publish({
          destination: "/app/connection/ack",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message: "연결 확인" }),
        });
      }
    } catch (err) {
      console.error("구독 설정 오류:", err);
    }

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [
    roomId,
    client,
    isConnected,
    myMemberId,
    fetchHistory,
    router,
    displayName,
    searchParams,
  ]);

  const handleSend = () => {
    const text = inputValue;
    if (!client?.connected || !text?.trim()) return;

    try {
      const targetIdFromUrl = searchParams.get("target");
      const currentRoomId = params?.id;
      const isNewRoom = currentRoomId === "new";

      const payload = {
        clientMessageId: crypto.randomUUID(),
        roomId: isNewRoom ? null : Number(currentRoomId),
        opponentMemberId: targetIdFromUrl ? Number(targetIdFromUrl) : null,
        messageType: "TEXT",
        content: text,
      };

      console.log("📤 [최종 전송 페이로드]:", payload);
      client.publish({
        destination: "/app/chat/messages/send",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      setInputValue("");
    } catch (err) {
      console.error("메시지 전송 에러:", err);
    }
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
        <BackHeader
          title={displayName}
          menuIcon={() =>
            router.push(
              `/chat/${params.id}/setting?name=${displayName}&img=${opponentProfileImg}`,
            )
          }
        />
        <section
          ref={scrollRef}
          className="scrollbar-hide flex-1 overflow-y-auto scroll-smooth"
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
                  profileImage={opponentProfileImg ?? undefined}
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
            <div
              className={`px-4 ${isDimmed ? "pointer-events-none opacity-50" : ""}`}
            >
              <MessageInput
                suggestedMessage={inputValue}
                onMessageChange={setInputValue}
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
