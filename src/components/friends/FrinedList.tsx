import Image from "next/image";

import { useState } from "react";

import friendListData from "@/mock/friendList.json";

import { FriendProfile } from "@/types/friendProfile.type";

import { ProfileModal } from "./ProfileModal";

interface FriendListProps {
  searchText: string;
  setModalOpen: (open: boolean) => void;
}
export const FriendList = ({ searchText, setModalOpen }: FriendListProps) => {
  const filteredFriends = searchText
    ? friendListData.filter(user => user.userName.includes(searchText))
    : friendListData;

  const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(
    null,
  );

  const profileModalOpen = (friend: FriendProfile) => {
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
          onClick={() => profileModalOpen(friend)}
        >
          <Image
            src={friend.profileImg}
            alt={friend.userName}
            width={80}
            height={80}
            className="h-20 w-20 rounded-2xl object-cover"
          />
          <div className="text-h2 text-neutral-01 flex items-center">
            {friend.userName}
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
