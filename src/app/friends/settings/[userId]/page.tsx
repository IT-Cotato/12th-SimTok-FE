"use client";
import { useParams, useRouter } from "next/navigation";

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

interface UpdateFriendshipPayload {
  nickname: string;
  speechStyle: ChatStyle;
  chatGoal: string;
  topicCodes: ChatTopic[];
}

interface Friendship {
  friendshipId: number;
  friendId: number;
  showName: string;
  profileImageUrl: string | null;
  status: string;
  lastInteractedAt: string;
}

interface FriendDetailResponse {
  success: boolean;
  data: {
    count: number;
    friendshipList: Friendship[];
  };
}

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
  const [actualFriendshipId, setActualFriendshipId] = useState<number | null>(
    null,
  );

  // 초기 데이터 로드
  const initData = async () => {
    try {
      setIsLoading(true);
      console.log("🔍 1단계: 목록 조회 시작", friendId);
      const result = await friendsApi.getFriendDetail(friendId);

      const list = result?.data?.friendshipList;
      console.log("🔍 2단계: 가져온 목록", list);

      if (result?.success && Array.isArray(list)) {
        const friendInfo = list.find(f => f.friendId === friendId) || list[0];

        if (friendInfo) {
          console.log("✅ 매칭된 친구 정보:", friendInfo);
          const fsId = friendInfo.friendshipId;
          setActualFriendshipId(fsId);

          console.log("🔍 3단계: 상세 설정 조회 호출 ID:", fsId);
          // 여기서 get/api/friendships/setting 호출
          const detailResult = await getFriendshipSettings(fsId);
          console.log("🔍 4단계: 상세 설정 결과", detailResult);

          if (detailResult?.success && detailResult?.data) {
            const detail = detailResult.data;

            // 1. 닉네임 세팅
            setNickName(detail.nickname || friendInfo.showName);

            // 2. 말투 세팅 (ChatStyle 타입 일치 확인 필요)
            setChatStyle(detail.speechStyle);

            // 3. 관심사 세팅
            setChatTopic(detail.topicCodes || []);

            // 4. 목표 요일 세팅 (문자열 "주 1일" -> 숫자 1 추출)
            if (detail.chatGoal) {
              const goalNum = parseInt(detail.chatGoal.replace(/[^0-9]/g, ""));
              setGoalDays(isNaN(goalNum) ? undefined : goalNum);
            }

            console.log("✅ 상태 업데이트 완료:", {
              nickname: detail.nickname,
              chatStyle: detail.speechStyle,
              goalDays: detail.chatGoal,
            });
          }
        } else {
          console.warn("❗ 리스트에서 해당 friendId를 찾지 못함");
        }
      }
    } catch (err) {
      console.error("❌ 초기 데이터 로드 에러:", err);
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
      const payload: UpdateFriendshipPayload = {
        nickname: nickname,
        speechStyle: chatStyle,
        chatGoal: `주 ${goalDays}일`,
        topicCodes: chatTopic,
      };
      const result = await updateFriendship(actualFriendshipId, payload);

      if (result.success) {
        router.push("/friends");
      } else {
        alert(result.message || "설정 저장 실패");
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
        <FullButton isActive={isValid} onClick={handleSubmit}>
          추가하기
        </FullButton>
      </div>
    </main>
  );
};

export default FriendSetting;
