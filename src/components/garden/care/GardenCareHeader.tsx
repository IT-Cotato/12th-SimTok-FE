import MenuIcon from "@/assets/list.svg";

import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";

interface GardenCareHeaderProps {
  selectTitle: "left" | "right";
  onChangeSelectTitle: (value: "left" | "right") => void;
}

export const GardenCareHeader = ({
  selectTitle,
  onChangeSelectTitle,
}: GardenCareHeaderProps) => {
  return (
    <div className="relative w-full items-center justify-center">
      <GlassStyleHeader
        leftText="정원"
        rightText="키우기"
        bgColor="bg-green-05"
        selectTitle={selectTitle}
        onChangeSelectTitle={onChangeSelectTitle}
      />
      <button className="absolute top-1/2 right-4 -translate-y-1/2 p-2">
        <MenuIcon className="text-neutral-04 h-6 w-6 cursor-pointer" />
      </button>
    </div>
  );
};
