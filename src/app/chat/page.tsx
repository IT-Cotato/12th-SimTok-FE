"use client";

import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

import FloatingButtonIcon from "@/assets/floating_button.svg";

import { ChatItem } from "@/components/chat/ChatItem";
import { ExitChatModal } from "@/components/chat/ExitChatModal";
import { HeaderWithIcon } from "@/components/common/HeaderWithIcon";
import { NavBar } from "@/components/common/NavBar";
import { SearchField } from "@/components/common/SearchField";

import { ChatListResponse, ChatRoomItem } from "@/types/chat";
import { ApiResponse } from "@/types/common";

const ChatListPage = () => {
  const router = useRouter();
  const [chats, setChats] = useState<ChatRoomItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatRoomItem | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const fetchChatRooms = useCallback(async () => {
    try {
      const res = await fetch("/api/chat/rooms", {
        cache: "no-store",
      });
      const result: ApiResponse<ChatListResponse> = await res.json();
      if (result.success) {
        setChats(result.data.items);
      }
    } catch (error) {
      console.error("목록 로드 실패:", error);
    }
  }, []);

  // 2. 초기 로드 및 포커스 이벤트 등록
  useEffect(() => {
    // 1. 최초 로드
    fetchChatRooms();

    const handleRefresh = () => {
      fetchChatRooms();
    };

    // 2. 뒤로가기(BFCache) 및 포커스 시 갱신
    window.addEventListener("pageshow", handleRefresh);
    window.addEventListener("focus", handleRefresh);

    return () => {
      window.removeEventListener("pageshow", handleRefresh);
      window.removeEventListener("focus", handleRefresh);
    };
  }, [fetchChatRooms]);

  const handleOpenModal = (chat: ChatRoomItem) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  const handleLeaveChat = async () => {
    if (!selectedChat) return;

    const token = localStorage.getItem("accessToken");
    const roomId = selectedChat.roomId;

    try {
      const res = await fetch(`/api/chat/rooms/left/${roomId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (result.success) {
        setChats(prev => prev.filter(chat => chat.roomId !== roomId));
      } else {
        console.error(result.message || "방 나가기 실패");
      }
    } catch (error) {
      console.error("삭제 에러:", error);
    } finally {
      setIsModalOpen(false);
      setSelectedChat(null);
    }
  };

  // 2. 검색 필터링 (방 이름 기준)
  const filteredChats = chats.filter(chat => {
    const name = chat.opponent?.name ?? "";
    return name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-full flex-col">
        <HeaderWithIcon title="대화" haveAlarm={false} />

        <div className="px-4 pt-[30.5px]">
          <SearchField onChangeSearchText={setSearchText} />
        </div>

        <section className="mt-5 flex flex-col overflow-y-auto">
          {filteredChats.map((chat: ChatRoomItem) => {
            const displayChatName = chat.opponent?.name || "알 수 없는 사용자";

            return (
              <ChatItem
                key={chat.roomId}
                id={chat.roomId}
                name={displayChatName} // 상대방 이름 전달
                lastMessage={chat.lastMessagePreview}
                date={formatDate(chat.lastMessageAt)}
                unreadCount={chat.unreadCount}
                profileImg={chat.opponent?.profileImageUrl ?? ""}
                onDelete={() => handleOpenModal(chat)}
                onClick={() => {
                  router.push(
                    `/chat/${chat.roomId}?name=${encodeURIComponent(displayChatName)}&img=${encodeURIComponent(chat.opponent?.profileImageUrl || "")}&fsId=${chat.friendShipId}`,
                  );
                }}
              />
            );
          })}
        </section>

        <div className="pointer-events-none fixed bottom-[122px] left-0 z-40 flex w-full justify-center">
          <div className="flex w-full max-w-[440px] justify-end px-4">
            <button
              className="pointer-events-auto cursor-pointer transition-transform active:scale-95"
              onClick={() => router.push("/chat/create")}
            >
              <FloatingButtonIcon />
            </button>
          </div>
        </div>
        <NavBar />
      </div>

      {selectedChat && (
        <ExitChatModal
          isOpen={isModalOpen}
          userName={selectedChat.roomName}
          profileImg={selectedChat.opponent?.profileImageUrl || ""}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleLeaveChat}
        />
      )}
    </main>
  );
};

export default ChatListPage;
