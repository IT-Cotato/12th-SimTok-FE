import { BackHeader } from "@/components/common/BackHeader";
import { AlarmItem } from "@/components/mypage/AlarmItem";

import { ALARM_MENU_ITEMS } from "@/constants/alarm";

const AlarmPage = () => {
  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="flex h-full w-110 flex-col">
        <BackHeader title="알림설정" />
        <section className="mt-[43.5px] flex flex-col gap-[26px] px-4">
          {ALARM_MENU_ITEMS.map(item => (
            <AlarmItem key={item.id} label={item.label} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default AlarmPage;
