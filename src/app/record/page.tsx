import { NavBar } from "@/components/common/NavBar";
import { Header } from "@/components/dailyRecord/Header";
import { RecordMissionCard } from "@/components/dailyRecord/MissionCard";
import { RecordMissionFeed } from "@/components/dailyRecord/MissionFeed";
import { SharedDiaryCard } from "@/components/dailyRecord/SharedDiaryCard";

const DailyRecordPage = () => {
  return (
    <main className="flex w-full flex-col pb-[112px]">
      <Header />
      <RecordMissionCard />
      <div className="mt-[17.5px]">
        <RecordMissionFeed />
      </div>
      <SharedDiaryCard />
      <NavBar />
    </main>
  );
};
export default DailyRecordPage;
