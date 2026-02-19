"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import FriendAddIcon from "@/assets/person-plus.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { SearchField } from "@/components/common/SearchField";
import { SelectedFriendsBar } from "@/components/common/SelectFriendsBar";
import { DeleteFriendModal } from "@/components/friends/DeleteFriendModal";
import { FriendList } from "@/components/friends/FriendList";

import { CombinedFriend } from "@/types/friendProfile.type";

import { getFriendName } from "@/utils/getFriendName";

import { deleteFriendship } from "../api/friendships/friend.api";

const FriendsListPage = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState(""); // 서치필드에 입력된 텍스트
  const [modalOpen, setModalOpen] = useState(false); // 친구프로필 모달
  const [isEditMode, setIsEditMode] = useState(false); // 편집모드 전환
  const [selectedFriends, setSelectedFriends] = useState<CombinedFriend[]>([]); // 편집모드에서 선택한 friendId
  const [clickDelete, setClickDelete] = useState(false);

  const toggleFriend = (friend: CombinedFriend) => {
    setSelectedFriends(prev =>
      prev.some(f => f.friendshipId === friend.friendshipId)
        ? prev.filter(f => f.friendshipId !== friend.friendshipId)
        : [...prev, friend],
    );
  };

  const clickDeleteButton = () => {
    setClickDelete(prev => !prev);
  };

  const handleDeleteConfirm = async () => {
    try {
      const deletePromises = selectedFriends.map(friend =>
        deleteFriendship(friend.friendshipId),
      );

      const results = await Promise.all(deletePromises);

      const isAllSuccessful = results.every(
        res => res && (res.success || res.status === 200),
      );

      if (isAllSuccessful) {
        setSelectedFriends([]);
        setIsEditMode(false);
        setClickDelete(false);

        window.location.reload();
      }
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    <main className="relative w-full">
      {!modalOpen && (
        <div className="mt-[8.5px]">
          <BackHeader
            title="친구목록"
            subtext="편집하기"
            isEditMode={isEditMode}
            onClickEdit={() => {
              setIsEditMode(prev => !prev);
              if (isEditMode) setSelectedFriends([]);
            }}
            selectedCount={selectedFriends.length}
          />
        </div>
      )}

      <div
        className={`${modalOpen ? "mt-[95px]" : "mt-[30.5px]"} flex flex-col gap-5`}
      >
        <div className="px-4">
          <SearchField onChangeSearchText={setSearchText} />
        </div>

        {isEditMode && (
          <SelectedFriendsBar
            selectedFriends={selectedFriends}
            onToggleFriend={toggleFriend}
            gardenInviteMode={false}
          />
        )}

        <FriendList
          searchText={searchText}
          setModalOpen={setModalOpen}
          isEditMode={isEditMode}
          selectedFriends={selectedFriends}
          onToggleFriend={toggleFriend}
        />
      </div>
      {isEditMode ? (
        selectedFriends.length > 0 && (
          <div className="fixed bottom-0 z-50 w-full max-w-[440px] bg-white px-4 py-[10px] pb-[42px]">
            <FullButton onClick={clickDeleteButton}>삭제하기</FullButton>
          </div>
        )
      ) : (
        <div className="fixed inset-x-0 bottom-[33px] z-50">
          <div className="mx-auto w-full max-w-[440px]">
            <button
              className="bg-mint-01 mr-4 ml-auto flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded-full shadow-[0_0_10px_0_rgba(0,0,0,0.10)]"
              onClick={() => router.push("/friends/invite")}
            >
              <FriendAddIcon className="h-10 w-10 text-white" />
            </button>
          </div>
        </div>
      )}
      {clickDelete && selectedFriends.length > 0 && (
        <DeleteFriendModal
          selectedCount={selectedFriends.length}
          selectedProfileImg={selectedFriends[0].profileImageUrl}
          selectedName={getFriendName(selectedFriends[0], false)}
          onClose={clickDeleteButton}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </main>
  );
};
export default FriendsListPage;
