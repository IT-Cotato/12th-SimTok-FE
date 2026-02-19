"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { getMyProfile } from "@/app/api/profile/profile.api";

import { FullButton } from "@/components/common/FullButton";
import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";
import { InputField } from "@/components/friends/InputField";
import { QRCodeWrapper } from "@/components/friends/QRCodeWrapper";

import { MyProfile } from "@/types/myProfile.type";

const FriendInvitePage = () => {
  const router = useRouter();

  const [selectTitle, setSelectTitle] = useState<"left" | "right">("left");
  const [textCodeMode, setTextCodeMode] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [myData, setMyData] = useState<MyProfile>();

  useEffect(() => {
    setTextCodeMode(selectTitle === "right");
  }, [selectTitle]);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const data = await getMyProfile();
        setMyData(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchMyData();
  }, []);

  return (
    <main
      className={`${selectTitle === "left" ? "bg-radial-mint" : inputCode.length > 0 ? "bg-radial-yellowgreen-mintgreen" : "bg-white"} flex min-h-screen w-full flex-col`}
    >
      <GlassStyleHeader
        backHeader={true}
        leftText="QR코드"
        rightText="초대코드"
        selectTitle={selectTitle}
        onChangeSelectTitle={setSelectTitle}
      />

      {selectTitle === "left" && (
        <section className="flex flex-1 flex-col">
          {/* 상단: 남은 영역 채우기 */}
          <div className="mt-[54.5px] flex items-center justify-center px-4">
            <sub className="text-sub-number text-neutral-01 text-center">
              QR코드를 친구에게 보여주세요!
            </sub>
          </div>

          {/* 하단: QR 코드 고정 */}
          <div className="flex flex-1 items-center px-4">
            {myData && (
              <QRCodeWrapper textCodeMode={textCodeMode} myData={myData} />
            )}
          </div>
        </section>
      )}

      {selectTitle === "right" && (
        <>
          <section className="flex flex-1 flex-col gap-[30px] pb-[120px]">
            <div className="flex flex-1 flex-col">
              <div className="px-4 py-[10px]">
                <InputField onChangeInputText={setInputCode} />
              </div>
              <div className="relative flex flex-1 items-center px-4">
                {myData && (
                  <QRCodeWrapper textCodeMode={textCodeMode} myData={myData} />
                )}
              </div>
            </div>
          </section>
          <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-[440px] -translate-x-1/2 bg-white px-4 py-[10px] pb-[42px]">
            <FullButton
              isActive={inputCode.length > 0}
              onClick={() =>
                router.push(`/friends/add/${encodeURIComponent(inputCode)}`)
              }
            >
              입력완료
            </FullButton>
          </div>
        </>
      )}
    </main>
  );
};
export default FriendInvitePage;
