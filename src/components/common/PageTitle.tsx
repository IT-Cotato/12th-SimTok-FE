type PageTitleProps = {
  title?: readonly string[];
};

export const PageTitle = ({ title }: PageTitleProps) => {
  const lines = Array.isArray(title) ? title : [title];
  if (!title) return null;
  return (
    <div className="flex w-full items-center px-4 py-2.5">
      <h1 className="text-neutral-02 text-d2 z-80 whitespace-pre-line">
        {lines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </h1>
    </div>
  );
};
