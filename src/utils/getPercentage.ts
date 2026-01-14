// 백분율 값 정수로 계산
export const getPercentage = (part: number, total: number): number => {
  if (total === 0 || part === 0) return 0;
  return Math.round((part / total) * 100);
};
