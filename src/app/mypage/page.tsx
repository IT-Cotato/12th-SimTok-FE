import { BackHeader } from "@/components/common/BackHeader";
import { NavBar } from "@/components/common/NavBar";

const menuItems = [
  "내 프로필 설정",
  "메시지 예약내역",
  "알림설정",
  "배경화면",
  "고객센터",
];

const baseItemClass =
  "flex h-[71px] w-full items-center px-4 py-5 border-b border-neutral-10 text-d3 text-neutral-04 cursor-pointer";

const MyPage = () => {
  return (
    <main className="flex min-h-dvh justify-center">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <BackHeader title="마이페이지" />
        <section className="mt-[18.5px]">
          {menuItems.map(label => (
            <button key={label} type="button" className={baseItemClass}>
              {label}
            </button>
          ))}
        </section>
      </div>
      <NavBar />
    </main>
  );
};

export default MyPage;
