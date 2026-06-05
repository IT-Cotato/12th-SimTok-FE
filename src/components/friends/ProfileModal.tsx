import { useRouter } from "next/navigation";

import CloseIcon from "@/assets/close-thin.svg";
import SettingIcon from "@/assets/setting.svg";

import { FullButton } from "../common/FullButton";
import { ProfileImagePicker } from "../common/ProfileImagePicker";

interface ProfileModalProps {
  profileImg?: string;
  userId: number;
  friendMemberId: number;
  userName: string;
  onClose: () => void;
}
export const ProfileModal = ({
  profileImg,
  userId,
  friendMemberId,
  userName,
  onClose,
}: ProfileModalProps) => {
  const router = useRouter();

  const handleStartChat = async () => {
    try {
      const res = await fetch(
        `/api/chat/rooms/direct/resolve?opponentMemberId=${friendMemberId}`,
      );
      if (!res.ok) {
        throw new Error(`direct resolve 실해 : ${res.status}`);
      }
      const result = await res.json();
      const chatData = result.data;
      if (!chatData) {
        throw new Error("direct resolve 응답에 data가 없습니다.");
      }
      const query = `?name=${encodeURIComponent(userName)}&img=${encodeURIComponent(profileImg || "")}&fsId=${userId}`;

      onClose();
      if (chatData?.exists) {
        router.push(`/chat/${chatData.roomId}${query}`);
      } else {
        router.push(`/chat/new${query}&target=${friendMemberId}`);
      }
    } catch (error) {
      console.error("채팅방 이동 실패:", error);
    }
  };

  return (
    <section className="fixed inset-0 z-100">
      <div className="bg-neutral-01/83 relative mx-auto h-full w-full max-w-[440px]">
        <div className="flex items-center justify-between px-4 py-[10px] pt-[8.5px]">
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="text-neutral-09 h-5 w-5 cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="설정"
            onClick={() => {
              router.push(`/friends/settings/${userId}?mode=edit`);
            }}
            className="text-neutral-09 h-6 w-6 cursor-pointer"
          >
            <SettingIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute bottom-0 flex w-full flex-col bg-white">
          <div className="absolute -top-[79px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-4">
            <ProfileImagePicker
              imageUrl={profileImg || null}
              width={174}
              height={174}
              radius={36}
              canEdit={false}
            />
            <p className="text-d2 text-neutral-01">{userName}</p>
          </div>

          <div className="mt-[158px] mb-[42px] px-4 py-[10px]">
            <FullButton onClick={handleStartChat}>대화하기</FullButton>
          </div>
        </div>
      </div>
    </section>
  );
};
