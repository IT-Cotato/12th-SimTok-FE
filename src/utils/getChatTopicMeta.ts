import { CHAT_TOPIC } from "@/constants/friendsSettings";

export const getChatTopicMeta = (code: string) => {
  return (
    CHAT_TOPIC.find(t => t.key === code) || {
      icon: null,
      recommendations: [],
    }
  );
};
