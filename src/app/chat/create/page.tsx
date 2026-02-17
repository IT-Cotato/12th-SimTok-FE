"use client";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";

import CloseIcon from "@/assets/close-thin.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ProfileImagePicker } from "@/components/common/ProfileImagePicker";
import { SearchField } from "@/components/common/SearchField";
import { FriendList } from "@/components/friends/FriendList";

import { ApiResponse, FriendshipResponse } from "@/types/api.type";
import { FriendProfile } from "@/types/friendProfile.type";

const CreateChatPage = () => {
  const router = useRouter();

  const [friends, setFriends] = useState<FriendProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState(""); // 서치필드에 입력된 텍스트
  const [modalOpen, setModalOpen] = useState(false); // 친구프로필 모달
  const [isEditMode, setIsEditMode] = useState(true); // 편집모드 전환
  const [selectedFriends, setSelectedFriends] = useState<FriendProfile[]>([]); // 편집모드에서 선택한 friendId

  const toggleFriend = (friend: FriendProfile) => {
    setSelectedFriends(prev =>
      prev.some(f => f.userId === friend.userId) ? [] : [friend],
    );
  };

  const fetchFriends = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    try {
      setIsLoading(true);
      const res = await fetch("/api/friendships?status=PENDING&status=ACTIVE", {
        headers: {
          Authorization: token?.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`,
        },
      });
      const result: ApiResponse = await res.json();

      if (result.success && result.data?.friendshipList) {
        const mappedFriends: FriendProfile[] = result.data.friendshipList.map(
          (f: FriendshipResponse) => ({
            userId: f.friendId,
            userName: f.showName,
            profileImg: f.profileImageUrl ?? undefined,
          }),
        );
        setFriends(mappedFriends);
      }
    } catch (error) {
      console.error("친구 목록 로드 실패", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  // const handleStartChat = async () => {
  //   if (selectedFriends.length === 0) return;
  //   const opponent = selectedFriends[0];

  //   const token =
  //     typeof window !== "undefined"
  //       ? localStorage.getItem("accessToken")
  //       : null;

  //   try {
  //     const res = await fetch(
  //       `/api/chat/rooms/direct/resolve?opponentMemberId=${opponent.userId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     const data = await res.json();
  //     const query = `name=${encodeURIComponent(opponent.userName)}&img=${encodeURIComponent(opponent.profileImg || "")}`;

  //     if (data.exists) {
  //       router.push(`/chat/${data.roomId}${query}`);
  //     } else {
  //       router.push(
  //         `/chat/${opponent.userId}&${query}`,
  //       );
  //     }
  //   } catch (error) {
  //     console.error("방 생성 실패", error);
  //   }
  // };
  const handleStartChat = async () => {
    if (selectedFriends.length === 0) return;
    const opponent = selectedFriends[0];
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(
        `/api/chat/rooms/direct/resolve?opponentMemberId=${opponent.userId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const result = await res.json();

      const chatData = result.data;
      const query = `?name=${encodeURIComponent(opponent.userName)}&img=${encodeURIComponent(opponent.profileImg || "")}`;

      if (chatData.exists) {
        router.push(`/chat/${chatData.roomId}${query}`);
      } else {
        router.push(`/chat/new${query}&target=${opponent.userId}`);
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
            {selectedFriends.map(({ userId, profileImg, userName }) => (
              <div
                key={userId}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <ProfileImagePicker
                    imageUrl={profileImg ?? null}
                    canEdit={false}
                    width={80}
                    height={80}
                    radius={18}
                  />
                  <button
                    className="bg-neutral-11 absolute bottom-[58px] left-[63px] h-[22px] w-[22px] cursor-pointer rounded-full"
                    onClick={() =>
                      toggleFriend({ userId, profileImg, userName })
                    }
                  >
                    <CloseIcon className="inset-0 mx-auto h-2 w-2" />
                  </button>
                </div>

                <p className="text-body3 text-neutral-06">{userName}</p>
              </div>
            ))}
          </section>
        )}
        {isLoading ? (
          <div className="flex justify-center py-10">로딩 중...</div>
        ) : (
          <FriendList
            friends={friends} // 데이터 전달 (FriendList 컴포넌트 수정 필요)
            searchText={searchText}
            setModalOpen={setModalOpen}
            isEditMode={isEditMode}
            selectedFriends={selectedFriends}
            onToggleFriend={toggleFriend}
          />
        )}
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
