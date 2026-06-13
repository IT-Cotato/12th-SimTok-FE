"use client";

import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

import {
  getChatMessages,
  getChatRooms,
  leaveChatRoom,
  resolveDirectRoom,
} from "@/app/api/chat/chatRoom.api";
import { getFriendsList } from "@/app/api/friendships/friend.api";

import FloatingButtonIcon from "@/assets/floating_button.svg";

import { ChatItem } from "@/components/chat/ChatItem";
import { ExitChatModal } from "@/components/chat/ExitChatModal";
import { HeaderWithIcon } from "@/components/common/HeaderWithIcon";
import { NavBar } from "@/components/common/NavBar";
import { OnlyLoader } from "@/components/common/OnlyLoader";
import { SearchField } from "@/components/common/SearchField";

import { ChatListResponse, ChatRoomItem } from "@/types/chat";
import { ApiResponse } from "@/types/common";
import { FriendShipProfile } from "@/types/friendProfile.type";

const ChatListPage = () => {
  const router = useRouter();
  const [chats, setChats] = useState<ChatRoomItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatRoomItem | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const fetchChatRoomsByFriends = useCallback(async () => {
    const friendsList = await getFriendsList("ACTIVE");
    const friends: FriendShipProfile[] = friendsList?.friendshipList ?? [];

    const results = await Promise.all(
      friends.map(async friend => {
        try {
          const resolved = await resolveDirectRoom(String(friend.friendId));
          if (!resolved?.data?.exists) return null;

          const roomId: number = resolved.data.roomId;

          const items = await getChatMessages(String(roomId), 1);
          const lastMsg = items?.[0];

          return {
            roomId,
            roomName: friend.showName,
            friendshipId: friend.friendshipId,
            lastMessagePreview: lastMsg?.content ?? "",
            lastMessageAt: lastMsg?.createdAt ?? "",
            unreadCount: 0,
            opponent: {
              name: friend.showName,
              profileImageUrl: friend.profileImageUrl,
            },
          } as ChatRoomItem;
        } catch {
          return null;
        }
      }),
    );

    setChats(
      results
        .filter((r): r is ChatRoomItem => r !== null)
        .sort(
          (a, b) =>
            new Date(b.lastMessageAt).getTime() -
            new Date(a.lastMessageAt).getTime(),
        ),
    );
  }, []);

  const fetchChatRooms = useCallback(async () => {
    try {
      setIsLoading(true);

      const result: ApiResponse<ChatListResponse> = await getChatRooms();

      if (result.success) {
        const items: ChatRoomItem[] = result.data.items;
        if (items.some(item => !item.friendshipId)) {
          const friendsList = await getFriendsList("ACTIVE");
          const friends: FriendShipProfile[] =
            friendsList?.friendshipList ?? [];

          const roomToFriendship = new Map<number, number>();
          await Promise.all(
            friends.map(async friend => {
              try {
                const d = await resolveDirectRoom(String(friend.friendId));
                if (d?.data?.exists && d?.data?.roomId) {
                  roomToFriendship.set(d.data.roomId, friend.friendshipId);
                }
              } catch {}
            }),
          );

          setChats(
            items.map(item => ({
              ...item,
              friendshipId:
                item.friendshipId || roomToFriendship.get(item.roomId) || 0,
            })),
          );
        } else {
          setChats(items);
        }
      } else {
        await fetchChatRoomsByFriends();
      }
    } catch (error) {
      console.error("목록 로드 실패:", error);
      await fetchChatRoomsByFriends();
    } finally {
      setIsLoading(false);
    }
  }, [fetchChatRoomsByFriends]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChatRooms();

    const handleRefresh = () => {
      fetchChatRooms();
    };

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

    const roomId = selectedChat.roomId;

    try {
      const result = await leaveChatRoom(String(roomId));

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

  const filteredChats = chats.filter(chat => {
    const name = chat.opponent?.name ?? "";
    return name.toLowerCase().includes(searchText.toLowerCase());
  });

  if (isLoading) {
    return <OnlyLoader />;
  }

  return (
    <main className="relative flex min-h-dvh w-full justify-center bg-white">
      <div className="flex h-full w-full flex-col">
        <HeaderWithIcon title="대화" haveAlarm={false} />

        <div className="px-4 pt-[30.5px]">
          <SearchField onChangeSearchText={setSearchText} />
        </div>

        <section className="mt-5 flex flex-col overflow-y-auto pb-[210px]">
          {filteredChats.map((chat: ChatRoomItem) => {
            const displayChatName = chat.opponent?.name || "알 수 없는 사용자";

            return (
              <ChatItem
                key={chat.roomId}
                id={chat.roomId}
                name={displayChatName}
                lastMessage={chat.lastMessagePreview}
                date={formatDate(chat.lastMessageAt)}
                unreadCount={chat.unreadCount}
                profileImg={chat.opponent?.profileImageUrl ?? ""}
                onDelete={() => handleOpenModal(chat)}
                onClick={() => {
                  const params = new URLSearchParams({
                    name: displayChatName,
                    img: chat.opponent?.profileImageUrl || "",
                    fsId: String(chat.friendshipId),
                  });
                  router.push(`/chat/${chat.roomId}?${params.toString()}`);
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
