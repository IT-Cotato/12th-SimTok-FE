import { BackHeader } from "../common/BackHeader";
import { FullButton } from "../common/FullButton";
import { ProgressDots } from "../common/ProgressDot";
import { UploadTitle } from "./UploadTitle";

interface WritePageProps {
  text: string;
  onChangeText: (value: string) => void;
  onClose: () => void;
}
export const WritePage = ({ text, onChangeText, onClose }: WritePageProps) => {
  return (
    <main>
      <BackHeader title="글쓰기" />
      <div className="mt-[1px]">
        <ProgressDots total={3} current={2} />
      </div>
      <div className="mt-[13px]">
        <UploadTitle
          title="기록하고싶은 글을 남겨보세요!"
          subTitle="명언이나 오늘의 다짐을 적어도 좋아요."
        />
      </div>
      <div className="mt-[70px] px-4">
        <section className="border-mint-01 h-[408px] w-full rounded-2xl border py-[10px]">
          <textarea
            value={text}
            onChange={e => onChangeText(e.target.value)}
            className="h-full w-full resize-none p-4 focus:outline-none"
            placeholder="여기에 글을 작성해 주세요"
          />
        </section>
      </div>
      <div className="fixed bottom-0 z-99 h-[119px] w-screen max-w-[440px] bg-white px-4 py-[10px]">
        <FullButton onClick={onClose}>
          <p>작성완료</p>
        </FullButton>
      </div>
    </main>
  );
};
