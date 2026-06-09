"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { leaveChatRoom } from "@/app/api/chat/chatRoom.api";

import { ExitChatModal } from "@/components/chat/ExitChatModal";
import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ListItem } from "@/components/mypage/ListItem";
import { ProfileCard } from "@/components/mypage/ProfileCard";

import { CHAT_LIST_ITEMS } from "@/constants/chatSettings";

const SettingChatPage = () => {
  const router = useRouter();
  const { id } = useParams(); //roomId
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const opponentName = searchParams.get("name") || "대화 상대";
  const opponentImg = searchParams.get("img") || "";
  const fsId = searchParams.get("fsId"); //friendshipId
  const handleConfirmExit = async () => {
    try {
      const result = await leaveChatRoom(String(id));

      if (result.success) {
        setIsModalOpen(false);
        // 목록으로 이동하며 캐시 무효화가 필요할 수 있으므로 replace 사용
        router.replace("/chat");
      } else {
        alert(result.message || "채팅방 나가기 실패");
      }
    } catch (error) {
      console.error("퇴장 처리 중 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <main className="flex min-h-dvh w-full flex-col">
      <div className="flex flex-1 justify-center">
        <div className="flex h-full w-110 flex-col pb-30">
          <BackHeader title="대화방 설정" />
          <section className="mt-[18.5px]">
            <ProfileCard
              data={{
                name: opponentName,
                profileImageUrl: opponentImg,
              }}
              onEdit={() => {
                if (!fsId || fsId === "undefined") return;
                router.push(
                  `/friends/settings/${fsId}?name=${encodeURIComponent(opponentName)}&img=${encodeURIComponent(opponentImg)}`,
                );
              }}
            />
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
          <div className="mb-13 flex w-full flex-1 justify-center px-4 py-[10px]">
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
          userName={opponentName}
          profileImg={opponentImg}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmExit}
        />
      )}
    </main>
  );
};

export default SettingChatPage;
