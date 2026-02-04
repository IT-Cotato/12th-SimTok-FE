"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import BellIcon from "@/assets/bell_chat.svg";
import FloatingButtonIcon from "@/assets/floating_button.svg";

import { ChatItem } from "@/components/chat/ChatItem";
import { ExitChatModal } from "@/components/chat/ExitChatModal";
import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";
import { SearchField } from "@/components/common/SearchField";

import chatListData from "@/mock/chatList.json";

interface ChatItemType {
  id: number;
  name: string;
  lastMessage: string;
  date: string;
  unreadCount?: number;
  profileImg: string;
}

const ChatListPage = () => {
  const router = useRouter();
  const [chats, setChats] = useState(chatListData);
  const [searchText, setSearchText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetChat] = useState<{
    id: number;
    name: string;
    profileImg: string;
  } | null>(null);

  const [selectedChat, setSelectedChat] = useState<ChatItemType | null>(null);

  const handleOpenModal = (chat: ChatItemType) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedChat) {
      setChats(prev => prev.filter(c => c.id !== selectedChat.id));
      setIsModalOpen(false);
      setSelectedChat(null);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase()),
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
              key={chat.id}
              {...chat}
              onDelete={() => handleOpenModal(chat)}
              name={chat.name}
              lastMessage={chat.lastMessage}
              date={chat.date}
              unreadCount={chat.unreadCount}
              profileImg={chat.profileImg}
              onClick={() => router.push(`/chat/${chat.id}`)}
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
          userName={selectedChat.name}
          profileImg={selectedChat.profileImg}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
};

export default ChatListPage;
