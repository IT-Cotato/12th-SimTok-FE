import EmptyPod from "@/assets/garden/pot_blank.svg";

import { PageTitle } from "@/components/common/PageTitle";
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { GARDEN_STATE_ITEM } from "@/constants/garden/gardenCare";

import { GardenState } from "@/types/plant.type";

export const EmptyPlant = () => {
  const emptyTitle = GARDEN_STATE_ITEM.find(
    item => item.state === ("EMPTY" satisfies GardenState),
  )?.title;

  return (
    <div className="flex flex-1 flex-col items-center justify-between">
      <section className="mt-[50.5px] w-full self-start">
        <PageTitle title={emptyTitle} />
      </section>

      <section className="relative mb-[244px] flex w-[239px] flex-col gap-[22.8px]">
        <div className="self-end">
          <InfoMessage
            text="친구와 원하는 식물을 키울 수 있어요."
            triangleUp={false}
          />
        </div>

        <EmptyPod />
      </section>
    </div>
  );
};
