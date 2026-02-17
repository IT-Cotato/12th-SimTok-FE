"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import FloatingButtonIcon from "@/assets/floating_button.svg";

import { ChatItem } from "@/components/chat/ChatItem";
import { ExitChatModal } from "@/components/chat/ExitChatModal";
import { HeaderWithIcon } from "@/components/common/HeaderWithIcon";
import { NavBar } from "@/components/common/NavBar";
import { SearchField } from "@/components/common/SearchField";

interface ChatRoomItem {
  roomId: number;
  roomName: string;
  lastMessagePreview: string;
  lastMessageAt: string;
  unreadCount: number;
  opponent: {
    name: string;
    profileImageUrl: string;
  };
}

export interface ApiResponse {
  success: boolean;
  data: {
    items: ChatRoomItem[];
  };
}

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

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const res = await fetch("/api/chat/rooms");

        if (!res.ok) throw new Error(`HTTP 에러! 상태: ${res.status}`);

        const result: ApiResponse = await res.json();
        console.log(result);
        if (result.success) {
          setChats(result.data.items);
        }
      } catch (error) {
        console.error("목록 로드 실패:", error);
      }
    };

    fetchChatRooms();
  }, []);

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
        alert("대화방에서 나갔습니다.");
      } else {
        alert(result.message || "방 나가기 실패");
      }
    } catch (error) {
      console.error("삭제 에러:", error);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsModalOpen(false);
      setSelectedChat(null);
    }
  };

  // 2. 검색 필터링 (방 이름 기준)
  const filteredChats = chats.filter(chat =>
    chat.roomName.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-full flex-col">
        <HeaderWithIcon title="대화" haveAlarm={true} />

        <div className="px-4 pt-[30.5px]">
          <SearchField onChangeSearchText={setSearchText} />
        </div>

        <section className="mt-5 flex flex-col overflow-y-auto">
          {filteredChats.map((chat: ChatRoomItem) => (
            <ChatItem
              key={chat.roomId}
              id={chat.roomId}
              name={chat.roomName}
              lastMessage={chat.lastMessagePreview}
              date={formatDate(chat.lastMessageAt)}
              unreadCount={chat.unreadCount}
              profileImg={chat.opponent?.profileImageUrl}
              onDelete={() => handleOpenModal(chat)}
              onClick={() =>
                router.push(
                  `/chat/${chat.roomId}?name=${encodeURIComponent(chat.roomName)}&img=${encodeURIComponent(chat.opponent?.profileImageUrl || "")}`,
                )
              }
            />
          ))}
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
          profileImg={selectedChat.opponent?.profileImageUrl}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleLeaveChat}
        />
      )}
    </main>
  );
};

export default ChatListPage;
