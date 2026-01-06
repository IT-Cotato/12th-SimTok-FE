import { ReactElement, ReactNode, useState } from "react";

export interface StepProps<T extends string> {
  name: T;
  children: ReactNode;
}

export interface FunnelProps {
  children: ReactNode;
}

export const useFunnel = <T extends string>(defaultStep: T) => {
  const [step, setStep] = useState(defaultStep);

  const Step = ({ children }: StepProps<T>): ReactElement => <>{children}</>;

  const Funnel = ({ children }: FunnelProps): ReactElement | null => {
    const childrenArray = Array.isArray(children) ? children : [children];

    const stepsArray = childrenArray.filter(
      (child): child is ReactElement<StepProps<T>> =>
        typeof child === "object" &&
        child !== null &&
        "props" in child &&
        typeof (child as ReactElement<StepProps<T>>).props?.name === "string",
    );

    const targetStep = stepsArray.find(
      childStep => childStep.props.name === step,
    );

    return targetStep ?? null;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};
