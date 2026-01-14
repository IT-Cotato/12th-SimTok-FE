import BellIcon from "@/assets/bell_chat.svg";

import { BackHeader } from "@/components/common/BackHeader";
import { SearchBox } from "@/components/common/SearchBox";

const ChatListPage = () => {
  return (
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <BackHeader title="대화" showBackIcon={false}>
          <button className="flex items-center justify-center">
            <BellIcon />
          </button>
        </BackHeader>

        <SearchBox />
      </div>
    </main>
  );
};

export default ChatListPage;
