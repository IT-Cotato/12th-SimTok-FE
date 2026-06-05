"use client";

import { ReactNode } from "react";

interface NotiSectionProps {
  title: string;
  children: ReactNode;
}

export const NotiSection = ({ title, children }: NotiSectionProps) => {
  return (
    <div className="mt-10 flex flex-col">
      <h2 className="text-h1 text-neutral-01 mb-4 px-4 leading-none">
        {title}
      </h2>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
