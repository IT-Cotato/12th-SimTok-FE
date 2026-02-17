import CloseIcon from "@/assets/close-thin.svg";
import Envelop from "@/assets/envelop.svg";

import { InvitationContent } from "@/types/plantInvite.type";

interface InviteStartProps {
  onClose: () => void;
  inviteData: InvitationContent;
  setStep: (step: number) => void;
}
export const InviteStart = ({
  onClose,
  inviteData,
  setStep,
}: InviteStartProps) => {
  return (
    <section className="bg-radial-orange relative flex w-full max-w-[353px] flex-col items-center rounded-2xl p-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer"
      >
        <CloseIcon className="text-neutral-04 h-4 w-4" />
      </button>

      <div className="mt-4 flex flex-col items-center">
        <h3 className="text-h3 text-orange-00 font-bold">초대장 도착</h3>
        <div className="text-neutral-02 -mt-1 flex items-center">
          <span className="text-sub1-r text-neutral-03">From.</span>
          <span className="text-sub1-r text-neutral-03">
            {inviteData.inviterName}
          </span>
        </div>
      </div>

      <div className="my-[30px]">
        <Envelop className="h-[87px] w-[126px]" />
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <p className="text-sub-number text-neutral-01">
          친구가 보낸 초대장이 있어요!
        </p>
        <button
          className="bg-orange-02 text-button-sb cursor-pointer rounded-2xl p-[10px] text-white"
          onClick={() => setStep(2)}
        >
          열어보기
        </button>
      </div>
    </section>
  );
};
