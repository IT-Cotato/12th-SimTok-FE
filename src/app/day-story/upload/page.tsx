import { BackHeader } from "@/components/common/BackHeader";
import { DailyMissionCard } from "@/components/dailyPhoto/DailyMissionCard";
import { DailyMissionProgress } from "@/components/dailyPhoto/DailyMissionProgress";

//하루한컷 업로드 페이지
const DayStoryUpload = () => {
  return (
    <main className="w-full bg-black">
      <BackHeader title="하루한컷" titleColor="white" />
      <DailyMissionProgress />
      <div className="mt-[143px] flex items-center justify-center">
        <DailyMissionCard />
      </div>
    </main>
  );
};
export default DayStoryUpload;
