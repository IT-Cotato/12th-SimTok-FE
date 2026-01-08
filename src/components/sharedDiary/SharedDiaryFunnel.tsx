"use client";

import { createFunnelSteps, useFunnel } from "@use-funnel/browser";

import type { SharedDiaryFormState } from "@/types/sharedDiarySteps.type";

import { EmotionStep } from "./EmotionStep";
import { WriteStep } from "./WriteStep";

const steps = createFunnelSteps<SharedDiaryFormState>()
  .extends("emotion")
  .extends("write", {
    requiredKeys: ["emotion"],
  })
  .extends("confirm", {
    requiredKeys: ["emotion", "content", "file"],
  })
  .extends("complete")
  .build();

export const SharedDiaryFunnel = () => {
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
              content: "",
            })
          }
        />
      );
    }

    case "write": {
      const { emotion, content, file } = funnel.context;

      return (
        <WriteStep
          emotion={emotion}
          defaultContent={content}
          defaultFile={file}
          onNext={(nextContent, nextFile) =>
            funnel.history.push("confirm", prev => ({
              ...prev,
              content: nextContent,
              file: nextFile,
            }))
          }
          onBack={() => funnel.history.back()}
        />
      );
    }

    case "confirm": {
      const { emotion, content, file } = funnel.context;

      // return (
      //   <ConfirmStep
      //     emotion={emotion}
      //     content={content}
      //     file={file}
      //     onSubmit={() => {
      //       // TODO: 업로드 API 호출
      //       funnel.history.push("complete");
      //     }}
      //     onBack={() => funnel.history.back()}
      //   />
      // );
    }

    case "complete": {
      // return (
      //   <CompleteStep
      //     onClose={() => {
      //       // 닫기 처리
      //     }}
      //   />
      // );
    }
  }
};
