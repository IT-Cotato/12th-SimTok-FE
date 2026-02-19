"use client";

import { useRouter } from "next/navigation";

import { createFunnelSteps, useFunnel } from "@use-funnel/browser";

import type { SharedDiaryFormState } from "@/types/sharedDiarySteps.type";

import { CompleteStep } from "./CompleteStep";
import { ConfirmStep } from "./ConfirmStep";
import { ContentStep } from "./ContentStep";
import { EmotionStep } from "./EmotionStep";

const steps = createFunnelSteps<SharedDiaryFormState>()
  .extends("emotion")
  .extends("write", {
    requiredKeys: ["emojiCode"],
  })
  .extends("confirm", {
    requiredKeys: ["emojiCode", "content"],
  })
  .extends("complete")
  .build();

export const SharedDiaryFunnel = () => {
  const router = useRouter();
  const funnel = useFunnel({
    id: "sharedDiary",
    initial: {
      step: "emotion",
      context: {
        date: new Date().toISOString().split("T")[0], //2026-02-16
      },
    },
    steps: steps,
  });

  switch (funnel.step) {
    case "emotion": {
      return (
        <EmotionStep
          emotion={funnel.context.emojiCode}
          onNext={emojiCode =>
            funnel.history.push("write", {
              emojiCode,
              content: "",
            })
          }
        />
      );
    }

    case "write": {
      const { emojiCode, content, imageUrl } = funnel.context;

      return (
        <ContentStep
          emotion={emojiCode}
          defaultContent={content}
          defaultFile={imageUrl || ""}
          onNext={(nextText, nextFile) =>
            funnel.history.push("confirm", prev => ({
              ...prev,
              content: nextText,
              imageUrl: nextFile,
            }))
          }
          onBack={() => funnel.history.back()}
        />
      );
    }

    case "confirm": {
      const { date, emojiCode, content, imageUrl } = funnel.context;

      return (
        <ConfirmStep
          date={date}
          emotion={emojiCode}
          text={content}
          file={imageUrl}
          onSubmit={() => {
            funnel.history.push("complete");
          }}
          onBack={() => funnel.history.back()}
        />
      );
    }

    case "complete": {
      return (
        <CompleteStep
          onClose={() => {
            router.push("/day-log");
          }}
        />
      );
    }
  }
};
