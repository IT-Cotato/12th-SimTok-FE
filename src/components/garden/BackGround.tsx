import Image from "next/image";

Image;
interface GardenBackgroundProps {
  children: React.ReactNode;
  noPlant: boolean;
}

export const GardenBackground = ({
  children,
  noPlant,
}: GardenBackgroundProps) => {
  return (
    <main className="bg-blue-02 relative h-full w-full overflow-hidden">
      <div className="absolute top-[233px] left-1/2 h-[708px] w-[708px] -translate-x-1/2 rounded-full bg-white/27"></div>
      <div className="absolute top-[297px] left-1/2 h-[543px] w-[543px] -translate-x-1/2 rounded-full bg-white/27"></div>
      <div className="absolute top-[213px] z-30">
        {noPlant ? (
          <Image
            src={"/images/garden/noPlant-bg.svg"}
            width={514}
            height={398}
            alt="식물없음"
          />
        ) : (
          <Image
            src={"/images/garden/yesPlant-bg.svg"}
            width={514}
            height={398}
            alt="식물있음"
          />
        )}
      </div>

      {children}
      <div className="bg-brown-gradient absolute bottom-0 h-[379px] w-[442px]"></div>
    </main>
  );
};
