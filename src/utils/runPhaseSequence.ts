import { ViewPhase } from "@/types/plant.type";

type PhaseStep = {
  phase: ViewPhase;
  duration: number;
};

export const runPhaseSequence = async (
  steps: PhaseStep[],
  setViewPhase: (p: ViewPhase) => void,
) => {
  for (const step of steps) {
    setViewPhase(step.phase);
    await new Promise(r => setTimeout(r, step.duration));
  }
};
