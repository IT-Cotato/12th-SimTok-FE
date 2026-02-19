"use client";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ProfileWrapper } from "@/components/common/ProfileWrapper";
import { SettingField } from "@/components/friends/SettingField";

import AllUsers from "@/mock/friendList.json";
import FriendSettingData from "@/mock/friendsSetting.json";

import { ChatStyle, ChatTopic } from "@/types/friendProfile.type";

const EditPage = () => {
  const params = useParams();
  const router = useRouter();

  const friendId = Number(params.id);
  const myUserId = 101; // TODO: 임의로 설정, 추후에 내 아이디 받아오는 로직 추가필요

  const friendData = FriendSettingData[myUserId]?.find(
    item => item.userId === friendId,
  );

  const userData = AllUsers.find(user => user.userId === friendId);

  const baseUser = friendData ?? userData;
  const userName = baseUser?.userName ?? "";
  const profileImg = baseUser?.profileImg ?? "";

  const initialNickname =
    friendData?.nickNameByFriend?.trim() ||
    friendData?.nickNameByMe?.trim() ||
    friendData?.userName ||
    userData?.userName ||
    "";

  const [nickname, setNickName] = useState(initialNickname);
  const [goalDays, setGoalDays] = useState<number | undefined>(
    friendData?.goalDays,
  );
  const [chatStyle, setChatStyle] = useState<ChatStyle | undefined>(
    friendData?.chatStyle as ChatStyle,
  );
  const [chatTopic, setChatTopic] = useState<ChatTopic[]>(
    (friendData?.chatTopic as ChatTopic[]) ?? [],
  );

  if (!friendData && !userData) {
    return null;
  }

  const isValid =
    nickname.trim().length > 0 &&
    !!chatStyle &&
    chatTopic.length > 0 &&
    goalDays != undefined;

  const handleSaveAndRedirect = () => {
    if (isValid) {
      router.push(`/chat/${friendId}`);
    }
  };

  return (
    <main className="w-full">
      <section className="mt-[8.5px]">
        <BackHeader title="친구설정" />
      </section>
      <section className="mt-[16.5px] mb-[47px]">
        <ProfileWrapper
          imageUrl={profileImg}
          name={nickname}
          onChangeName={setNickName}
          placeholder="닉네임을 입력해주세요"
        />
      </section>
      <section className="pb-[125px]">
        <SettingField
          userName={userName}
          goalDays={goalDays}
          chatStyle={chatStyle}
          chatTopic={chatTopic}
          onChangeGoalDays={setGoalDays}
          onChangeChatStyle={setChatStyle}
          onToggleChatTopic={topic =>
            setChatTopic(prev =>
              prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic],
            )
          }
        />
      </section>

      <div className="fixed bottom-0 w-full max-w-[440px] bg-white px-4 pt-[10px] pb-[52px] shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05),0_-4px_6px_-4px_rgba(0,0,0,0.05)]">
        <FullButton onClick={handleSaveAndRedirect}>확인완료</FullButton>
      </div>
    </main>
  );
};

export default EditPage;
