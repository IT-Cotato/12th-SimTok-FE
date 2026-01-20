import Image from "next/image";

import { useState } from "react";

import CheckIcon from "@/assets/check.svg";

import friendListData from "@/mock/friendList.json";

import { FriendProfile } from "@/types/friendProfile.type";

import { ProfileModal } from "./ProfileModal";

interface FriendListProps {
  searchText: string;
  setModalOpen: (open: boolean) => void;
  isEditMode: boolean;
  selectedIds: number[];
  onToggleFriend: (userId: number) => void;
}
export const FriendList = ({
  searchText,
  setModalOpen,
  isEditMode = false,
  selectedIds,
  onToggleFriend,
}: FriendListProps) => {
  const filteredFriends = searchText
    ? friendListData.filter(user => user.userName.includes(searchText))
    : friendListData;

  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(
    null,
  );

  const profileModalOpen = (friend: FriendProfile) => {
    if (isEditMode) return;
    setSelectedFriend(friend);
    setModalOpen(true);
  };

  const profileModalClose = () => {
    setSelectedFriend(null);
    setModalOpen(false);
  };

  return (
    <section>
      {!searchText && (
        <div className="flex gap-1 px-4">
          <p className="text-sub1-r text-neutral-04">친구</p>
          <p className="text-sub1-r text-neutral-04">{friendListData.length}</p>
        </div>
      )}

      {filteredFriends.map(friend => (
        <div
          key={friend.userId}
          className="hover:bg-neutral-10 flex cursor-pointer gap-4 px-4 py-[10px]"
          onClick={() => {
            if (isEditMode) {
              onToggleFriend(friend.userId);
              return;
            }
            profileModalOpen(friend);
          }}
        >
          <Image
            src={friend.profileImg}
            alt={friend.userName}
            width={80}
            height={80}
            className="h-20 w-20 rounded-2xl object-cover"
          />
          <div
            className={`${isEditMode ? "flex-1 justify-between" : ""} flex items-center`}
          >
            <p className="text-h2 text-neutral-01">{friend.userName}</p>
            {isEditMode && (
              <button
                className={`${
                  selectedIds.includes(friend.userId)
                    ? "bg-mint-01 flex items-center justify-center"
                    : "border-neutral-06 border-[1.75px]"
                } h-[22px] w-[22px] cursor-pointer rounded-full`}
                onClick={e => {
                  e.stopPropagation();
                  onToggleFriend(friend.userId);
                }}
              >
                {selectedIds.includes(friend.userId) && (
                  <CheckIcon className="h-5 w-5 text-white" />
                )}
              </button>
            )}
          </div>
        </div>
      ))}
      {selectedFriend && (
        <ProfileModal
          userId={selectedFriend.userId}
          userName={selectedFriend.userName}
          profileImg={selectedFriend.profileImg}
          onClose={profileModalClose}
        />
      )}
    </section>
  );
};
