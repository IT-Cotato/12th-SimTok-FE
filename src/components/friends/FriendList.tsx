import { useEffect, useState } from "react";

import { getFriendsList } from "@/app/api/friendships/friend.api";

import CheckIcon from "@/assets/check.svg";

import { FriendProfile } from "@/types/friendProfile.type";

import { OnlyLoader } from "../common/OnlyLoader";
import { ProfileImagePicker } from "../common/ProfileImagePicker";
import { ProfileModal } from "./ProfileModal";

interface FriendListProps {
  searchText: string;
  setModalOpen?: (open: boolean) => void;
  isEditMode: boolean;
  selectedFriends: FriendProfile[];
  onToggleFriend: (friend: FriendProfile) => void;
}
export const FriendList = ({
  searchText,
  setModalOpen,
  isEditMode = false,
  selectedFriends,
  onToggleFriend,
}: FriendListProps) => {
  const [friends, setFriends] = useState<FriendProfile[]>([]);
  const [activeFriendsCount, setActiveFriendsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getFriendsList("ACTIVE");
        setFriends(data.friendshipList);
        setActiveFriendsCount(data.count);
        console.log("친구 목록:", data.friendshipList);
      } catch (error) {
        console.error("친구 목록 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const filteredFriends = searchText
    ? friends.filter(user => user.showName.includes(searchText))
    : friends;

  const [modalFriend, setModalFriend] = useState<FriendProfile | null>(null);

  const isSelected = (friendshipId: number) =>
    selectedFriends.some(f => f.friendshipId === friendshipId);

  const profileModalOpen = (friend: FriendProfile) => {
    if (isEditMode) return;
    setModalFriend(friend);
    setModalOpen?.(true);
  };

  const profileModalClose = () => {
    setModalFriend(null);
    setModalOpen?.(false);
  };

  if (isLoading) {
    return <OnlyLoader />;
  }

  return (
    <section>
      {!searchText && (
        <div className="flex gap-1 px-4">
          <p className="text-sub1-r text-neutral-04">친구</p>
          <p className="text-sub1-r text-neutral-04">{activeFriendsCount}</p>
        </div>
      )}
      {filteredFriends.map(friend => {
        const selected = isSelected(friend.friendshipId);

        return (
          <div
            key={friend.friendshipId}
            className="hover:bg-neutral-10 flex cursor-pointer gap-4 px-4 py-[10px]"
            onClick={() => {
              if (isEditMode) {
                onToggleFriend(friend);
                return;
              }
              profileModalOpen(friend);
            }}
          >
            <ProfileImagePicker
              imageUrl={friend.profileImageUrl || null}
              width={80}
              height={80}
              radius={16}
              canEdit={false}
            />
            <div
              className={`${isEditMode ? "flex-1 justify-between" : ""} flex items-center`}
            >
              <p className="text-h2 text-neutral-01">{friend.showName}</p>
              {isEditMode && (
                <button
                  className={`${
                    selected
                      ? "bg-mint-01 flex items-center justify-center"
                      : "border-neutral-06 border-[1.75px]"
                  } h-[22px] w-[22px] cursor-pointer rounded-full`}
                  onClick={e => {
                    e.stopPropagation();
                    onToggleFriend(friend);
                  }}
                >
                  {selected && <CheckIcon className="h-5 w-5 text-white" />}
                </button>
              )}
            </div>
          </div>
        );
      })}
      {modalFriend && (
        <ProfileModal
          userId={modalFriend.friendshipId}
          userName={modalFriend.showName}
          profileImg={modalFriend.profileImageUrl}
          onClose={profileModalClose}
        />
      )}
    </section>
  );
};
