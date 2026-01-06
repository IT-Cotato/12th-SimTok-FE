import { useState } from "react";

import HeartFillIcon from "@/assets/heart-fill.svg";
import HeartBlankIcon from "@/assets/heart.svg";
import MicIcon from "@/assets/mic-stroke.svg";

import { MessageInput } from "../common/MessageInput";

export const StoryBottomBar = () => {
  const [heartClicked, setHeartClicked] = useState(false);
  return (
    <footer className="flex gap-[5px] bg-white px-4 pt-4 pb-16">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setHeartClicked(prev => !prev)}
          className="h-8 w-8 cursor-pointer"
        >
          {heartClicked ? (
            <HeartFillIcon className="h-8 w-8" />
          ) : (
            <HeartBlankIcon className="h-8 w-8" />
          )}
        </button>
        <button type="button" className="h-8 w-8 cursor-pointer">
          <MicIcon className="text-neutral-04 h-8 w-8 py-[3px]" />
        </button>
      </div>
      <MessageInput />
    </footer>
  );
};
