import { GrowthStage } from "@/types/plant.type";

interface ProgressSectionProps {
  plantName?: string;
  growthStage?: GrowthStage;
  percentage?: number;
}

export const ProgressSection = ({
  plantName,
  growthStage,
  percentage = 0,
}: ProgressSectionProps) => {
  return (
    <section className="flex w-full flex-col gap-[7px] rounded-2xl bg-white p-4 shadow-[0_0_14px_0_rgba(0,0,0,0.08)]">
      {plantName ? (
        <div className="flex gap-[3px]">
          <p>🌱</p>
          <p>{plantName}</p>
          <p> {growthStage}</p>
          <p>🌱</p>
        </div>
      ) : (
        <div>🌱</div>
      )}

      <div className="flex w-full items-center gap-[49px]">
        {/* progress bar 영역 */}
        <div className="bg-neutral-08 h-2 flex-1 overflow-hidden rounded-sm">
          <div
            className="bg-orange-01 h-full rounded-sm transition-[width]"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* percentage text */}
        <p className="text-sub1-sb text-neutral-03 whitespace-nowrap">
          {percentage}%
        </p>
      </div>
    </section>
  );
};
