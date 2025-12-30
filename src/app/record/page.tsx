import { NavBar } from "@/components/common/NavBar";
import { Header } from "@/components/dailyRecord/Header";
import { RecordMissionCard } from "@/components/dailyRecord/MissionCard";
import { RecordMissionFeed } from "@/components/dailyRecord/MissionFeed";

const DailyRecordPage = () => {
  return (
    <main className="flex w-full flex-col pb-[112px]">
      <Header />
      <RecordMissionCard />
      <div className="mt-[13px]">
        <RecordMissionFeed />
      </div>
      <NavBar />
    </main>
  );
};
export default DailyRecordPage;
