export const formatDate = (createdAt: string): string => {
  const date = new Date(createdAt);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const year = date.getFullYear().toString().slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}월 ${day}일`;
};

export const formatDateWithDot = (currentDate: string): string => {
  const date = new Date(currentDate);
  const year = date.getFullYear().toString().slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
