import { FullButton } from "../common/FullButton";

interface CompleteStepProps {
  onClose: () => void;
}
export const CompleteStep = ({ onClose }: CompleteStepProps) => {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <h1 className="text-h1 text-neutral-01">공유일기 작성이 완료되었어요!</h1>
      <p className="text-sub2-r text-neutral-05">
        하루기록페이지에서 공유한 일기를 확인 할 수 있어요.
      </p>
      <div className="fixed bottom-0 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton onClick={onClose}>
          <p>확인</p>
        </FullButton>
      </div>
    </main>
  );
};
