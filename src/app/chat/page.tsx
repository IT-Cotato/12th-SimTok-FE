"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import BellIcon from "@/assets/bell_chat.svg";
import FloatingButtonIcon from "@/assets/floating_button.svg";

import { ChatItem } from "@/components/chat/ChatItem";
import { ExitChatModal } from "@/components/chat/ExitChatModal";
import { BackHeader } from "@/components/common/BackHeader";
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

        const result = await res.json();
        if (result.success) {
          setChats(result.data.items);
          console.log(result);
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

  // 2. 검색 필터링 (방 이름 기준)
  const filteredChats = chats.filter(chat =>
    chat.roomName.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-full flex-col">
        <BackHeader title="대화" showBackIcon={false}>
          <button className="flex items-center justify-center">
            <BellIcon />
          </button>
        </BackHeader>

        <div className="px-4">
          <SearchField onChangeSearchText={setSearchText} />
        </div>

        <section className="mt-5 flex flex-col overflow-y-auto">
          {filteredChats.map(chat => (
            <ChatItem
              key={chat.roomId}
              id={chat.roomId}
              name={chat.roomName}
              lastMessage={chat.lastMessagePreview}
              date={formatDate(chat.lastMessageAt)}
              unreadCount={chat.unreadCount}
              profileImg={chat.opponent.profileImageUrl}
              onDelete={() => handleOpenModal(chat)}
              onClick={() => router.push(`/chat/${chat.roomId}`)}
            />
          ))}
        </section>

        <div className="pointer-events-none fixed bottom-[122px] left-0 z-40 flex w-full justify-center">
          <div className="flex w-full max-w-[440px] justify-end px-4">
            <button
              className="pointer-events-auto transition-transform active:scale-95"
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
          profileImg={selectedChat.opponent.profileImageUrl}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            /* 삭제 API 연동 필요 */
            setIsModalOpen(false);
          }}
        />
      )}
    </main>
  );
};

export default ChatListPage;
