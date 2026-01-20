"use client";
import { useState } from "react";

import FriendAddIcon from "@/assets/person-plus.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { SearchField } from "@/components/common/SearchField";
import { FriendList } from "@/components/friends/FrinedList";

const FriendsListPage = () => {
  const [searchText, setSearchText] = useState(""); // 서치필드에 입력된 텍스트
  const [modalOpen, setModalOpen] = useState(false); // 친구프로필 모달
  const [isEditMode, setIsEditMode] = useState(false); // 편집모드 전환
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // 편집모드에서 선택한 friendId

  const toggleFriend = (userId: number) => {
    setSelectedIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    );
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
              if (isEditMode) setSelectedIds([]);
            }}
            selectedCount={selectedIds.length}
          />
        </div>
      )}

      <div
        className={`${modalOpen ? "mt-[95px]" : "mt-[30.5px]"} flex flex-col gap-5`}
      >
        <SearchField onChangeSearchText={setSearchText} />
        <FriendList
          searchText={searchText}
          setModalOpen={setModalOpen}
          isEditMode={isEditMode}
          selectedIds={selectedIds}
          onToggleFriend={toggleFriend}
        />
      </div>
      {isEditMode ? (
        <div className="fixed"></div>
      ) : (
        <div className="fixed inset-x-0 bottom-[33px] z-50">
          <div className="mx-auto w-full max-w-[440px]">
            <button className="bg-mint-01 mr-4 ml-auto flex h-[70px] w-[70px] items-center justify-center rounded-full shadow-[0_0_10px_0_rgba(0,0,0,0.10)]">
              <FriendAddIcon className="h-10 w-10 text-white" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
export default FriendsListPage;
