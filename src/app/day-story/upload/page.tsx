import { BackHeader } from "@/components/common/BackHeader";
import { DailyMissionProgress } from "@/components/dailyPhoto/DailyMissionProgress";

//하루한컷 업로드 페이지
const DayStoryUpload = () => {
  return (
    <div className="w-full bg-black">
      <BackHeader title="하루한컷" titleColor="white" />
      <DailyMissionProgress />
    </div>
  );
};
export default DayStoryUpload;
