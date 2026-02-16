import HandClap from "@/assets/clap.svg";

import { FullButton } from "../common/FullButton";

interface CompleteStepProps {
  onClose: () => void;
}
export const CompleteStep = ({ onClose }: CompleteStepProps) => {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <section className="mt-[119px] flex flex-col items-center gap-1">
        <h1 className="text-d2 text-neutral-01">
          공유일기 작성이 완료되었어요!
        </h1>
        <p className="text-h3 text-neutral-05">
          하루기록페이지에서 공유한 일기를 확인할 수 있어요.
        </p>
      </section>
      <section className="mb-[112px] flex flex-1 items-center justify-center">
        <HandClap className="h-[295px] w-[295px]" />
      </section>
      <div className="fixed bottom-0 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton onClick={onClose}>
          <p>확인</p>
        </FullButton>
      </div>
    </main>
  );
};
