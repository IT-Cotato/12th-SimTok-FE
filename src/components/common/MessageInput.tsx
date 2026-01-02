import { SendButton } from "@/assets/SendButton";

export const MessageInput = () => {
  return (
    <div className="relative flex-1">
      <input className="border-neutral-07 bg-neutral-11 w-full rounded-2xl border border-solid px-4 py-1" />
      <SendButton />
    </div>
  );
};
