import CloseIcon from "@/assets/close-thin.svg";

import { GARDEN_RULES } from "@/constants/garden/gardenRules";

interface GardenRulesProps {
  modalClose: () => void;
}
export const GardenRules = ({ modalClose }: GardenRulesProps) => {
  return (
    <main className="flex w-full flex-col rounded-2xl bg-white pb-5">
      <header className="flex h-[53px] items-center justify-end px-4 py-[10px]">
        <button onClick={modalClose}>
          <CloseIcon className="text-neutral-04 h-4 w-4 cursor-pointer" />
        </button>
      </header>
      <ul className="flex max-h-[490px] flex-col gap-[16px] overflow-y-scroll px-4">
        {GARDEN_RULES.map(rule => (
          <li key={rule.index} className="flex gap-2">
            <div className="text-h3 text-neutral-01">{rule.index}</div>
            <div className="text-h3 text-neutral-01">{rule.value}</div>
          </li>
        ))}
      </ul>
    </main>
  );
};
