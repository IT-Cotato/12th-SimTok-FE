import { BackHeader } from "@/components/common/BackHeader";
import { ListItem } from "@/components/mypage/ListItem";

import { ALARM_MENU_ITEMS } from "@/constants/alarm";

const AlarmPage = () => {
  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="flex h-full w-110 flex-col">
        <BackHeader title="알림설정" />
        <ul className="mt-[43.5px] flex flex-col">
          {ALARM_MENU_ITEMS.map(item => (
            <li key={item.id}>
              <ListItem label={item.label} hasToggle toggleDefaultOn />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default AlarmPage;
