import SendIcon from "@/assets/messenger.svg";

interface SendButtonProps {
  hasText: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const SendButton = ({ hasText = false, onClick }: SendButtonProps) => {
  return (
    <button
      className="bg-mint-01 flex h-[38px] w-13 items-center justify-center rounded-[24px]"
      onClick={onClick}
    >
      <SendIcon
        className={`h-[25px] w-[25px] text-white ${hasText ? "cursor-pointer" : ""}`}
      />
    </button>
  );
};
