interface UploadTitleProps {
  title: string;
  subTitle: string;
}
export const UploadTitle = ({ title, subTitle }: UploadTitleProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-[10px]">
      <div className="text-h2 text-neutral-01">{title}</div>
      <div className="text-sub2-r text-neutral-05 -mt-[2px]">{subTitle}</div>
    </div>
  );
};
