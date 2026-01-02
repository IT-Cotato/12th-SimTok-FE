import { useState } from "react";

import HeartFillIcon from "@/assets/heart-fill.svg";
import HeartBlankIcon from "@/assets/heart.svg";
import SendIcon from "@/assets/messenger.svg";
import MicIcon from "@/assets/mic-stroke.svg";

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
      <div className="relative flex-1">
        <input className="border-neutral-07 bg-neutral-11 w-full rounded-2xl border border-solid px-4 py-1" />
        <button className="absolute top-1/2 right-4 -translate-y-1/2">
          <SendIcon className="text-neutral-04 h-6 w-6" />
        </button>
      </div>
    </footer>
  );
};
