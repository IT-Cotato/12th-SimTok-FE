"use client";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

//import AllUsers from "@/mock/friendList.json";
//import FriendSettingData from "@/mock/friendsSetting.json";

import { friendsApi } from "@/app/api/friends";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ProfileWrapper } from "@/components/common/ProfileWrapper";
import { SettingField } from "@/components/friends/SettingField";

import { ChatStyle, ChatTopic } from "@/types/friendProfile.type";

const FriendSetting = () => {
  const params = useParams();
  const router = useRouter();

  const friendId = Number(params.userId);
  const [profileImg, setProfileImg] = useState("");
  const [userName, setUserName] = useState(""); // 원본 이름
  const [nickname, setNickName] = useState(""); // 설정할 닉네임
  const [goalDays, setGoalDays] = useState<number | undefined>();
  const [chatStyle, setChatStyle] = useState<ChatStyle | undefined>();
  const [chatTopic, setChatTopic] = useState<ChatTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    const initData = async () => {
      try {
        setIsLoading(true);
        const result = await friendsApi.getFriendDetail(friendId);
        if (result.success) {
          const { data } = result;
          setProfileImg(data.profileImg || "");
          setUserName(data.userName || "");
          setNickName(data.nickNameByMe || data.userName || "");
          setGoalDays(data.goalDays);
          setChatStyle(data.chatStyle);
          setChatTopic(data.chatTopic || []);
        }
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (friendId) initData();
  }, [friendId]);

  // 저장 처리
  // const handleSubmit = async () => {
  //   try {
  //     const payload = {
  //       nickNameByMe: nickname,
  //       goalDays,
  //       chatStyle,
  //       chatTopic,
  //     };
  //     const result = await friendsApi.saveFriendSetting(friendId, payload);
  //     if (result.success) {
  //       router.push("/friends");
  //     } else {
  //       alert(result.message || "설정 저장 실패");
  //     }
  //   } catch (err) {
  //     alert("네트워크 오류가 발생했습니다.");
  //   }
  // };

  // const friendData = FriendSettingData[myUserId]?.find(
  //   item => item.userId === friendId,
  // );

  // const userData = AllUsers.find(user => user.userId === friendId);

  // const baseUser = friendData ?? userData;
  // const userName = baseUser?.userName ?? "";
  // const profileImg = baseUser?.profileImg ?? "";

  // const initialNickname =
  //   friendData?.nickNameByFriend?.trim() ||
  //   friendData?.nickNameByMe?.trim() ||
  //   friendData?.userName ||
  //   userData?.userName ||
  //   "";

  // const [nickname, setNickName] = useState(initialNickname);
  // const [goalDays, setGoalDays] = useState<number | undefined>(
  //   friendData?.goalDays,
  // );
  // const [chatStyle, setChatStyle] = useState<ChatStyle | undefined>(
  //   friendData?.chatStyle as ChatStyle,
  // );
  // const [chatTopic, setChatTopic] = useState<ChatTopic[]>(
  //   (friendData?.chatTopic as ChatTopic[]) ?? [],
  // );

  // if (!friendData && !userData) {
  //   return;
  // }

  const isValid =
    nickname.trim().length > 0 &&
    !!chatStyle &&
    chatTopic.length > 0 &&
    goalDays != undefined;

  if (isLoading) return null;

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

      <div className="fixed bottom-0 w-full max-w-[440px] bg-white px-4 pt-[10px] pb-[52px]">
        <FullButton isActive={isValid} onClick={() => router.push("/friends")}>
          추가하기
        </FullButton>
      </div>
    </main>
  );
};

export default FriendSetting;
