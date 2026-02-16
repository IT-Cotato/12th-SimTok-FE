import PlayIcon from "@/assets/play-green.svg";

// 프로젝트 내 아이콘 경로 확인

interface AudioPlayerProps {
  duration: string;
}

export const AudioPlayer = ({ duration = "00:04" }: AudioPlayerProps) => {
  return (
    <div className="w-full px-4">
      <div className="border-primary-green flex h-[54px] w-full items-center justify-between rounded-[18px] border-[1.5px] bg-white px-4 shadow-sm">
        <div className="flex flex-1 items-center gap-3">
          <button className="flex h-6 w-6 items-center justify-center">
            <PlayIcon className="fill-primary-green h-4 w-4" />
          </button>

          <div className="relative flex flex-1 items-center">
            <div className="border-neutral-06 h-[2px] w-full border-t-[3px] border-dotted" />
            <div className="bg-neutral-06 absolute right-0 h-3 w-[2px]" />
          </div>
        </div>

        <span className="text-body-sm text-primary-green ml-4 font-medium">
          {duration}
        </span>
      </div>
    </div>
  );
};
