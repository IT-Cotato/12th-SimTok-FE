"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { useGardenStore } from "@/stores/useGardenStore";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { SearchField } from "@/components/common/SearchField";
import { SelectedFriendsBar } from "@/components/common/SelectFriendsBar";
import { FriendList } from "@/components/friends/FriendList";
import ProgressDots from "@/components/onboarding/ProgressDots";

import { CombinedFriend } from "@/types/friendProfile.type";

const PlantInvite = () => {
  const router = useRouter();
  const isEditMode = true;

  const [selectedFriends, setSelectedFriends] = useState<CombinedFriend[]>([]); // 편집모드에서 선택한 friendId
  const [searchText, setSearchText] = useState(""); // 서치필드에 입력된 텍스트

  const setInvitedFriend = useGardenStore(state => state.setInvitedFriend);
  const setInvitedFriendId = useGardenStore(state => state.setInvitedFriendId);

  const handleNext = () => {
    console.log("선택된 친구 ID:", selectedFriends[0]?.friendshipId);
    router.push("/garden/new/invite/message");
  };

  const toggleFriend = (friend: CombinedFriend) => {
    setSelectedFriends(prev => {
      const isSameFriend = prev[0]?.friendshipId === friend.friendshipId;

      // 같은 친구 누르면 해제
      if (isSameFriend) {
        setInvitedFriendId(null);
        return [];
      }
      // 무조건 새 친구로 교체
      setInvitedFriend(friend);
      setInvitedFriendId(friend.friendId);
      return [friend];
    });
  };

  const clearSelection = () => {
    setSelectedFriends([]);
    setInvitedFriendId(null);
  };

  return (
    <main>
      <div className="mt-[8.5px]">
        <BackHeader
          title="친구목록"
          subtext="선택해제"
          isEditMode={isEditMode}
          onClickEdit={clearSelection}
          selectedCount={selectedFriends.length}
        />
        <ProgressDots total={3} current={1} />
      </div>

      <div className="mt-[30.5px] flex flex-col gap-5">
        {isEditMode && (
          <SelectedFriendsBar
            selectedFriends={selectedFriends}
            onToggleFriend={toggleFriend}
            gardenInviteMode={true}
          />
        )}
        <div className="px-4">
          <SearchField onChangeSearchText={setSearchText} />
        </div>

        <FriendList
          gardenInviteMode={true}
          searchText={searchText}
          isEditMode={isEditMode}
          selectedFriends={selectedFriends}
          onToggleFriend={toggleFriend}
        />
      </div>

      <div className="fixed bottom-0 z-50 w-full max-w-[440px] bg-white px-4 py-[10px] pb-[42px]">
        <FullButton isActive={selectedFriends.length > 0} onClick={handleNext}>
          선택완료
        </FullButton>
      </div>
    </main>
  );
};

export default PlantInvite;
