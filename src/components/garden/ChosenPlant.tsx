import Image from "next/image";

import { b } from "framer-motion/client";

import { PLANT_SORT_INFO } from "@/constants/garden/plantList";

import { PlantSort } from "@/types/plant.type";

import { NameInput } from "../common/NameInput";
import { OnlyLoader } from "../common/OnlyLoader";

export type Plant = (typeof PLANT_SORT_INFO)[number];

interface ChosenPlantProps {
  plantSort: PlantSort;
  nickname: string;
  onChangeNickname?: (value: string) => void;
  isNicknameEditable?: boolean;
  width?: number;
  height?: number;
  bgWidth?: number;
}

export const ChosenPlant = ({
  nickname,
  plantSort,
  onChangeNickname,
  isNicknameEditable = false,
  width = 178,
  height = 239,
  bgWidth = 160,
}: ChosenPlantProps) => {
  const plantInfo = PLANT_SORT_INFO.find(info => info.id === plantSort);

  if (!plantInfo) {
    return <OnlyLoader />;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="relative flex justify-center">
        {/* 배경 */}
        <div
          className={`${plantInfo?.bgColor} rounded-[36px]`}
          style={{ width: `${bgWidth}px`, height: `${bgWidth}px` }}
        />

        {/* 이미지 */}
        <Image
          src={plantInfo?.img}
          width={width}
          height={height}
          alt="선택한 식물 이미지"
          className="absolute bottom-0"
        />
      </div>
      <NameInput
        value={nickname}
        onChange={onChangeNickname}
        placeholder={plantInfo?.name}
        changeable={isNicknameEditable}
      />
    </section>
  );
};
