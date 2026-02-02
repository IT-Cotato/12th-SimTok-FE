"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useGardenStore } from "@/stores/useGardenStore";

import { BackHeader } from "@/components/common/BackHeader";
import { FullButton } from "@/components/common/FullButton";
import { PageTitle } from "@/components/common/PageTitle";
import { ChosenPlant } from "@/components/garden/ChosenPlant";
import ProgressDots from "@/components/onboarding/ProgressDots";

import { PlantSort } from "@/constants/plantList";

const PlantNicknamePage = () => {
  const router = useRouter();
  const selectedPlantId = useGardenStore(state => state.selectedPlantId);
  const setPlantNickname = useGardenStore(state => state.setNickname);

  const selectedPlant = PlantSort.find(plant => plant.id === selectedPlantId);

  const [nickname, setNickname] = useState("");

  const handleNextStep = () => {
    setPlantNickname(nickname.trim());
    router.push("/garden/new/invite");
  };

  return (
    <main className="flex h-full flex-col">
      <section className="flex flex-1 flex-col">
        <BackHeader title="식물이름변경" />
        <ProgressDots total={3} current={0} />
        <div className="mt-[29px]">
          <PageTitle>
            친구와 함께 키울 <br />
            식물의 이름을 만들어보세요.
          </PageTitle>
        </div>
        {selectedPlant && (
          <div className="absolute bottom-[271px] left-1/2 flex -translate-x-1/2 justify-center">
            <ChosenPlant
              nickname={nickname}
              plant={selectedPlant}
              onChangeNickname={setNickname}
              isNicknameEditable={true}
            />
          </div>
        )}
      </section>
      <section className="mb-[42px] px-4 py-[10px]">
        <FullButton isActive={!!nickname} onClick={handleNextStep}>
          입력완료
        </FullButton>
      </section>
    </main>
  );
};
export default PlantNicknamePage;
