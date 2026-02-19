"use client";

import { useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import { useSignupStore } from "@/stores/useSignupStore";

import { signupApi } from "@/app/api/signup";

import { BackHeader } from "@/components/common/BackHeader";
import { Checkbox } from "@/components/common/Checkbox";
import { FullButton } from "@/components/common/FullButton";
import { PageTitle } from "@/components/common/PageTitle";

const AgreePage = () => {
  const router = useRouter();
  const { terms } = useSignupStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [agreements, setAgreements] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(terms.map(t => [t.code, false])),
  );

  useEffect(() => {
    if (terms.length > 0) {
      setAgreements(prev => {
        const hasKeys = terms.some(t => t.code in prev);
        if (hasKeys) return prev;
        return Object.fromEntries(terms.map(t => [t.code, false]));
      });
    }
  }, [terms]);

  const isConfirmActive = useMemo(
    () =>
      terms.length > 0 &&
      terms.filter(t => t.required).every(t => agreements[t.code]),
    [terms, agreements],
  );

  const allChecked = useMemo(
    () => terms.length > 0 && terms.every(t => agreements[t.code]),
    [terms, agreements],
  );

  if (terms.length === 0) return null;

  const handleAllChange = () => {
    const nextValue = !allChecked;
    setAgreements(Object.fromEntries(terms.map(t => [t.code, nextValue])));
  };

  const handleSingleChange =
    (code: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAgreements(prev => ({ ...prev, [code]: e.target.checked }));
    };

  const handleAgreeSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const consents = terms.map(term => ({
      code: term.code,
      version: term.version,
      agreed: agreements[term.code] || false,
    }));

    try {
      const res = await signupApi.submitTerms(consents);
      const result = await res.json();
      if (result.success) {
        router.push("/signup/profile");
      } else {
        console.error(result.message || "약관 동의 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("제출 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-dvh w-full flex-col justify-center">
      <BackHeader title="회원가입" />

      <div className="mt-13.5 flex flex-1 flex-col">
        <PageTitle
          title={["반가워요! 가입하려면", "약관에 동의가 필요해요."]}
        />
        <ul className="mt-[41px] flex w-full flex-col gap-[10px]">
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
              {terms.map(term => (
                <li key={term.code} className="px-4 py-2.5">
                  <Checkbox
                    label={`${term.title} ${term.required ? "(필수)" : "(선택)"}`}
                    checked={agreements[term.code] || false}
                    onChange={handleSingleChange(term.code)}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div className="mb-[42px] flex w-full justify-center px-4 py-[10px]">
        <FullButton
          isActive={isConfirmActive && !isSubmitting}
          onClick={handleAgreeSubmit}
        >
          동의하기
        </FullButton>
      </div>
    </main>
  );
};

export default AgreePage;
