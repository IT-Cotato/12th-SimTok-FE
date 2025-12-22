import AlarmIcon from "@/assets/bell.svg";
import PencilIcon from "@/assets/pencil.svg";

export const Header = () => {
  return (
    <header className="flex items-center justify-end gap-[117px] px-4 py-[10px]">
      <h1>하루기록</h1>
      <div className="flex items-center gap-2">
        <AlarmIcon className="h-6 w-6" />
        <PencilIcon className="h-6 w-6" />
      </div>
    </header>
  );
};
