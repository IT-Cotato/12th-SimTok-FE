import { NavBar } from "@/components/common/NavBar";
import { Header } from "@/components/dailyRecord/Header";
import { RecordMissionCard } from "@/components/dailyRecord/MissionCard";

const DailyRecordPage = () => {
  return (
    <main className="flex w-full flex-col pb-[112px]">
      <Header />
      <RecordMissionCard />
      <div className="mt-[13px]"></div>
      <NavBar />
    </main>
  );
};
export default DailyRecordPage;
