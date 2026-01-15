"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { BackHeader } from "@/components/common/BackHeader";
import { Checkbox } from "@/components/common/Checkbox";
import { FullButton } from "@/components/common/FullButton";
import { PageTitle } from "@/components/common/PageTitle";

import { AGREEMENTS, INITIAL_AGREEMENTS } from "@/constants/agreement";

import type { AgreementKey } from "@/types/agreement.type";

const AgreePage = () => {
  const router = useRouter();
  const [agreements, setAgreements] =
    useState<Record<AgreementKey, boolean>>(INITIAL_AGREEMENTS);

  const isConfirmActive =
    agreements.service && agreements.finance && agreements.personalRequired;

  const allChecked = Object.values(agreements).every(Boolean);

  const handleAllChange = () => {
    const next = !allChecked;
    setAgreements(
      Object.fromEntries(
        Object.keys(agreements).map(key => [key, next]),
      ) as Record<AgreementKey, boolean>,
    );
  };

  const handleChange =
    (key: AgreementKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setAgreements(prev => ({ ...prev, [key]: checked }));
    };

  return (
    <main className="flex min-h-dvh w-full justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col">
        <BackHeader title="회원가입" />

        <PageTitle>
          반가워요! 가입하려면
          <br />
          약관에 동의가 필요해요.
        </PageTitle>

        {/* 전체동의 영역 */}
        <div className="mt-[31px] flex w-full flex-col px-4 py-2.5">
          {/* 전체동의 */}
          <div className="border-neutral-09 border-b pb-5">
            <Checkbox
              label="전체동의"
              checked={allChecked}
              onChange={handleAllChange}
            />
          </div>
        </div>
        {/* 개별 약관들 */}
        <div className="px-4 py-2.5">
          {AGREEMENTS.map(item => (
            <div key={item.key} className="py-2.5">
              <Checkbox
                label={item.label}
                checked={agreements[item.key]}
                onChange={handleChange(item.key)}
              />
            </div>
          ))}
        </div>

        <div className="mt-29 flex w-full justify-center">
          <FullButton
            isActive={isConfirmActive}
            onClick={() => router.push("/signup/profile")}
          >
            동의하기
          </FullButton>
        </div>
      </div>
    </main>
  );
};

export default AgreePage;
