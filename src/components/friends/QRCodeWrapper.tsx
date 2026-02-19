import { QRCodeCanvas } from "qrcode.react";

import ShareIcon from "@/assets/share.svg";

import { MyProfile } from "@/types/myProfile.type";

import { ProfileImagePicker } from "../common/ProfileImagePicker";

interface QRCodeWrapperProps {
  textCodeMode: boolean;
  myData: MyProfile;
}
export const QRCodeWrapper = ({
  textCodeMode = false,
  myData,
}: QRCodeWrapperProps) => {
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
            <ProfileImagePicker
              imageUrl={myData.profileImageUrl ?? null}
              canEdit={false}
              width={60}
              height={60}
              radius={16}
            />

            <p className="text-h2 text-neutral-04 flex items-center justify-center p-[10px]">
              {myData.name}
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
          <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-neutral-100 text-neutral-400">
            <QRCodeCanvas
              value={`https://simtalk.vercel.app//friends/add/${myData.inviteCode}`}
              size={512} // 충분히 큰 해상도로 생성
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "330px", // 패딩 효과를 위해 살짝 줄임
                maxHeight: "330px",
                // textCodeMode일 때 투명도를 10%로 낮춤
                opacity: textCodeMode ? 0.1 : 1,
                transition: "opacity 0.3s ease",
              }}
              level="H"
            />
            {textCodeMode && (
              <p className="text-d1 absolute text-black">{myData.inviteCode}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
