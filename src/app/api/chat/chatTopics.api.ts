import { apiInstance } from "../apiInstance";

export const getChatTopics = async () => {
  const { data } = await apiInstance.get("/chat-topics");

  return data;
};

export const getTopicTemplates = async (topicCode: string) => {
  const { data } = await apiInstance.get(`/chat-topics/${topicCode}/templates`);
  return data;
};
