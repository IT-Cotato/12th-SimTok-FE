"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import CloseIcon from "@/assets/close-thin.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ProfileImagePicker } from "@/components/common/ProfileImagePicker";
import { SearchField } from "@/components/common/SearchField";
import { FriendList } from "@/components/friends/FriendList";

import { CombinedFriend } from "@/types/friendProfile.type";

import { getFriendName } from "@/utils/getFriendName";

const CreateChatPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(""); // 서치필드에 입력된 텍스트
  const [modalOpen, setModalOpen] = useState(false); // 친구프로필 모달
  const [isEditMode, setIsEditMode] = useState(true); // 편집모드 전환
  const [selectedFriends, setSelectedFriends] = useState<CombinedFriend[]>([]); // 편집모드에서 선택한 friendId

  const toggleFriend = (friend: CombinedFriend) => {
    setSelectedFriends(prev =>
      prev.some(f => f.friendshipId === friend.friendshipId) ? [] : [friend],
    );
  };

  const handleStartChat = async () => {
    if (selectedFriends.length === 0) return;
    const opponent = selectedFriends[0];
    const token = localStorage.getItem("accessToken");

    try {
      const targetId = opponent.friendId;
      const res = await fetch(
        `/api/chat/rooms/direct/resolve?opponentMemberId=${targetId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const result = await res.json();

      const chatData = result.data;
      const opponentName = getFriendName(opponent, false);
      const query = `?name=${encodeURIComponent(opponentName || "")}&img=${encodeURIComponent(opponent.profileImageUrl || "")}&fsId=${opponent.friendshipId}`;

      if (chatData && chatData.exists) {
        router.push(`/chat/${chatData.roomId}${query}`);
      } else {
        router.push(`/chat/new${query}&target=${targetId}`);
      }
    } catch (error) {
      console.error("방 확인 실패", error);
    }
  };

  return (
    <main className="relative w-full">
      {!modalOpen && (
        <div className="mt-[8.5px]">
          <BackHeader
            title="대화방 만들기"
            subtext="선택해제"
            isEditMode={isEditMode}
            onClickEdit={() => {
              setIsEditMode(prev => !prev);
              setSelectedFriends([]);
            }}
            selectedCount={selectedFriends.length}
          />
        </div>
      )}

      <div
        className={`${modalOpen ? "mt-[95px]" : "mt-[30.5px]"} flex flex-col gap-5`}
      >
        <SearchField onChangeSearchText={setSearchText} />
        {isEditMode && selectedFriends.length > 0 && (
          <section className="flex items-start gap-2 px-4">
            {selectedFriends.map(friend => (
              <div
                key={friend.friendshipId}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <ProfileImagePicker
                    imageUrl={friend.profileImageUrl || null}
                    canEdit={false}
                    width={80}
                    height={80}
                    radius={18}
                  />
                  <button
                    className="bg-neutral-11 absolute bottom-[58px] left-[63px] h-[22px] w-[22px] cursor-pointer rounded-full"
                    onClick={() => toggleFriend(friend)}
                  >
                    <CloseIcon className="inset-0 mx-auto h-2 w-2" />
                  </button>
                </div>

                <p className="text-body3 text-neutral-06">
                  {getFriendName(friend, false)}
                </p>
              </div>
            ))}
          </section>
        )}
        <FriendList
          searchText={searchText}
          setModalOpen={setModalOpen}
          isEditMode={isEditMode}
          selectedFriends={selectedFriends}
          onToggleFriend={toggleFriend}
        />
      </div>
      <div className="fixed bottom-0 z-50 w-full max-w-[440px] bg-white px-4 py-[10px] pb-[42px] shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05),0_-4px_6px_-4px_rgba(0,0,0,0.05)]">
        <FullButton
          onClick={handleStartChat}
          isActive={selectedFriends.length === 1}
        >
          대화하기
        </FullButton>
      </div>
    </main>
  );
};
export default CreateChatPage;
