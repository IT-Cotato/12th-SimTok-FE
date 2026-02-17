import { apiInstance } from "../apiInstance";

export const getFriendsDayLog = async (size: number, lastId?: number) => {
  const url = lastId
    ? `/challenges/lastId=${lastId}&size=${size}`
    : `/challenges?size=${size}`;

  const { data } = await apiInstance.get(url);

  return data.data;
};

export const getMyDayLog = async () => {
  const { data } = await apiInstance.get("/challenges/me");
  return data.data;
};

export const getChallengeDashboard = async () => {
  const { data } = await apiInstance.get("/challenges/dashboard");
  return data.data;
};

export const postChallenge = async (missionId: number, imageUrl: string) => {
  const { data } = await apiInstance.post("/challenges", {
    missionId,
    imageUrl,
  });

  return data.data;
};
