"use client";
import { useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { ProfileWrapper } from "@/components/common/ProfileWrapper";

import ProfileData from "@/mock/myProfile.json";

const FriendSetting = () => {
  const [nickname, setNickName] = useState(ProfileData.nickName);
  return (
    <main className="w-full">
      <section className="mt-[8.5px]">
        <BackHeader title="친구설정" />
      </section>
      <section className="mt-[16.5px]">
        <ProfileWrapper
          imageUrl={ProfileData.profileImg}
          name={nickname}
          onChangeName={setNickName}
          placeholder="닉네임을 입력해주세요"
        />
      </section>
    </main>
  );
};

export default FriendSetting;
