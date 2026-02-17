"use client";
import { useEffect, useState } from "react";

import { HeaderWithIcon } from "@/components/common/HeaderWithIcon";
import { NavBar } from "@/components/common/NavBar";
import { RecordMissionFeed } from "@/components/dailyRecord/MissionFeed";
import { RecordMissionInfo } from "@/components/dailyRecord/MissionInfo";
import { SharedDiaryCard } from "@/components/dailyRecord/SharedDiaryCard";

import { MyDayLog } from "@/types/dailyRecord.type";

import { getMyDayLog } from "../api/dailyRecord/dayLog.api";

const DailyRecordPage = () => {
  const [myData, setMyData] = useState<MyDayLog | null>(null);
  useEffect(() => {
    const fetchMyDayLog = async () => {
      try {
        const data = await getMyDayLog();
        setMyData(data);
        console.log("내 하루기록:", data);
      } catch (error) {
        console.error("내 하루기록 로드 실패:", error);
      }
    };
    fetchMyDayLog();
  }, []);

  const hasMyRecord = myData?.isCompleted === true;

  return (
    <main className="flex w-full flex-col pb-[112px]">
      <HeaderWithIcon title="하루기록" havePencil={true} haveAlarm={false} />
      <RecordMissionInfo hasMyRecord={hasMyRecord} />
      <div className="mt-[17.5px]">
        <RecordMissionFeed myRecord={myData} />
      </div>
      <SharedDiaryCard />
      <NavBar />
    </main>
  );
};
export default DailyRecordPage;
