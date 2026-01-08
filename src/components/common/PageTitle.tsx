type PageTitleProps = {
  children: React.ReactNode;
};

export const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <div className="mt-13.5 flex w-full items-center px-4 py-2.5">
      <h1 className="text-neutral-02 text-d2">{children}</h1>
    </div>
  );
};
