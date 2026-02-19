"use client";
import { useEffect, useState } from "react";

import { getChallengeDashboard } from "@/app/api/dailyRecord/dayLog.api";

import { BackHeader } from "@/components/common/BackHeader";
import { OnlyLoader } from "@/components/common/OnlyLoader";
import { DailyMissionCard } from "@/components/dailyPhoto/DailyMissionCard";
import { DailyMissionProgress } from "@/components/dailyPhoto/DailyMissionProgress";

import { MISSION_STATUS } from "@/constants/missionCard";

import {
  MissionInfo,
  MyChallenge,
  WeeklyStatus,
} from "@/types/dailyRecord.type";

const DayStoryUpload = () => {
  const [status, setStatus] =
    useState<keyof typeof MISSION_STATUS>("NOT_STARTED");
  const [missionData, setMissionData] = useState<MissionInfo>();
  const [weeklyStatus, setWeeklyStatus] = useState<WeeklyStatus[]>([]);
  const [myChallenge, setMyChallenge] = useState<MyChallenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      setIsLoading(true);
      try {
        const data = await getChallengeDashboard();
        setMissionData(data.mission);
        setWeeklyStatus(data.weeklyStatus);
        setMyChallenge(data.myChallenge);

        if (data.myChallenge) {
          setStatus("IMAGE_CONFIRMED");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("미션 정보 로드 실패:", error);
        setIsLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (!missionData || isLoading) {
    return <OnlyLoader />;
  }

  return (
    <main className="flex h-full w-full flex-col bg-black">
      <BackHeader title="하루한컷" titleColor="white" />
      <DailyMissionProgress weeklyStatus={weeklyStatus} />
      <div className="flex flex-1 items-center justify-center">
        <DailyMissionCard
          status={status}
          setStatus={setStatus}
          missionData={missionData}
          myChallenge={myChallenge}
        />
      </div>
    </main>
  );
};
export default DayStoryUpload;
