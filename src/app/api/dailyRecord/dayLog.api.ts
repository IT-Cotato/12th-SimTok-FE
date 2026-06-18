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

export const getChallengeDetail = async (challengeId: number) => {
  const { data } = await apiInstance.get(`/challenges/${challengeId}`);

  return data.data;
};

export const postChallengeLike = async (challengeId: number) => {
  const { data } = await apiInstance.post(`/challenges/${challengeId}/likes`, {
    challengeId,
  });

  return data.data;
};

export const deleteChallengeLike = async (challengeId: number) => {
  const { data } = await apiInstance.delete(
    `/challenges/${challengeId}/likes`,
    {
      data: { challengeId },
    },
  );
  return data.data;
};

export const getChallengeComments = async (
  challengeId: number,
  size: number,
  lastId?: number | null,
) => {
  const url =
    lastId !== undefined && lastId !== null
      ? `/challenges/${challengeId}/comments?lastId=${lastId}&size=${size}`
      : `/challenges/${challengeId}/comments?size=${size}`;

  const { data } = await apiInstance.get(url);
  return data.data;
};

export const postChallengeComments = async (challengeId: number) => {
  const { data } = await apiInstance.post(
    `/challenges/${challengeId}/comments`,
  );

  return data.data;
};
