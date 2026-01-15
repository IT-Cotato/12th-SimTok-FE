"use client";
import { BackHeader } from "@/components/common/BackHeader";
import { FriendList } from "@/components/friends/FrinedList";
import { SearchField } from "@/components/friends/SearchField";

const FriendsListPage = () => {
  return (
    <main className="w-full">
      <div className="mt-[8.5px]">
        <BackHeader title="친구목록" subtext="편집하기" />
      </div>
      <div className="mt-[30.5px] flex flex-col gap-5">
        <SearchField />
        <FriendList />
      </div>
    </main>
  );
};
export default FriendsListPage;
