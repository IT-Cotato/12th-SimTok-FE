import SendIcon from "@/assets/messenger.svg";

interface SendButtonProps {
  hasText: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const SendButton = ({ hasText = false, onClick }: SendButtonProps) => {
  return (
    <button
      className="absolute top-1 right-4 rotate-[-23deg] px-[2px] py-[3px]"
      onClick={onClick}
    >
      <SendIcon
        className={`text-neutral-04 h-[18px] w-[20px] ${hasText ? "cursor-pointer" : ""}`}
      />
    </button>
  );
};
