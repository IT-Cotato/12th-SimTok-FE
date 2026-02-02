import Image from "next/image";

import { PlantSort } from "@/constants/plantList";

import { NameInput } from "../common/NameInput";

export type Plant = (typeof PlantSort)[number];

interface ChosenPlantProps {
  plant: Plant;
  nickname: string;
  onChangeNickname: (value: string) => void;
}

export const ChosenPlant = ({
  nickname,
  plant,
  onChangeNickname,
}: ChosenPlantProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="relative flex justify-center">
        {/* 배경 */}
        <div className={`${plant.bgColor} h-40 w-40 rounded-[36px]`} />

        {/* 이미지 */}
        <Image
          src={plant.img}
          width={178}
          height={239}
          alt="선택한 식물 이미지"
          className="absolute bottom-0"
        />
      </div>
      <NameInput
        value={nickname}
        onChange={onChangeNickname}
        placeholder={plant.name}
      />
    </section>
  );
};
