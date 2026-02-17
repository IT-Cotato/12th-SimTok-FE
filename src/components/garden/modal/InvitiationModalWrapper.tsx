"use client";
import { useState } from "react";

import { on } from "events";

import { InviteStart } from "@/components/garden/modal/InviteStart";

import InviteData from "@/mock/invitePlant.json";

import { InviteAgree } from "./InviteAgree";
import { InviteContent } from "./InviteContent";

export const InvitationModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const data = InviteData.invitations[0];

  return (
    <div className="fixed inset-0 z-[100] mx-auto flex max-w-[440px] items-center justify-center bg-black/83 px-4">
      {step === 1 && (
        <InviteStart onClose={onClose} inviteData={data} setStep={setStep} />
      )}
      {step === 2 && (
        <InviteContent onClose={onClose} inviteData={data} setStep={setStep} />
      )}
      {step === 3 && <InviteAgree onClose={onClose} inviteData={data} />}
    </div>
  );
};
