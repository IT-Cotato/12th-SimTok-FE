import Lottie from "react-lottie-player";

import LoadingJson from "@/public/lotties/Loading.json";

export const OnlyLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex justify-center">
      {/* 가운데 440px 영역만 dim */}
      <div className="bg-neutral-01/70 relative flex h-full w-[440px] items-center justify-center">
        <Lottie
          animationData={LoadingJson}
          loop
          play
          style={{ width: 48, height: 48 }}
        />
      </div>
    </div>
  );
};
