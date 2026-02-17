import CloseIcon from "@/assets/close-thin.svg";
import PillIcon from "@/assets/garden/pill.svg";

interface NoNutritionProps {
  onClose: () => void;
}
export const NoNutrition = ({ onClose }: NoNutritionProps) => {
  return (
    <div className="fixed inset-0 z-[100] mx-auto flex max-w-[440px] items-center justify-center bg-black/83">
      <section className="relative flex w-full max-w-[353px] flex-col items-center rounded-2xl bg-white py-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <CloseIcon className="text-neutral-04 h-4 w-4" />
        </button>
        <h3 className="text-h3 text-orange-00 font-bold">보유 영양제 없음</h3>
        <div className="mt-[39.5px] mb-[37px]">
          <PillIcon className="h-[111px] w-[116px] bg-blend-luminosity" />
        </div>

        <div className="flex w-full flex-col items-center gap-[10px]">
          <p className="text-d3 text-neutral-01">
            일기와 챌린지로 영양제를 모아보세요
          </p>
          <button
            className="bg-mint-01 text-button-sb w-[90px] cursor-pointer rounded-2xl p-[10px] text-white"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </section>
    </div>
  );
};
