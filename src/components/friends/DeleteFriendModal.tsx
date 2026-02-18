import { ProfileImagePicker } from "../common/ProfileImagePicker";

interface DeleteFriendModalProps {
  selectedCount: number;
  selectedProfileImg?: string;
  selectedName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}
export const DeleteFriendModal = ({
  selectedCount,
  selectedProfileImg,
  selectedName,
  onClose,
  onConfirm,
}: DeleteFriendModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="absolute inset-0 z-0 cursor-pointer" onClick={onClose} />
      <section className="relative z-10 flex w-[316px] flex-col">
        <div className="flex flex-col items-center justify-center rounded-t-2xl bg-white pt-[10px] pb-[7px]">
          <div className="text-neutral-01 text-h3 mb-1">친구삭제</div>
          <ProfileImagePicker
            imageUrl={selectedProfileImg || null}
            width={55}
            height={55}
            radius={16}
            canEdit={false}
          />
          <div className="mb-[2px] flex">
            <p className="text-neutral-03 text-sub1-r">{selectedName}</p>
            {selectedCount > 1 && (
              <span className="flex">
                <p className="text-neutral-03 text-sub1-r">&nbsp;외&nbsp;</p>
                <p className="text-mint-01 text-sub1-r">{selectedCount - 1}</p>
                <p className="text-neutral-03 text-sub1-r">명</p>
              </span>
            )}
          </div>

          <p className="text-sub2-r text-neutral-06">
            삭제해도 친구에게는 알림이 가지 않아요
          </p>
        </div>

        <div className="flex w-full">
          <button
            onClick={onClose}
            className="bg-neutral-11 text-neutral-05 flex-1 cursor-pointer rounded-bl-2xl px-[10px] py-5"
          >
            취소할래요
          </button>

          <button
            onClick={e => {
              e.stopPropagation(); // 이벤트 버블링 방지
              onConfirm();
            }}
            className="bg-mint-01 flex-1 cursor-pointer rounded-br-2xl px-[10px] py-5 text-white"
          >
            네,삭제할게요
          </button>
        </div>
      </section>
    </div>
  );
};
