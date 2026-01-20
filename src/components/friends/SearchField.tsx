import { useState } from "react";

import MicIcon from "@/assets/mic-stroke.svg";
import SearchIcon from "@/assets/search.svg";

interface SearchFieldProps {
  searchText: string;
  onChangeSearchText: (value: string) => void;
}

export const SearchField = ({
  searchText,
  onChangeSearchText,
}: SearchFieldProps) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <div
      className={`${isClick ? "border-mint-01 border bg-white" : "bg-neutral-11"} relative flex w-full items-center rounded-2xl px-4 py-2`}
      onClick={() => setIsClick(true)}
    >
      <div className="flex flex-1 items-center gap-[10px] pr-8">
        <SearchIcon
          className={`${isClick ? "text-mint-01" : "text-neutral-07"} h-5 w-5`}
        />
        <input
          type="text"
          placeholder="친구이름을 검색해보세요"
          className="text-sub0 text-neutral-01 w-full focus:outline-none"
          onChange={e => onChangeSearchText(e.target.value)}
        ></input>
      </div>
      <MicIcon
        className={`${isClick ? "text-neutral-02" : "text-neutral-07"} absolute top-1/2 right-4 h-6 w-6 -translate-y-1/2`}
      />
    </div>
  );
};
