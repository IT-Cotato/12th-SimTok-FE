"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { friendsApi } from "@/app/api/friends";
import {
  getFriendshipSettings,
  updateFriendship,
} from "@/app/api/friendships/friend.api";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ProfileWrapper } from "@/components/common/ProfileWrapper";
import { SettingField } from "@/components/friends/SettingField";

import { ChatStyle, ChatTopic } from "@/types/friendProfile.type";

const FriendSetting = () => {
  const params = useParams();
  const router = useRouter();
  const friendId = Number(params.userId);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const [profileImg, setProfileImg] = useState("");
  const [userName, setUserName] = useState(""); // 친구의 실제 본명 (수정 불가 영역용)
  const [nickname, setNickName] = useState(""); // 상단 닉네임 (수정 가능 영역용)
  const [goalDays, setGoalDays] = useState<number | undefined>();
  const [chatStyle, setChatStyle] = useState<ChatStyle | undefined>();
  const [chatTopic, setChatTopic] = useState<ChatTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actualFriendshipId, setActualFriendshipId] = useState<number | null>(
    null,
  );

  const buttonText = mode === "add" ? "추가하기" : "확인완료";

  // 초기 데이터 로드
  const initData = async () => {
    try {
      setIsLoading(true);
      const result = await friendsApi.getFriendDetail(friendId);
      const list = result?.data?.friendshipList;

      if (result?.success && Array.isArray(list)) {
        const friendInfo = list.find(f => f.friendId === friendshipId);

        if (friendInfo) {
          const fsId = friendInfo.friendshipId;
          setActualFriendshipId(fsId);

          setUserName(friendInfo.showName);
          setProfileImg(friendInfo.profileImageUrl || "");

          const detailResult = await getFriendshipSettings(fsId);

          if (detailResult?.success && detailResult?.data) {
            const detail = detailResult.data;

            setNickName(detail.nickname || friendInfo.showName);
            const mappedStyle: ChatStyle =
              detail.speechStyle === "반말" ? "CASUAL" : "FORMAL";
            setChatStyle(mappedStyle);
            setChatTopic(detail.topicCodes || []);
            if (detail.chatGoal !== undefined && detail.chatGoal !== null) {
              const goalStr = String(detail.chatGoal);
              const goalNum = parseInt(goalStr.replace(/[^0-9]/g, ""));
              setGoalDays(isNaN(goalNum) ? undefined : goalNum);
            }
          }
        }
      }
    } catch (err) {
      console.error("❌ 데이터 로드 에러:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (friendId) {
      initData();
    }
  }, [friendId]);

  // 저장 처리
  const handleSubmit = async () => {
    if (
      !actualFriendshipId ||
      !nickname ||
      !chatStyle ||
      goalDays === undefined
    ) {
      alert("모든 설정 값을 선택해 주세요.");
      return;
    }

    try {
      const mappedStyle: "존댓말" | "반말" =
        chatStyle === "FORMAL" ? "존댓말" : "반말";
      const formattedGoal = `${goalDays}`;

      const payload: UpdateFriendshipPayload = {
        nickname: nickname.trim(),
        speechStyle: mappedStyle,
        chatGoal: formattedGoal,
        topicCodes: chatTopic,
      };

      const result = await updateFriendship(actualFriendshipId, payload);

      if (result.success) {
        // 모드에 따른 동적 라우팅
        if (mode === "add") {
          router.push("/friends");
        } else {
          router.back();
        }
      }
    } catch (err) {
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const isValid =
    nickname.trim().length > 0 &&
    !!chatStyle &&
    chatTopic.length > 0 &&
    goalDays !== undefined;

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
          canEdit={true}
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
        <FullButton isActive={isValid} onClick={handleSubmit}>
          {buttonText}
        </FullButton>
      </div>
    </main>
  );
};

export default FriendSetting;
