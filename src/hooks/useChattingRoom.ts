"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";

import { useStomp } from "@/context/StompContext";
import { StompSubscription } from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";

import {
  enterChatRoom,
  getChatMessages,
  getPresignedUrl,
} from "@/app/api/chat/chatRoom.api";
import {
  getChatTopics,
  getTopicTemplates,
  postAiPhrases,
} from "@/app/api/chat/chatTopics.api";

import { ApiMessageItem, ChatMessage, ChatTopicItem } from "@/types/chat";
import { CustomJwtPayload } from "@/types/common";

import { formatChatTime } from "@/utils/formatDate";
import { getChatTopicMeta } from "@/utils/getChatTopicMeta";
import { uploadToS3 } from "@/utils/uploadImage.util";

export const useChattingRoom = () => {
  const { client, isConnected } = useStomp();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const roomId = params?.id as string;
  const targetId = searchParams.get("target");
  const fsId = searchParams.get("fsId");
  const displayName = searchParams.get("name") || "상대방";
  const opponentProfileImg = searchParams.get("img");

  const [apiTopics, setApiTopics] = useState<ChatTopicItem[]>([]);
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
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const [prevRoomId, setPrevRoomId] = useState(roomId);
  if (prevRoomId !== roomId && prevRoomId !== "new") {
    setPrevRoomId(roomId);
    setMessages([]);
  }

  const selectedTopic = apiTopics.find(t => t.code === selectedTopicKey);
  const isDimmed = isTopicOpen && Boolean(selectedTopicKey);

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
      await enterChatRoom(id);
    } catch (err) {
      console.error("읽음 처리 요청 실패:", err);
    }
  }, []);

  const fetchHistory = useCallback(
    async (id: string) => {
      if (!id || id === "new" || isNaN(Number(id))) return;
      try {
        const items = await getChatMessages(id);
        const history = await Promise.all(
          items.map(async (msg: ApiMessageItem) => {
            const isAttachment = msg.messageType === "ATTACHMENT";
            let content = msg.content ?? "";
            if (isAttachment && msg.attachment?.objectKey) {
              const signedUrl = await getPresignedUrl(msg.attachment.objectKey);
              content = signedUrl || "";
            }
            return {
              id: msg.messageId,
              type: (msg.senderMemberId === myMemberId ? "mine" : "friend") as
                | "mine"
                | "friend",
              content,
              time: formatChatTime(msg.createdAt),
              createdAt: msg.createdAt,
              messageSeq: msg.messageSeq,
              isImage: isAttachment,
            };
          }),
        );
        setMessages(history.reverse());
      } catch (err) {
        console.error("히스토리 로드 실패:", err);
      }
    },
    [myMemberId],
  );

  useEffect(() => {
    if (roomId && roomId !== "new") {
      const init = async () => {
        await markAsRead(roomId);
         
        await fetchHistory(roomId);
      };
      init();
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
            router.replace(newUrl, { scroll: false });

            const newRoomId = body.roomId.toString();
            try {
              const items = await getChatMessages(newRoomId);
              if (items.length > 0) {
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
            setMessages(prev =>
              [
                ...prev,
                {
                  id: body.messageId || Date.now(),
                  type: (body.senderMemberId === myMemberId
                    ? "mine"
                    : "friend") as "mine" | "friend",
                  content: messageContent,
                  time: formatChatTime(body.createdAt),
                  createdAt: body.createdAt,
                  messageSeq: body.messageSeq,
                  isImage: isAttachment,
                },
              ].sort(
                (a, b) =>
                  (a.messageSeq ?? Number.MAX_SAFE_INTEGER) -
                  (b.messageSeq ?? Number.MAX_SAFE_INTEGER),
              ),
            );
          }),
          client.subscribe("/user/queue/connection/ack", () => {}),
        );

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
    fsId,
    opponentProfileImg,
    targetId,
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

      if (isNewRoom) {
        const now = new Date().toISOString();
        setMessages(prev => [
          ...prev,
          {
            id: clientMessageId,
            type: "mine" as const,
            content: text,
            time: formatChatTime(now),
            createdAt: now,
          },
        ]);
      }

      setInputValue("");
    } catch (err) {
      console.error("메시지 전송 에러:", err);
    }
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
      const meta = getChatTopicMeta(topicCode);
      setRecommendations(meta.recommendations || []);
    }
  }, []);

  const handleRecommendationClick = useCallback((text: string) => {
    setInputValue(text);
    setIsTopicOpen(false);
    setSelectedTopicKey(null);
    setRecommendations([]);
  }, []);

  const handleRefreshAiPhrases = useCallback(async () => {
    if (!selectedTopicKey) return;
    const topicMeta = apiTopics.find(t => t.code === selectedTopicKey);
    if (!topicMeta) return;

    try {
      const response = await postAiPhrases({
        topic: topicMeta.name,
        existingPhrases: recommendations,
        count: 5,
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

      if (roomId === "new") {
        const now = new Date().toISOString();
        setMessages(prev => [
          ...prev,
          {
            id: tempId,
            type: "mine",
            content: fullUrl,
            time: formatChatTime(now),
            createdAt: now,
            isImage: true,
          },
        ]);
      }

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
          objectKey: finalKey,
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

  const formatDateForDivider = (dateStr: string) =>
    new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }).format(new Date(dateStr));

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return {
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
    setSelectedTopicKey,
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
  };
};
