import { ReactElement, ReactNode, useState } from "react";

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: ReactNode;
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  const Step = ({ children }: StepProps): ReactElement => <>{children}</>;

  const Funnel = ({ children }: FunnelProps): ReactElement | null => {
    const childrenArray = Array.isArray(children) ? children : [children];

    const stepsArray = childrenArray.filter(
      (child): child is ReactElement<StepProps> =>
        typeof child === "object" &&
        child !== null &&
        "props" in child &&
        typeof child.props?.name === "string",
    );

    const targetStep = stepsArray.find(
      childStep => childStep.props.name === step,
    );

    return targetStep ?? null;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};
