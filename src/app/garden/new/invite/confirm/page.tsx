"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useGardenStore } from "@/stores/useGardenStore";

import { FullButton } from "@/components/common/FullButton";

const InvitePlantConfirm = () => {
  //TODO: 저장된 정보 api post 호출 추가
  const router = useRouter();
  const resetForm = useGardenStore(state => state.resetForm);
  const handleNext = () => {
    resetForm();
    router.push("/garden");
  };
  return (
    <main className="flex h-full w-full flex-col">
      <section className="flex flex-1 flex-col justify-center gap-[90px]">
        <h1 className="text-d2 text-neutral-01 flex items-start px-4 py-[10px]">
          친구에게 초대장을 보냈어요!
          <br />
          수락 후 키우기가 시작돼요🙌
        </h1>
        <div className="flex justify-center">
          <Image
            src={"/images/garden/red-message-box.svg"}
            width={326}
            height={370}
            alt="전송완료 이미지"
          />
        </div>
      </section>

      <section className="mb-[42px] px-4 py-[10px]">
        <FullButton onClick={handleNext}>확인완료</FullButton>
      </section>
    </main>
  );
};
export default InvitePlantConfirm;
