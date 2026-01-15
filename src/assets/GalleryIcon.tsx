import GalleryIcon from "@/assets/gallery.svg";
import HandIcon from "@/assets/hand-with-pen.svg";
import EyesIcon from "@/assets/two-eyes.svg";

export const GalleryAssets = () => {
  return (
    <div className="flex" role="img" aria-label="갤러리 아이콘">
      <GalleryIcon className="z-20 h-[15px] w-[15px]" />
      <div className="bg-orange-00 z-10 -ml-[3px] flex h-[15px] w-[15px] items-center justify-center rounded-full">
        <EyesIcon className="w-[18px]" />
      </div>
      <div className="bg-green-01 -ml-[3px] flex h-[15px] w-[15px] items-center justify-center rounded-full">
        <HandIcon className="w-[13px]" />
      </div>
    </div>
  );
};
