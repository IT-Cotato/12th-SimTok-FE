import { HeaderWithIcon } from "@/components/common/HeaderWithIcon";
import { NavBar } from "@/components/common/NavBar";
import { RecordMissionFeed } from "@/components/dailyRecord/MissionFeed";
import { RecordMissionInfo } from "@/components/dailyRecord/MissionInfo";
import { SharedDiaryCard } from "@/components/dailyRecord/SharedDiaryCard";

import DailyRecordData from "@/mock/dailyRecord.json";

const DailyRecordPage = () => {
  const MY_ID = 111;
  const hasMyRecord = DailyRecordData.some(item => item.userId === MY_ID);

  return (
    <main className="flex w-full flex-col pb-[112px]">
      <HeaderWithIcon title="하루기록" havePencil={true} haveAlarm={false} />
      <RecordMissionInfo hasMyRecord={hasMyRecord} />
      <div className="mt-[17.5px]">
        <RecordMissionFeed />
      </div>
      <SharedDiaryCard />
      <NavBar />
    </main>
  );
};
export default DailyRecordPage;
