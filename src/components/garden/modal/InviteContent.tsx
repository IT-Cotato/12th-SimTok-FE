import CloseButton from "@/assets/close-thin.svg";

import { OnlyLoader } from "@/components/common/OnlyLoader";

import { PLANT_SORT_INFO } from "@/constants/garden/plantList";

import { PlantSort } from "@/types/plant.type";
import { InvitationContent } from "@/types/plantInvite.type";

import { ChosenPlant } from "../ChosenPlant";

interface InviteContentProps {
  onClose: () => void;
  setStep: (step: number) => void;
  inviteData: InvitationContent;
}
export const InviteContent = ({
  onClose,
  setStep,
  inviteData,
}: InviteContentProps) => {
  const plantMeans = PLANT_SORT_INFO.find(
    plant => plant.id === inviteData.plantSort,
  )?.meanings;

  if (!inviteData) {
    return <OnlyLoader />;
  }

  return (
    <section className="relative flex h-[545px] w-[353px] flex-col items-center rounded-2xl bg-white">
      <CloseButton
        className="text-neutral-04 absolute top-4 right-4 h-4 w-4 cursor-pointer"
        onClick={onClose}
      />
      <div className="mt-[108px]">
        <ChosenPlant
          isNicknameEditable={false}
          nickname={inviteData.nickname}
          plantSort={inviteData.plantSort as PlantSort}
          width={126}
          height={87}
          bgWidth={128}
        />
        <div className="flex gap-2">
          {plantMeans?.map((meaning, index) => (
            <p
              key={index}
              className="text-sub2-sb text-green-01 px-[6.4px] py-2"
            >
              #{meaning}
            </p>
          ))}
        </div>
      </div>

      {/* 초대장 메세지 */}
      <div className="mt-4 mb-9 flex w-full flex-col items-start gap-2 px-9">
        <p className="text-sub0-sb text-neutral-01">
          💌 {inviteData.inviterName}님! 💌
        </p>
        <p className="text-sub1-sb text-neutral-01">{inviteData.message}</p>
      </div>

      {/* 버튼 */}
      <div className="flex w-full gap-2 px-4">
        <button className="bg-neutral-11 text-button-sb text-neutral-05 w-full flex-1 cursor-pointer rounded-2xl p-[10px]">
          거절하기
        </button>
        <button
          className="bg-mint-01 text-button-sb w-full flex-1 cursor-pointer rounded-2xl p-[10px] text-white"
          onClick={() => setStep(3)}
        >
          초대 수락하기
        </button>
      </div>
    </section>
  );
};
