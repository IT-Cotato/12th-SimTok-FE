import { MessageInput } from "../common/MessageInput";

export const StoryBottomBar = () => {
  return (
    <footer className="flex gap-[5px] bg-black px-4 pt-4 pb-[11px]">
      <MessageInput blackMode={true} />
    </footer>
  );
};
