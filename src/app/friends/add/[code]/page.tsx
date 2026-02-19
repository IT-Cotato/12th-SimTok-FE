"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { searchFriendByInviteCode } from "@/app/api/friendships/friend.api";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { OnlyLoader } from "@/components/common/OnlyLoader";

import { SearchFriendByInviteCodeResponse } from "@/types/friendProfile.type";

const FriendAddPage = () => {
  const router = useRouter();
  const params = useParams();
  const inviteCode = params?.code as string;

  const [opponentData, setOpponentData] =
    useState<SearchFriendByInviteCodeResponse>();

  useEffect(() => {
    const fetchOpponentData = async () => {
      if (!inviteCode) router.push("/friends/invite");

      try {
        const response = await searchFriendByInviteCode(inviteCode);
        setOpponentData(response);
      } catch (error) {
        console.error("친구 정보를 불러오는데 실패했습니다:", error);
        router.push("/friends/invite");
      }
    };

    fetchOpponentData();
  }, [inviteCode]);

  if (!opponentData) return <OnlyLoader />;

  return (
    <main className="bg-radial-yellowgreen-mintgreen flex w-full flex-col">
      <div className="flex flex-1 flex-col">
        <section className="mt-[8.5px]">
          <BackHeader />
        </section>
        <h1 className="text-d2 text-neutral-02 mt-[58.5px] px-4 py-[10px]">
          친구를 목록에 추가할까요?
        </h1>
        <section className="mt-[171px] flex flex-col items-center justify-center gap-4">
          <Image
            src={opponentData.profileImageUrl}
            alt="프로필 이미지"
            width={174}
            height={174}
            className="h-[174px] w-[174px] rounded-[36px] object-cover"
          />
          <p className="text-h2 text-neutral-01">{opponentData.memberName}</p>
        </section>
      </div>

      <section className="w-full bg-white px-4 py-[52px] pt-[10px]">
        <FullButton
          onClick={() =>
            router.push(`/friends/settings/${opponentData.memberId}`)
          }
        >
          추가하기
        </FullButton>
      </section>
    </main>
  );
};

export default FriendAddPage;
