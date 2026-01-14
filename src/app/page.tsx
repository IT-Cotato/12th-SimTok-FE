import { NavBar } from "@/components/common/NavBar";
import { ChatProgress } from "@/components/home/ChatProgress";
import { Header } from "@/components/home/Header";

export default function HomePage() {
  return (
    <main className="w-full">
      <Header />
      <div className="pt-[81.5px] pb-[75px]">{/* 식물 */}</div>
      <div className="pb-[119px]">
        <ChatProgress />
      </div>
      <div className="fixed bottom-0 w-full max-w-[440px]">
        <NavBar />
      </div>
    </main>
  );
}
