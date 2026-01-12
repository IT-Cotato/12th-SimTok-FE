"use client";
import { useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { DailyMissionCard } from "@/components/dailyPhoto/DailyMissionCard";
import { DailyMissionProgress } from "@/components/dailyPhoto/DailyMissionProgress";

import { MISSION_STATUS } from "@/constants/missionCard";

const DayStoryUpload = () => {
  const [status, setStatus] =
    useState<keyof typeof MISSION_STATUS>("NOT_STARTED");
  return (
    <main className="w-full bg-black">
      <BackHeader title="하루한컷" titleColor="white" />
      <DailyMissionProgress status={status} />
      <div className="mt-[143px] flex items-center justify-center">
        <DailyMissionCard status={status} setStatus={setStatus} />
      </div>
    </main>
  );
};
export default DayStoryUpload;
