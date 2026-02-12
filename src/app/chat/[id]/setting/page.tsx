"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { ExitChatModal } from "@/components/chat/ExitChatModal";
import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ListItem } from "@/components/mypage/ListItem";
import { MyProfileCard } from "@/components/mypage/MyProfileCard";

import { CHAT_LIST_ITEMS } from "@/constants/chatSettings";

import friendListData from "@/mock/friendList.json";

interface Friend {
  userId: number;
  userName: string;
  profileImg: string;
}

const SettingChatPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const targetFriend = (friendListData as Friend[]).find(
    friend => friend.userId === Number(id),
  );

  const handleConfirmExit = () => {
    setIsModalOpen(false);
    router.push("/chat");
  };

  if (!targetFriend) return <div>사용자를 찾을 수 없습니다.</div>;

  return (
    <main className="flex min-h-dvh w-full flex-col">
      <div className="flex flex-1 justify-center">
        <div className="flex h-full w-110 flex-col pb-30">
          <BackHeader title="대화방 설정" />
          <section className="mt-[18.5px]">
            {/* <MyProfileCard
              userProfileData={{
                userId: targetFriend.userId,
                userName: targetFriend.userName,
                nickName: targetFriend.userName,
                profileImg: targetFriend.profileImg,
                phoneNumber: "",
                birthDate: "",
                inviteCode: "",
              }}
              onEdit={() => router.push(`/friends/settings/${id}`)}
            /> */}
          </section>
          <nav className="mt-10">
            <ul className="flex flex-col">
              {CHAT_LIST_ITEMS.map(item => {
                const isToggleItem =
                  item.label === "채팅방 알림" || item.label === "AI 모드";
                const hasRoute = !isToggleItem && item.path !== "/chat/";

                return (
                  <li key={item.label}>
                    <ListItem
                      label={item.label}
                      // onClick={
                      //   !isToggleItem ? () => router.push(item.path) : undefined
                      // }
                      onClick={
                        hasRoute ? () => router.push(item.path) : undefined
                      }
                      hasToggle={isToggleItem}
                      toggleDefaultOn={true}
                      hoverBg={true}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mb-13 flex w-full justify-center px-4 py-[10px]">
            <FullButton
              colorScheme="orange"
              onClick={() => setIsModalOpen(true)}
            >
              채팅방 나가기
            </FullButton>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ExitChatModal
          isOpen={isModalOpen}
          userName={targetFriend.userName}
          profileImg={targetFriend.profileImg}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmExit}
        />
      )}
    </main>
  );
};

export default SettingChatPage;
