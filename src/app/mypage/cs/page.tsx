import { BackHeader } from "@/components/common/BackHeader";

const menuItems = ["1:1 문의하기", "공지사항"];

const rowClass =
  "flex h-[71px] w-full items-center py-5 border-b border-neutral-10 text-h2 text-neutral-04 cursor-pointer";

const AlarmPage = () => {
  return (
    <main className="flex min-h-dvh w-full justify-center">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        <BackHeader title="고객센터" />
        <section className="mt-[18.5px]">
          {menuItems.map(label => (
            <div key={label} className={rowClass}>
              {label}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default AlarmPage;
