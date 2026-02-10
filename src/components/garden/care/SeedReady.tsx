import Seed from "@/assets/garden/before_start.svg";
import Pot from "@/assets/garden/pot.svg";
import Circle from "@/assets/garden/seedCircle.svg";

import { PageTitle } from "@/components/common/PageTitle";
import { InfoMessage } from "@/components/dailyRecord/InfoMessage";

import { GardenTitle } from "@/constants/garden/gardenCare";

export const SeedReady = () => {
  const pageTitle = GardenTitle.find(
    item => item.state === "SEED_READY",
  )?.title;
  return (
    <section className="z-99 flex w-full flex-1 flex-col justify-between">
      <PageTitle title={pageTitle} />
      <div className="flex flex-col items-center justify-center gap-[17px]">
        <div className="relative flex h-[176px] w-full items-center justify-center">
          <Circle className="absolute h-[176px] w-[176px]" />
          <Seed className="absolute h-[78px] w-[55px]" />

          {/* InfoMessage */}
          <div className="absolute right-[58px] bottom-[144.8px]">
            <InfoMessage text="씨앗을 눌러 심어주세요" triangleUp={false} />
          </div>
        </div>

        <div className="z-99">
          <Pot className="h-[187px] w-[203px]" />
        </div>
      </div>
    </section>
  );
};
