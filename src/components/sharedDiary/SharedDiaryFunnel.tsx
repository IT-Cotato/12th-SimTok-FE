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
    requiredKeys: ["emotion"],
  })
  .extends("confirm", {
    requiredKeys: ["emotion", "text", "file"],
  })
  .extends("complete")
  .build();

export const SharedDiaryFunnel = () => {
  const router = useRouter();
  const funnel = useFunnel({
    id: "sharedDiary",
    initial: {
      step: "emotion",
      context: {},
    },
    steps: steps,
  });

  switch (funnel.step) {
    case "emotion": {
      return (
        <EmotionStep
          emotion={funnel.context.emotion}
          onNext={emotion =>
            funnel.history.push("write", {
              emotion,
              text: "",
            })
          }
        />
      );
    }

    case "write": {
      const { emotion, text, file } = funnel.context;

      return (
        <ContentStep
          emotion={emotion}
          defaultContent={text}
          defaultFile={file}
          onNext={(nextText, nextFile) =>
            funnel.history.push("confirm", prev => ({
              ...prev,
              text: nextText,
              file: nextFile,
            }))
          }
          onBack={() => funnel.history.back()}
        />
      );
    }

    case "confirm": {
      const { emotion, text, file } = funnel.context;

      return (
        <ConfirmStep
          emotion={emotion}
          text={text}
          file={file}
          onSubmit={() => {
            // TODO: 업로드 API 호출
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
