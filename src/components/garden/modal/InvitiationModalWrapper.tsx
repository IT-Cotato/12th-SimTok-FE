"use client";
import { useState } from "react";

import { InviteStart } from "@/components/garden/modal/InviteStart";

import { InvitationContent } from "@/types/plantInvite.type";

import { InviteAgree } from "./InviteAgree";
import { InviteContent } from "./InviteContent";

interface InvitationModalProps {
  inviteContent: InvitationContent;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}
export const InvitationModal = ({
  inviteContent,
  onAccept,
  onDecline,
  onClose,
}: InvitationModalProps) => {
  const [step, setStep] = useState(1);

  const handleClose = () => {
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-[100] mx-auto flex max-w-[440px] items-center justify-center bg-black/83 px-4">
      {step === 1 && (
        <InviteStart
          onClose={handleClose}
          inviteData={inviteContent}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <InviteContent
          onClose={handleClose}
          inviteData={inviteContent}
          setStep={setStep}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      )}
      {step === 3 && (
        <InviteAgree onClose={handleClose} inviteData={inviteContent} />
      )}
    </div>
  );
};
