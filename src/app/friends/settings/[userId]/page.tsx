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

import { DEFAULT_CHAT_TOPICS } from "@/constants/friendsSettings";

import { ChatStyle, ChatTopic } from "@/types/friendProfile.type";

const FriendSetting = () => {
  const params = useParams();
  const router = useRouter();
  const friendId = Number(params.userId);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const initialName = searchParams.get("name") || "";
  const initialImg = searchParams.get("img") || "";
  const [profileImg, setProfileImg] = useState(initialImg);
  const [nickname, setNickName] = useState(initialName); // 상단 닉네임 (수정 가능 영역용)
  const [userName, setUserName] = useState(initialName); // 친구의 실제 본명 (수정 불가 영역용)
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

      const currentParams = new URLSearchParams(window.location.search);
      const nameFromUrl = currentParams.get("name") || "";
      const imgFromUrl = currentParams.get("img") || "";

      if (mode === "add") {
        setNickName(nameFromUrl);
        setUserName(nameFromUrl);
        setProfileImg(imgFromUrl);
        setActualFriendshipId(friendId);

        setIsLoading(false);
        return;
      }

      const friendshipId = Number(params.userId);
      const result = await friendsApi.getFriendDetail(friendshipId);
      const list = result?.data?.friendshipList;

      if (result?.success && Array.isArray(list)) {
        const friendInfo = list.find(
          f => Number(f.friendshipId) === friendshipId,
        );

        if (friendInfo) {
          setActualFriendshipId(friendInfo.friendshipId);
          setUserName(friendInfo.showName);
          setProfileImg(friendInfo.profileImageUrl || "");

          const detailResult = await getFriendshipSettings(
            friendInfo.friendshipId,
          );

          if (detailResult?.success && detailResult?.data) {
            const detail = detailResult.data;
            setNickName(detail.nickname || friendInfo.showName);
            setChatStyle(detail.speechStyle);
            setChatTopic(detail.topicCodes || []);

            if (detail.chatGoal) {
              const goalNum = parseInt(
                String(detail.chatGoal).replace(/[^0-9]/g, ""),
              );
              setGoalDays(goalNum);
            } else {
              setGoalDays(undefined);
            }
          }
        } else {
          console.error("리스트에서 해당 friendshipId를 찾을 수 없음.");
        }
      }
    } catch (err) {
      console.error("데이터 로드 에러:", err);
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
    if (!actualFriendshipId) return;

    try {
      const payload = {
        nickname: nickname,
        speechStyle: chatStyle ?? "존댓말",
        chatGoal: goalDays ?? 1,
        topicCodes: chatTopic.length > 0 ? chatTopic : DEFAULT_CHAT_TOPICS,
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
    } catch (error) {
      console.error("친구설정 오류:", error);
    }
  };
  const isValid = true;

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
          canEdit={false}
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
