import MicIcon from "@/assets/mic.svg";
import SearchIcon from "@/assets/search.svg";

interface SearchBoxProps {
  placeholder?: string;
}

export const SearchBox = ({
  placeholder = "친구이름을 검색해보세요",
}: SearchBoxProps) => {
  return (
    <div className="px-4">
      <div className="bg-neutral-11 flex items-center gap-2 rounded-[16px] px-4 py-2">
        <SearchIcon className="h-5 w-6" />
        <input
          type="text"
          placeholder={placeholder}
          className="text-sub1-r placeholder:text-neutral-07 w-full text-black focus:outline-none"
        />
        <MicIcon />
      </div>
    </div>
  );
};
