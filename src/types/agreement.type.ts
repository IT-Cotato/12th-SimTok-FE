export type AgreementKey =
  | "service" // 심톡 이용약관 동의 (필수)
  | "finance" // 전자금융거래 이용약관 동의 (필수)
  | "personalReq" // 개인정보 수집 이용 동의 (필수)
  | "personalOpt1" // 개인정보 수집 이용 동의 (선택)
  | "personalOpt2" // 개인정보 수집 이용 동의 (선택)
  | "marketing"; // 마케팅 정보 수신 동의 (선택)
