import { useRouter } from "next/navigation";

import CloseIcon from "@/assets/close-thin.svg";
import ModalSuccess from "@/assets/modal_success.svg";

import { InvitationContent } from "@/types/plantInvite.type";

interface InviteAgreeProps {
  onClose: () => void;
  inviteData: InvitationContent;
}
export const InviteAgree = ({ onClose, inviteData }: InviteAgreeProps) => {
  const router = useRouter();
  return (
    <section className="bg-radial-green relative flex w-full max-w-[353px] flex-col items-center rounded-2xl p-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer"
      >
        <CloseIcon className="text-neutral-04 h-4 w-4" />
      </button>
      <div className="mt-4 flex flex-col items-center">
        <h3 className="text-h3 text-green-01 font-bold">초대장 도착</h3>
        <div className="text-neutral-02 -mt-1 flex items-center">
          <span className="text-sub1-r text-neutral-03">From.</span>
          <span className="text-sub1-r text-neutral-03">
            {inviteData.inviterName}
          </span>
        </div>
      </div>
      <div className="mt-5 mb-[45.5px]">
        <ModalSuccess className="h-[87px] w-[90px]" />
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <p className="text-sub-number text-neutral-01">
          식물키우기가 시작되었어요!
        </p>
        <button
          className="bg-mint-01 text-button-sb cursor-pointer rounded-2xl p-[10px] text-white"
          onClick={() => {
            router.push("/garden");
            onClose();
          }}
        >
          정원가기
        </button>
      </div>
    </section>
  );
};
