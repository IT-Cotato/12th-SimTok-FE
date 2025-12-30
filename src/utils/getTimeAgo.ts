export const getTimeAgo = (createdAt: string): string => {
  const now = new Date();
  const createdTime = new Date(createdAt);

  const diffMs = now.getTime() - createdTime.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffMinutes < 1) {
    return "방금 전";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  return `${diffHours}시간 전`;
};
