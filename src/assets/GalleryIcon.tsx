import GalleryIcon from "@/assets/gallery.svg";

export const GalleryAssets = () => {
  return (
    <div className="flex" role="img" aria-label="갤러리 아이콘">
      <GalleryIcon className="z-20 h-[15px] w-[15px]" />
      <div className="bg-orange-00 text-sub2-sb z-10 -ml-[3px] flex h-[15px] w-[15px] items-center justify-center rounded-full">
        👀
      </div>
      <div className="bg-green-01 text-sub3 -ml-[3px] flex h-[15px] w-[15px] items-center justify-center rounded-full">
        ✍🏻
      </div>
    </div>
  );
};
