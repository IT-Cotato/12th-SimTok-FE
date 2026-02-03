"use client";
import { useRouter } from "next/navigation";

import { useGardenStore } from "@/stores/useGardenStore";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { ChosenPlant } from "@/components/garden/ChosenPlant";
import ProgressDots from "@/components/onboarding/ProgressDots";

import { PlantSort } from "@/constants/plantList";

import FriendData from "@/mock/friendList.json";

const InviteMessagePage = () => {
  const router = useRouter();
  const nickname = useGardenStore(state => state.nickname);
  const plantId = useGardenStore(state => state.selectedPlantId);
  const friendId = useGardenStore(state => state.invitedFriendId);

  const message = useGardenStore(state => state.message);
  const setMessage = useGardenStore(state => state.setMessage);

  const selectedPlant = PlantSort.find(plant => plant.id === plantId);
  const friendName = FriendData.find(
    data => data.userId === friendId,
  )?.userName;
  if (!selectedPlant) return null;
  return (
    <main className="flex h-full w-full flex-col justify-center">
      <div className="mt-[8.5px] flex flex-1 flex-col">
        <BackHeader title="초대문구" />
        <ProgressDots total={3} current={2} />
      </div>

      <div className="mb-[42px] flex flex-col">
        <div className="flex flex-col items-center justify-center gap-1 gap-[1px]">
          <ChosenPlant plant={selectedPlant} nickname={nickname} />
          <div className="flex gap-2">
            {selectedPlant.meanings.map(text => (
              <p key={text} className="text-h3 text-green-01 px-2 py-[10px]">
                #{text}
              </p>
            ))}
          </div>
        </div>
        <section className="flex w-full justify-center px-4">
          <div className="border-mint-01 flex h-[212px] w-full max-w-[408px] flex-col gap-[10px] rounded-2xl border px-[37px] py-10">
            <p className="text-h1 text-neutral-01">💌{friendName}님!💌</p>
            <textarea
              placeholder={`함께 키우고 싶은 식물을 골라봤어요. 키우기 시작을 원하시면 초대를 수락해주세요☺️`}
              className="text-h2 scrollbar-hide placeholder:text-neutral-07 text-neutral-02 w-full resize-none focus:outline-none"
              rows={4}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </section>
        <section className="mt-9 px-4 py-[10px]">
          <FullButton
            isActive={!!message}
            onClick={() => router.push("/garden/new/invite/confirm")}
          >
            초대문자보내기
          </FullButton>
        </section>
      </div>
    </main>
  );
};
export default InviteMessagePage;
