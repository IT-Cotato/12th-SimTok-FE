import SendIcon from "@/assets/messenger.svg";

export const SendButton = () => {
  return (
    <button className="- absolute top-1 right-4 mx-[2px] my-[3px] rotate-[-23deg]">
      <SendIcon className="text-neutral-04 h-[18px] w-[20px]" />
    </button>
  );
};
