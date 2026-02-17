"use client";

import CloseIcon from "@/assets/close-thin.svg";

import { ProfileImagePicker } from "@/components/common/ProfileImagePicker";

import { FriendProfile } from "@/types/friendProfile.type";

interface SelectedFriendsBarProps {
  selectedFriends: FriendProfile[];
  onToggleFriend: (friend: FriendProfile) => void;
}

export const SelectedFriendsBar = ({
  selectedFriends,
  onToggleFriend,
}: SelectedFriendsBarProps) => {
  if (selectedFriends.length === 0) return null;

  return (
    <section className="flex items-start gap-2 px-4">
      {selectedFriends.map(friend => (
        <div
          key={friend.friendshipId}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative">
            <ProfileImagePicker
              imageUrl={friend.profileImageUrl ?? null}
              canEdit={false}
              width={80}
              height={80}
              radius={18}
            />
            <button
              type="button"
              className="bg-neutral-11 absolute bottom-[58px] left-[63px] h-[22px] w-[22px] cursor-pointer rounded-full"
              onClick={() => onToggleFriend(friend)}
            >
              <CloseIcon className="mx-auto h-2 w-2" />
            </button>
          </div>

          <p className="text-body3 text-neutral-06">{friend.showName}</p>
        </div>
      ))}
    </section>
  );
};
