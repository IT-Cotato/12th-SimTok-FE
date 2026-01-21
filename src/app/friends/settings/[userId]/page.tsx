"use client";
import { useParams } from "next/navigation";

import { useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { ProfileWrapper } from "@/components/common/ProfileWrapper";
import { SettingField } from "@/components/friends/SettingField";

import ProfileData from "@/mock/friendsSetting.json";

import { ChatStyle, ChatTopic } from "@/types/friendProfile.type";

const FriendSetting = () => {
  const params = useParams();
  const friendId = Number(params.userId);
  const myUserId = 101; // TODO: 임의로 설정, 추후에 내 아이디 받아오는 로직 추가필요

  const friendData = ProfileData[myUserId]?.find(
    item => item.userId === friendId,
  );

  const initialNickname =
    friendData?.nickNameByFriend?.trim() ||
    friendData?.nickNameByMe?.trim() ||
    friendData?.userName ||
    "";

  const [nickname, setNickName] = useState(initialNickname);

  if (!friendData) {
    return;
  }

  return (
    <main className="w-full">
      <section className="mt-[8.5px]">
        <BackHeader title="친구설정" />
      </section>
      <section className="mt-[16.5px] mb-[47px]">
        <ProfileWrapper
          imageUrl={friendData.profileImg}
          name={nickname}
          onChangeName={setNickName}
          placeholder="닉네임을 입력해주세요"
        />
      </section>
      <SettingField
        userName={friendData.userName}
        goalDays={friendData.goalDays}
        chatStyle={friendData.chatStyle as ChatStyle}
        chatTopic={friendData.chatTopic as ChatTopic[]}
      />
    </main>
  );
};

export default FriendSetting;
