"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { NavBar } from "@/components/common/NavBar";
import { ChatProgress } from "@/components/home/ChatProgress";
import { Header } from "@/components/home/Header";
import { PlantProgress } from "@/components/home/PlantProgress";

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
      setTimeout(() => setIsAuthenticated(false), 0);
    } else {
      setTimeout(() => setIsAuthenticated(true), 0);
    }
  }, [router]);

  if (isAuthenticated !== true) {
    return null;
  }

  return (
    <main className="w-full">
      <div className="mt-[8.5px]">
        <Header />
      </div>

      <div className="pt-[23.5px] pb-[75px]">
        <PlantProgress />
      </div>
      <div className="pb-[119px]">
        <ChatProgress />
      </div>
      <div className="fixed bottom-0 w-full max-w-[440px]">
        <NavBar />
      </div>
    </main>
  );
}
