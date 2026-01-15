import Image from "next/image";

import friendListData from "@/mock/friendList.json";

export const FriendList = () => {
  return (
    <section>
      <div className="flex gap-1 px-4">
        <p className="text-sub1-r text-neutral-04">친구</p>
        <p className="text-sub1-r text-neutral-04">{friendListData.length}</p>
      </div>
      {friendListData.map(friend => (
        <div key={friend.userId} className="flex gap-4 px-4 py-[10px]">
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
    </section>
  );
};
