"use client";
import { BackHeader } from "@/components/common/BackHeader";
import { SearchField } from "@/components/home/SearchField";

const FriendsListPage = () => {
  return (
    <main className="w-full">
      <div className="mt-[8.5px]">
        <BackHeader title="친구목록" subtext="편집하기" />
      </div>
      <div className="mt-[30.5px]">
        <SearchField />
      </div>
    </main>
  );
};
export default FriendsListPage;
