import MicIcon from "@/assets/mic-stroke.svg";
import SearchIcon from "@/assets/search.svg";

export const SearchField = () => {
  return (
    <div className="bg-neutral-11 relative flex w-full items-center rounded-2xl px-4 py-2">
      <div className="flex flex-1 items-center gap-[10px] pr-8">
        <SearchIcon className="text-neutral-07 h-5 w-5" />
        <input
          type="text"
          placeholder="친구이름을 검색해보세요"
          className="w-full focus:outline-none"
        ></input>
      </div>
      <MicIcon className="text-neutral-07 absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2" />
    </div>
  );
};
