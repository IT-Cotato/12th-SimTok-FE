interface InfoMessageProps {
  text: string;
  triangleUp?: boolean;
}
export const InfoMessage = ({ text, triangleUp = true }: InfoMessageProps) => {
  return (
    <section className="inline-flex flex-col">
      {triangleUp && (
        <div className="border-b-neutral-01 mx-[10px] -mb-[6px] h-0 w-0 self-end border-t-0 border-r-[9px] border-b-[18px] border-l-[9px] border-solid border-t-transparent border-r-transparent border-l-transparent"></div>
      )}
      <div className="bg-neutral-01 text-sub2-sb border-neutral-01 z-10 rounded-[100px] border px-[10px] py-2 text-white">
        {text}
      </div>
      {!triangleUp && (
        <div className="border-b-neutral-01 mx-[10px] -mt-[6px] h-0 w-0 self-start border-t-[18px] border-r-[9px] border-b-[0] border-l-[9px] border-solid border-r-transparent border-b-transparent border-l-transparent"></div>
      )}
    </section>
  );
};
