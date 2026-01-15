"use client";
import dynamic from "next/dynamic";

const SharedDiaryFunnel = dynamic(
  () =>
    import("../../../components/sharedDiary/SharedDiaryFunnel").then(
      mod => mod.SharedDiaryFunnel,
    ),
  {
    ssr: false,
  },
);

export default function SharedDiaryUploadPage() {
  return <SharedDiaryFunnel />;
}
