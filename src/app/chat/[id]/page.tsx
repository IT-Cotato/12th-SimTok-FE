"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { useStomp } from "@/context/StompContext";
import { BACKEND_BASE_URL } from "@/lib/constants";
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

import { ApiMessageItem, ChatMessage, ChatTopicItem } from "@/types/chat";
import { ApiResponse, CustomJwtPayload } from "@/types/common";

import { uploadToS3 } from "@/utils/uploadImage.util";

import {
  getChatTopics,
  getTopicTemplates,
  postAiPhrases,
} from "../../api/chat/chatTopics.api";

const Chatting = () => {
  const { client, isConnected } = useStomp();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const roomId = params?.id as string;
  const targetId = searchParams.get("target");
  const fsId = searchParams.get("fsId");
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

  const selectedTopic = apiTopics.find(t => t.code === selectedTopicKey);
  const isDimmed = isTopicOpen && Boolean(selectedTopicKey);

  const getPresignedUrl = async (objectKey: string) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return null;
    }
    try {
      const res = await fetch(
        `${BACKEND_BASE_URL}/chat/attachments/presigned-get?objectKey=${encodeURIComponent(objectKey)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      if (!res.ok) return null;

      const result = await res.json();
      return result.url;
    } catch (err) {
      console.error("URL 획득 실패:", err);
      return null;
    }
  };

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    } catch (err) {
      console.error("읽음 처리 요청 실패:", err);
    }
  }, []);

  // 초기 메시지 히스토리 로드
  const fetchHistory = useCallback(
    async (id: string) => {
      if (!id || id === "new" || isNaN(Number(id))) return;

      try {
        const res = await fetch(`/api/chat/rooms/${id}/messages?limit=500`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const result = await res.json();
        if (result.success && result.data?.items) {
          // 모든 메시지를 순회하며 타입별로 처리
          const history = await Promise.all(
            result.data.items.map(async (msg: ApiMessageItem) => {
              const isAttachment = msg.messageType === "ATTACHMENT";
              let content = msg.content ?? "";

              // 첨부파일인 경우 Presigned URL 획득
              if (isAttachment && msg.attachment?.objectKey) {
                const signedUrl = await getPresignedUrl(
                  msg.attachment.objectKey,
                );
                content = signedUrl || "";
              }

              return {
                id: msg.messageId,
                type: msg.senderMemberId === myMemberId ? "mine" : "friend",
                content: content,
                time: formatTime(msg.createdAt),
                createdAt: msg.createdAt,
                messageSeq: msg.messageSeq,
                isImage: isAttachment,
              };
            }),
          );
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchHistory(roomId); // 메시지 내역 로드
    }
  }, [roomId, markAsRead, fetchHistory]);

  useEffect(() => {
    if (!client || !isConnected) return;

    if (roomId !== "new") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
        client.subscribe("/user/queue/chat/events", async msg => {
          const body = JSON.parse(msg.body);

          if (body.type === "ROOM_CREATED" && body.roomId) {
            const query = new URLSearchParams({
              target: targetId ?? "",
              name: displayName,
              img: opponentProfileImg ?? "",
            });
            if (fsId) query.set("fsId", fsId);
            const newUrl = `/chat/${body.roomId}?${query.toString()}`;
            window.history.replaceState(null, "", newUrl);

            const newRoomId = body.roomId.toString();
            try {
              const res = await fetch(
                `/api/chat/rooms/${newRoomId}/messages?limit=500`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                },
              );
              if (!res.ok) return;

              const result = await res.json();
              if (result.success && result.data?.items?.length > 0) {
                await fetchHistory(newRoomId);
              }
            } catch (error) {
              console.error("ROOM_CREATED 히스토리 확인 실패:", error);
            }
          }
        }),
      );

      if (roomId && roomId !== "new") {
        subscriptions.push(
          client.subscribe(`/topic/chat/rooms/${roomId}`, async msg => {
            const body: ApiMessageItem = JSON.parse(msg.body);
            const isAttachment = body.messageType === "ATTACHMENT";
            let messageContent = body.content ?? "";

            if (isAttachment && body.attachment?.objectKey) {
              const signedUrl = await getPresignedUrl(
                body.attachment.objectKey,
              );
              messageContent = signedUrl || "";
            }
            setMessages(prev => [
              ...prev,
              {
                id: body.messageId || Date.now(),
                type: body.senderMemberId === myMemberId ? "mine" : "friend",
                content: messageContent,
                time: formatTime(body.createdAt),
                createdAt: body.createdAt,
                isImage: isAttachment,
              },
            ]);
          }),

          client.subscribe("/user/queue/connection/ack", msg => {}),
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

      const clientMessageId = crypto.randomUUID();
      const payload = {
        clientMessageId,
        roomId: numericRoomId,
        opponentMemberId: targetIdFromUrl ? Number(targetIdFromUrl) : null,
        messageType: "TEXT",
        content: text,
      };

      client.publish({
        destination: "/app/chat/messages/send",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 새 채팅방: STOMP 토픽 구독이 없으므로 optimistic하게 UI에 즉시 추가
      if (isNewRoom) {
        const now = new Date().toISOString();
        setMessages(prev => [
          ...prev,
          {
            id: clientMessageId,
            type: "mine" as const,
            content: text,
            time: formatTime(now),
            createdAt: now,
          },
        ]);
      }

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
    if (!selectedTopicKey) {
      return;
    }

    const topicMeta = apiTopics.find(t => t.code === selectedTopicKey);
    if (!topicMeta) {
      return;
    }

    try {
      const response = await postAiPhrases({
        topic: topicMeta.name,
        existingPhrases: recommendations, // 현재 화면에 떠 있는 문구들
        count: 5, // 새로 받을 개수
      });

      if (response?.success && response?.data?.phrases) {
        setRecommendations(response.data.phrases);
      }
    } catch (error) {
      console.error("AI 문구 갱신 실패:", error);
    }
  }, [selectedTopicKey, apiTopics, recommendations]);

  const handleImageUpload = async (file: File) => {
    const tempId = crypto.randomUUID();

    try {
      const fullUrl = await uploadToS3(file, "CHAT");
      if (!fullUrl) return;

      const urlObj = new URL(fullUrl);
      let realObjectKey = urlObj.pathname;

      if (realObjectKey.startsWith("/")) {
        realObjectKey = realObjectKey.substring(1);
      }

      const finalKey = decodeURIComponent(realObjectKey);

      const payload = {
        clientMessageId: tempId,
        roomId: roomId === "new" ? null : Number(roomId),
        opponentMemberId:
          roomId === "new" ? (targetId ? Number(targetId) : null) : null,
        messageType: "ATTACHMENT",
        content: null,
        attachment: {
          attachmentType: "IMAGE",
          objectKey: finalKey, // 전체 URL이 아닌 추출된 Key 전달
          mimeType: file.type,
          sizeBytes: file.size,
          durationMs: null,
        },
      };

      client?.publish({
        destination: "/app/chat/messages/send",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("이미지 전송 중 최종 에러:", err);
    }
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
          menuIcon={() => {
            router.push(
              `/chat/${roomId}/setting?name=${encodeURIComponent(displayName)}&img=${opponentProfileImg}&fsId=${fsId}`,
            );
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
