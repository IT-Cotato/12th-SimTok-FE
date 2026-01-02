import SendIcon from "@/assets/messenger.svg";

export const SendButton = () => {
  return (
    <button className="- absolute top-1 right-4 px-[2px] py-[3px]">
      <SendIcon className="text-neutral-04 h-[18px] w-[20px]" />
    </button>
  );
};
