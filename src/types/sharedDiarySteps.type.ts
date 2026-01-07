import { Emotion } from "./emotion.type";

export type SharedDiaryStepContextMap = {
  // 1. 이모지 선택
  emotion: {
    emotion?: Emotion;
  };

  // 2. 사진 + 텍스트 입력 (둘 다 필수)
  write: {
    emotion: Emotion;
    content?: string;
    file?: File;
  };

  // 3. 업로드 전 확인
  confirm: {
    emotion: Emotion;
    content: string;
    file: File;
  };

  // 4. 업로드 완료
  complete: Record<string, never>;
};

export type SharedDiaryFormState = {
  emotion?: Emotion;
  content?: string;
  file?: File;
};
