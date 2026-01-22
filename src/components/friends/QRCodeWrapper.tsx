import Image from "next/image";

import ShareIcon from "@/assets/share.svg";

import MyProfileData from "@/mock/myProfile.json";

interface QRCodeWrapperProps {
  textCodeMode: boolean;
}
export const QRCodeWrapper = ({ textCodeMode = false }: QRCodeWrapperProps) => {
  // 구멍이 뚫릴 위치 (상단에서부터의 거리)
  const CUTOUT_Y = "105px";
  const CUTOUT_RADIUS = "18px"; // 구멍 반지름

  return (
    <section className="w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <div
        className="w-full rounded-[36px] bg-white"
        style={{
          maskImage: `
            radial-gradient(circle at 0 ${CUTOUT_Y}, transparent ${CUTOUT_RADIUS}, black calc(${CUTOUT_RADIUS} + 0.5px)), 
            radial-gradient(circle at 100% ${CUTOUT_Y}, transparent ${CUTOUT_RADIUS}, black calc(${CUTOUT_RADIUS} + 0.5px))
          `,
          WebkitMaskImage: `
            radial-gradient(circle at 0 ${CUTOUT_Y}, transparent ${CUTOUT_RADIUS}, black calc(${CUTOUT_RADIUS} + 0.5px)), 
            radial-gradient(circle at 100% ${CUTOUT_Y}, transparent ${CUTOUT_RADIUS}, black calc(${CUTOUT_RADIUS} + 0.5px))
          `,
          maskSize: "51% 100%",
          WebkitMaskSize: "51% 100%",
          maskPosition: "left, right",
          WebkitMaskPosition: "left, right",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center justify-between px-[29px] pt-[20.05px]">
          <div className="flex gap-2">
            <div className="">
              <Image
                src={MyProfileData.profileImg}
                alt="내 프로필이미지"
                width={60}
                height={60}
                className="h-15 w-15 rounded-2xl object-cover"
              />
            </div>

            <p className="text-h2 text-neutral-04 flex items-center justify-center p-[10px]">
              {MyProfileData.userName}
            </p>
          </div>
          <ShareIcon className="text-neutral-07 h-9 w-9" />
        </div>

        <div className="relative flex items-center px-[29px]">
          <div
            className="mt-6 mb-7 h-[2px] w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #E9E9EA 0 12px, transparent 12px 20px)",
            }}
          />
        </div>
        <div className="h-[330px] w-full px-[38.5px] pb-[27.23px]">
          {/* TODO: QR 코드가 들어갈 자리, 배포되면 실제 주소로 만들기 */}
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-neutral-100 text-neutral-400">
            QR Code Area
            {textCodeMode && (
              <p className="text-d1 absolute text-black">
                {MyProfileData.inviteCode}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
