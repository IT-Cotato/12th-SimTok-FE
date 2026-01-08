import { BackHeader } from "../common/BackHeader";
import { ProgressDots } from "../common/ProgressDot";
import { UploadTitle } from "./UploadTitle";

export const ConfirmStep = () => {
  return (
    <main>
      <BackHeader title="공유일기쓰기" />
      <div className="mt-[1px]">
        <ProgressDots total={3} current={2} />
      </div>
      <div className="mt-[13px]">
        <UploadTitle
          title="오늘의 기분이 선택되었어요."
          subTitle="공유일기를 작성해보세요."
        />
      </div>
    </main>
  );
};
