"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { FullButton } from "@/components/common/FullButton";
import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";
import { InputField } from "@/components/friends/InputField";
import { QRCodeWrapper } from "@/components/friends/QRCodeWrapper";

const FriendInvitePage = () => {
  const router = useRouter();

  const [selectTitle, setSelectTitle] = useState<"left" | "right">("left");
  const [textCodeMode, setTextCodeMode] = useState(false);
  const [inputCode, setInputCode] = useState("");

  useEffect(() => {
    setTextCodeMode(selectTitle === "right");
  }, [selectTitle]);

  return (
    <main
      className={`${selectTitle === "left" ? "bg-radial-mint" : inputCode.length > 0 ? "bg-radial-yellowgreen-mintgreen" : "bg-white"} flex w-full flex-col`}
    >
      <GlassStyleHeader
        backHeader={true}
        leftText="QR코드"
        rightText="초대코드"
        bgColor="neutral-01"
        selectTitle={selectTitle}
        onChangeSelectTitle={setSelectTitle}
      />
      {selectTitle === "left" && (
        <section className="flex flex-col gap-[103px]">
          <sub className="text-sub-number text-neutral-01 mt-[54.5px] flex items-center justify-center px-4 py-[10px]">
            QR코드를 친구에게 보여주세요!
          </sub>
          <div className="relative px-4">
            <QRCodeWrapper textCodeMode={textCodeMode} />
          </div>
        </section>
      )}
      {selectTitle === "right" && (
        <>
          <section className="flex flex-1 flex-col gap-[30px]">
            <div className="mt-[44.5px] px-4 py-[10px]">
              <InputField onChangeInputText={setInputCode} />
            </div>
            <div className="relative px-4">
              <QRCodeWrapper textCodeMode={textCodeMode} />
            </div>
          </section>
          <div className="mb-[42px] w-full bg-white px-4 py-[10px]">
            <FullButton
              isActive={inputCode.length > 0}
              onClick={() => router.push(`/friends/add/${inputCode}`)}
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
