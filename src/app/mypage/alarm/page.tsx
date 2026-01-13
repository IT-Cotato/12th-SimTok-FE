import { BackHeader } from "@/components/common/BackHeader";
import Toggle from "@/components/common/Toggle";

const menuItems = [
  "채팅 알림",
  "물주기 알림",
  "식물 상태변화 알림",
  "챌린지 알림",
  "좋아요 알림",
  "댓글 알림",
];

const baseItemClass =
  "flex h-[71px] w-full items-center py-5 border-b border-neutral-10 text-h2 text-neutral-04 cursor-pointer";

const AlarmPage = () => {
  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        <BackHeader title="알림설정" />
        <section className="mt-[18.5px]">
          {menuItems.map(label => (
            <div key={label} className={`${baseItemClass} justify-between`}>
              <span>{label}</span>
              <div className="flex items-center">
                <Toggle defaultOn />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default AlarmPage;
