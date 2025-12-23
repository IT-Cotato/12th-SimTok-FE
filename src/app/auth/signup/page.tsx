"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import dateIcon from "@/assets/date.svg";
import PhoneIcon from "@/assets/phone.svg";
import ProfileIcon from "@/assets/profile.svg";

import Checkbox from "@/components/Checkbox";
import FullButton from "@/components/FullButton";
import PageHeader from "@/components/Header";

import { formatPhone } from "@/utils/formatPhone";

type AgreementKey =
  | "service" // 심톡 이용약관 동의 (필수)
  | "finance" // 전자금융거래 이용약관 동의 (필수)
  | "personalReq" // 개인정보 수집 이용 동의 (필수)
  | "personalOpt1" // 개인정보 수집 이용 동의 (선택)
  | "personalOpt2" // 개인정보 수집 이용 동의 (선택)
  | "marketing"; // 마케팅 정보 수신 동의 (선택)

const initialAgreements: Record<AgreementKey, boolean> = {
  service: false,
  finance: false,
  personalReq: false,
  personalOpt1: false,
  personalOpt2: false,
  marketing: false,
};

export default function SignupPage() {
  const [agreements, setAgreements] =
    useState<Record<AgreementKey, boolean>>(initialAgreements);

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
      console.log("change", key, e.target.checked);
      setAgreements(prev => ({ ...prev, [key]: checked }));
    };

  return (
    <main className="flex min-h-dvh justify-center bg-white">
      <div className="mt-[13px] flex h-full w-110 flex-col px-4">
        {/* 상단 헤더: 뒤로가기 */}
        <PageHeader title="회원가입" />

        {/* 상단 타이틀 */}
        <div className="mt-[63px] flex w-full items-center gap-[10px] py-[10px]">
          <h1 className="text-neutral-02 text-d2">
            반가워요! 가입하려면
            <br />
            약관에 동의가 필요해요.
          </h1>
        </div>

        {/* 전체동의 영역 */}
        <div className="mt-[31px] flex w-full flex-col py-[10px]">
          {/* 전체동의 */}
          <div className="border-neutral-09 border-b pb-[20px]">
            <Checkbox
              label="전체동의"
              checked={allChecked}
              onChange={handleAllChange}
            />
          </div>
        </div>
        {/* 개별 약관들 */}
        <div className="py-[10px]">
          <Checkbox
            label="심톡 이용약관 동의 (필수)"
            checked={agreements.service}
            onChange={handleChange("service")}
          />
        </div>
        <div className="py-[10px]">
          <Checkbox
            label="전자금융거래 이용약관동의 (필수)"
            checked={agreements.finance}
            onChange={handleChange("finance")}
          />
        </div>
        <div className="py-[10px]">
          <Checkbox
            label="개인정보 수집 이용 동의 (필수)"
            checked={agreements.personalReq}
            onChange={handleChange("personalReq")}
          />
        </div>
        <div className="py-[10px]">
          <Checkbox
            label="개인정보 수집 이용 동의 (선택)"
            checked={agreements.personalOpt1}
            onChange={handleChange("personalOpt1")}
          />
        </div>
        <div className="py-[10px]">
          <Checkbox
            label="개인정보 수집 이용 동의 (선택)"
            checked={agreements.personalOpt2}
            onChange={handleChange("personalOpt2")}
          />
        </div>
        <div className="py-[10px]">
          <Checkbox
            label="마케팅 정보 메일, SNS수신동의 (선택)"
            checked={agreements.marketing}
            onChange={handleChange("marketing")}
          />
        </div>
      </div>
    </main>
  );
}
