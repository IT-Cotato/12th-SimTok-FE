import BellIcon from "@/assets/bell_chat.svg";

import { BackHeader } from "@/components/common/BackHeader";

const ChatListPage = () => {
  return (
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <BackHeader title="대화" showBackIcon={false}>
          <button className="flex items-center justify-center">
            <BellIcon className="h-6 w-6" />
          </button>
        </BackHeader>
      </div>
    </main>
  );
};

export default ChatListPage;
