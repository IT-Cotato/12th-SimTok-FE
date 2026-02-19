"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import {
  postFriendRequest,
  searchFriendByInviteCode,
} from "@/app/api/friendships/friend.api";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { OnlyLoader } from "@/components/common/OnlyLoader";
import { ProfileImagePicker } from "@/components/common/ProfileImagePicker";

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

  const handleFriendRequest = async () => {
    if (!opponentData) return;
    try {
      const response = await postFriendRequest(opponentData?.memberId);

      if (response) {
        const name = encodeURIComponent(opponentData.memberName);
        const img = encodeURIComponent(opponentData.profileImageUrl);
        const fsId = opponentData.memberId;
        router.push(
          `/friends/settings/${fsId}?mode=add&name=${name}&img=${img}`,
        );
      }
    } catch (error) {
      console.error("친구 신청 실패:", error);
    }
  };

  if (!opponentData) return <OnlyLoader />;

  return (
    <main className="bg-radial-yellowgreen-mintgreen flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col">
        <section className="mt-[8.5px]">
          <BackHeader />
        </section>
        <h1 className="text-d2 text-neutral-02 mt-[58.5px] px-4 py-[10px]">
          친구를 목록에 추가할까요?
        </h1>
        <section className="flex flex-1 flex-col items-center justify-center gap-4">
          <ProfileImagePicker
            canEdit={false}
            imageUrl={opponentData.profileImageUrl}
            width={174}
            height={174}
            radius={36}
          />
          <p className="text-h2 text-neutral-01">{opponentData.memberName}</p>
        </section>
      </div>

      <section className="w-full bg-white px-4 py-[52px] pt-[10px]">
        <FullButton onClick={() => handleFriendRequest()}>추가하기</FullButton>
      </section>
    </main>
  );
};

export default FriendAddPage;
