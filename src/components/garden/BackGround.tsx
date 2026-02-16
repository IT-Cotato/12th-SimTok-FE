import Image from "next/image";

import type { ReactNode } from "react";

interface GardenBackgroundProps {
  children: ReactNode;
  noPlant: boolean;
}

export const GardenBackground = ({
  children,
  noPlant = false,
}: GardenBackgroundProps) => {
  const plantImage = noPlant
    ? { src: "/images/garden/noPlant-bg.svg", alt: "식물 없음 배경" }
    : { src: "/images/garden/yesPlant-bg.svg", alt: "식물 있음 배경" };

  return (
    <main className="bg-blue-02 relative h-full w-full overflow-hidden">
      <div className="absolute top-[233px] left-1/2 h-[708px] w-[708px] -translate-x-1/2 rounded-full bg-white/27"></div>
      <div className="absolute top-[297px] left-1/2 h-[543px] w-[543px] -translate-x-1/2 rounded-full bg-white/27"></div>
      <div className="absolute top-[213px] z-10 flex w-full justify-center">
        <Image
          src={plantImage.src}
          width={514}
          height={398}
          alt={plantImage.alt}
          priority
        />
      </div>

      {children}
      <div className="bg-brown-gradient absolute bottom-0 h-[379px] w-[442px]"></div>
    </main>
  );
};
