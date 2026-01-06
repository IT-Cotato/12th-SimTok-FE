import type { AgreementKey } from "@/types/agreement.type";

export const AGREEMENTS: { key: AgreementKey; label: string }[] = [
  { key: "service", label: "심톡 이용약관 동의 (필수)" },
  { key: "finance", label: "전자금융거래 이용약관 동의 (필수)" },
  { key: "personalReq", label: "개인정보 수집 이용 동의 (필수)" },
  { key: "personalOpt1", label: "개인정보 수집 이용 동의 (선택)" },
  { key: "personalOpt2", label: "개인정보 수집 이용 동의 (선택)" },
  { key: "marketing", label: "마케팅 정보 메일, SNS수신동의 (선택)" },
];

export const INITIAL_AGREEMENTS: Record<AgreementKey, boolean> = {
  service: false,
  finance: false,
  personalReq: false,
  personalOpt1: false,
  personalOpt2: false,
  marketing: false,
};
