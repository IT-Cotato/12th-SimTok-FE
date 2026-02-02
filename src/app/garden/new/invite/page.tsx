"use client";
import { useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { SearchField } from "@/components/common/SearchField";
import { SelectedFriendsBar } from "@/components/common/SelectFriendsBar";
import { FriendList } from "@/components/friends/FriendList";

import { FriendProfile } from "@/types/friendProfile.type";

const PlantInvite = () => {
  const isEditMode = true;
  const [selectedFriends, setSelectedFriends] = useState<FriendProfile[]>([]); // 편집모드에서 선택한 friendId
  const [searchText, setSearchText] = useState(""); // 서치필드에 입력된 텍스트

  const toggleFriend = (friend: FriendProfile) => {
    setSelectedFriends(prev => {
      const isSameFriend =
        prev.length === 1 && prev[0].userId === friend.userId;

      // 같은 친구 누르면 해제
      if (isSameFriend) {
        return [];
      }
      // 무조건 새 친구로 교체
      return [friend];
    });
  };

  return (
    <main>
      <div className="mt-[8.5px]">
        <BackHeader
          title="친구목록"
          subtext="선택헤제"
          isEditMode={isEditMode}
          onClickEdit={() => {
            if (isEditMode) setSelectedFriends([]);
          }}
          selectedCount={selectedFriends.length}
        />
      </div>
      <div className="mt-[30.5px] flex flex-col gap-5">
        <SearchField onChangeSearchText={setSearchText} />
        {isEditMode && (
          <SelectedFriendsBar
            selectedFriends={selectedFriends}
            onToggleFriend={toggleFriend}
          />
        )}

        <FriendList
          searchText={searchText}
          isEditMode={isEditMode}
          selectedFriends={selectedFriends}
          onToggleFriend={toggleFriend}
        />
      </div>

      <div className="fixed bottom-0 z-50 w-full max-w-[440px] bg-white px-4 py-[10px] pb-[42px]">
        <FullButton isActive={selectedFriends.length > 0}>선택완료</FullButton>
      </div>
    </main>
  );
};

export default PlantInvite;
