import { NavBar } from "@/components/common/NavBar";
import { Header } from "@/components/dailyRecord/Header";
import { RecordMissionCard } from "@/components/dailyRecord/MissionCard";
import { RecordMissionFeed } from "@/components/dailyRecord/MissionFeed";
import { SharedDiaryCard } from "@/components/dailyRecord/SharedDiaryCard";

import DailyRecordData from "@/mock/dailyRecord.json";

const DailyRecordPage = () => {
  const MY_ID = 101;
  const hasMyRecord = DailyRecordData.some(item => item.userId === MY_ID);

  return (
    <main className="flex w-full flex-col pb-[112px]">
      <Header />
      <RecordMissionCard hasMyRecord={hasMyRecord} />
      <div className="mt-[17.5px]">
        <RecordMissionFeed />
      </div>
      <SharedDiaryCard />
      <NavBar />
    </main>
  );
};
export default DailyRecordPage;
