import { apiInstance } from "../apiInstance";

interface AiPhrasesRequest {
  existingPhrases: string[]; // 기존에 노출된 문구들
  topic: string; // 선택한 주제 (예: '날씨')
  count: number; // 받고 싶은 추천 문구 개수
}

export const getChatTopics = async () => {
  const { data } = await apiInstance.get("/chat-topics");

  return data;
};

export const getTopicTemplates = async (topicCode: string) => {
  const { data } = await apiInstance.get(`/chat-topics/${topicCode}/templates`);
  return data;
};

export const postAiPhrases = async (payload: AiPhrasesRequest) => {
  const { data } = await apiInstance.post("/chat-topics/ai-phrases", payload);
  return data;
};
