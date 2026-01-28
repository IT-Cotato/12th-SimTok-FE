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
    <main className="flex min-h-dvh w-full flex-col justify-center">
      <BackHeader title="회원가입" />

      <div className="flex flex-1 flex-col">
        <PageTitle>
          반가워요! 가입하려면
          <br />
          약관에 동의가 필요해요.
        </PageTitle>

        {/* 전체동의 영역 */}
        <ul className="mt-[41px] flex w-full flex-col gap-[10px]">
          {/* 전체동의 */}
          <li className="border-neutral-09 border-b px-4 py-[10px]">
            <Checkbox
              label="전체동의"
              checked={allChecked}
              onChange={handleAllChange}
            />
          </li>
          {/* 개별 약관들 */}
          <li>
            <ul>
              {AGREEMENTS.map(item => (
                <li key={item.key} className="px-4 py-2.5">
                  <Checkbox
                    label={item.label}
                    checked={agreements[item.key]}
                    onChange={handleChange(item.key)}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div className="mb-[42px] flex w-full justify-center px-4 py-[10px]">
        <FullButton
          isActive={isConfirmActive}
          onClick={() => router.push("/signup/profile")}
        >
          동의하기
        </FullButton>
      </div>
    </main>
  );
};

export default AgreePage;
