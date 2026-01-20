"use client";
import { useState } from "react";

import { GlassStyleHeader } from "@/components/common/GlassStyleHeader";

const FriendInvitePage = () => {
  const [selectTitle, setSelectTitle] = useState<"left" | "right">("left");

  return (
    <main
      className={`${selectTitle === "left" ? "bg-radial-mint" : "bg-white"} w-full`}
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
        <section>
          <sub className="text-sub-number text-neutral-01 mt-[54.5px] flex items-center justify-center px-4 py-[10px]">
            QR코드를 친구에게 보여주세요!
          </sub>
        </section>
      )}
      {selectTitle === "right"}
    </main>
  );
};
export default FriendInvitePage;
