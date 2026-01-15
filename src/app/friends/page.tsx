"use client";
import FriendAddIcon from "@/assets/person-plus.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { FriendList } from "@/components/friends/FrinedList";
import { SearchField } from "@/components/friends/SearchField";

const FriendsListPage = () => {
  return (
    <main className="relative w-full">
      <div className="mt-[8.5px]">
        <BackHeader title="친구목록" subtext="편집하기" />
      </div>
      <div className="mt-[30.5px] flex flex-col gap-5">
        <SearchField />
        <FriendList />
      </div>
      <div className="fixed inset-x-0 bottom-[33px] z-50">
        <div className="mx-auto w-full max-w-[440px]">
          <button className="bg-mint-01 mr-4 ml-auto flex h-[70px] w-[70px] items-center justify-center rounded-full shadow-[0_0_10px_0_rgba(0,0,0,0.10)]">
            <FriendAddIcon className="h-10 w-10 text-white" />
          </button>
        </div>
      </div>
    </main>
  );
};
export default FriendsListPage;
