"use client";
import { useGardenStore } from "@/stores/useGardenStore";

import { BackHeader } from "@/components/common/BackHeader";
import { ChosenPlant } from "@/components/garden/ChosenPlant";
import ProgressDots from "@/components/onboarding/ProgressDots";

import { PlantSort } from "@/constants/plantList";

import FriendData from "@/mock/friendList.json";

const InviteMessagePage = () => {
  const nickname = useGardenStore(state => state.nickname);
  const plantId = useGardenStore(state => state.selectedPlantId);
  const friendId = useGardenStore(state => state.invitedFriendId);

  const selectedPlant = PlantSort.find(plant => plant.id === plantId);
  const friendName = FriendData.find(
    data => data.userId === friendId,
  )?.userName;
  if (!selectedPlant) return null;
  return (
    <main className="flex w-full flex-col">
      <div className="mt-[8.5px]">
        <BackHeader title="친구목록" />
        <ProgressDots total={3} current={1} />
      </div>
      <div className="mt-18">
        <ChosenPlant plant={selectedPlant} nickname={nickname} />
      </div>
    </main>
  );
};
export default InviteMessagePage;
