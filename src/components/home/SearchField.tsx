import MicIcon from "@/assets/mic-stroke.svg";
import SearchIcon from "@/assets/search.svg";

export const SearchField = () => {
  return (
    <div className="bg-neutral-11 relative w-full px-4 py-2">
      <div className="flex items-center gap-[10px]">
        <SearchIcon className="text-neutral-07 h-5 w-5" />
        <input type="text" placeholder="친구이름을 검색해보세요"></input>
      </div>
      <MicIcon className="text-neutral-07 absolute right-0 h-5 w-5" />
    </div>
  );
};
