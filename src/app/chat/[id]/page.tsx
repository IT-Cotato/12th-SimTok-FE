"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { useStomp } from "@/context/StompContext";
import { StompSubscription } from "@stomp/stompjs";
import { JwtPayload, jwtDecode } from "jwt-decode";

import AiIcon from "@/assets/AI.svg";
import BackToKeywordIcon from "@/assets/backtokeyword.svg";

import { ChatDateDivider } from "@/components/chat/ChatDateDivider";
import { FriendMessage } from "@/components/chat/FriendMessage";
import { MyMessage } from "@/components/chat/MyMessage";
import TopicKeyword from "@/components/chat/TopicKeyword";
import { BackHeader } from "@/components/common/BackHeader";
import { MessageInput } from "@/components/common/MessageInput";
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { CHAT_TOPIC } from "@/constants/friendsSettings";

import {
  getChatTopics,
  getTopicTemplates,
  postAiPhrases,
} from "../../api/chat/chatTopics.api";

interface ChatMessage {
  id: string | number;
  type: "mine" | "friend";
  content: string;
  time: string;
  createdAt: string;
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

interface ChatTopicItem {
  name: string;
  code: string;
}

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
  const [apiTopics, setApiTopics] = useState<ChatTopicItem[]>([]);
  const getTopicMeta = (code: string) => {
    return (
      CHAT_TOPIC.find(t => t.key === code) || {
        icon: null,
        recommendations: [],
      }
    );
  };

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
  const [recommendations, setRecommendations] = useState<string[]>([]);

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

  const fetchTopics = useCallback(async () => {
    try {
      const response = await getChatTopics();
      if (response?.success && response?.data?.chatTopicList) {
        setApiTopics(response.data.chatTopicList);
      }
    } catch (error) {
      console.error("주제 로드 실패", error);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const markAsRead = useCallback(async (id: string) => {
    if (!id || id === "new") return;

    try {
      await fetch(`/api/chat/rooms/${id}/enter`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(`Room ${id} 읽음 처리 완료`);
    } catch (err) {
      console.error("읽음 처리 요청 실패:", err);
    }
  }, []);

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
            createdAt: msg.createdAt,
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
      markAsRead(roomId); // 읽음 처리 알림
      fetchHistory(roomId); // 메시지 내역 로드
    }
  }, [roomId, markAsRead, fetchHistory]);

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
            router.replace(
              `/chat/${body.roomId}?target=${targetId}&name=${encodeURIComponent(displayName)}`,
            );
            fetchHistory(body.roomId.toString());
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
                createdAt: body.createdAt, // 필드 반드시 추가
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
      const numericRoomId = isNewRoom ? null : Number(currentRoomId);

      const payload = {
        clientMessageId: crypto.randomUUID(),
        roomId: numericRoomId,
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

  const formatDateForDivider = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }).format(date);
  };

  const handleBack = async () => {
    await markAsRead(roomId);
    router.replace("/chat");
    router.refresh();
  };

  const handleCloseTopic = () => {
    setIsTopicOpen(false);
    setSelectedTopicKey(null);
  };

  const handleTopicClick = useCallback(async (topicCode: string) => {
    setSelectedTopicKey(topicCode);
    try {
      const response = await getTopicTemplates(topicCode);
      if (response?.success && response?.data?.templates) {
        setRecommendations(response.data.templates);
      }
    } catch (error) {
      console.error("추천 문장 로드 실패:", error);
      const meta = getTopicMeta(topicCode);
      setRecommendations(meta.recommendations || []);
    }
  }, []);

  const handleRecommendationClick = useCallback((text: string) => {
    setInputValue(text);
    setIsTopicOpen(false);
    setSelectedTopicKey(null);
    setRecommendations([]); // 상태 초기화
  }, []);

  const handleRefreshAiPhrases = useCallback(async () => {
    console.log("🔄 [AI Refresh] 요청 시작");

    if (!selectedTopicKey) {
      console.warn("⚠️ [AI Refresh] selectedTopicKey 없음");
      return;
    }

    const topicMeta = apiTopics.find(t => t.code === selectedTopicKey);
    if (!topicMeta) {
      console.warn("⚠️ [AI Refresh] 매칭되는 topicMeta 없음");
      return;
    }

    try {
      const response = await postAiPhrases({
        topic: topicMeta.name, // 현재 선택된 주제 명칭
        existingPhrases: recommendations, // 현재 화면에 떠 있는 문구들
        count: 5, // 새로 받을 개수
      });

      if (response?.success && response?.data?.phrases) {
        console.log("📥 [AI Refresh] 결과:", response.data.phrases);
        setRecommendations(response.data.phrases); // 새로운 리스트로 교체
      }
    } catch (error) {
      console.error("AI 문구 갱신 실패:", error);
    }
  }, [selectedTopicKey, apiTopics, recommendations]);

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
      createdAt: new Date().toISOString(),
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
          onBack={handleBack}
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
                          onClick={() => setSelectedTopicKey(null)}
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
                            icon={getTopicMeta(topic.code).icon ?? undefined}
                            isActive={selectedTopicKey === topic.code}
                            onClick={() => handleTopicClick(topic.code)} // API 호출 핸들러 연결
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!isTopicOpen && (
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
