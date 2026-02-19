"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

// 추가

import { NavBar } from "@/components/common/NavBar";
import { InvitationModal } from "@/components/garden/modal/InvitiationModalWrapper";
import { ChatProgress } from "@/components/home/ChatProgress";
import { Header } from "@/components/home/Header";
import { PlantProgress } from "@/components/home/PlantProgress";

import { GardenListResponse } from "@/types/plant.type";
import { InvitationContent, InviteResponse } from "@/types/plantInvite.type";

import { getInvitationList, patchInvite } from "./api/garden/invite.api";
import { getPlantWidget } from "./api/home/home.api";

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // 식물 리스트를 useQuery로 관리
  const { data: plantData } = useQuery<GardenListResponse>({
    queryKey: ["gardenList"],
    queryFn: getPlantWidget,
  });

  const [inviteData, setInviteData] = useState<InvitationContent[]>([]);
  const [inviteCount, setInviteCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvitationList = async () => {
      try {
        const data = await getInvitationList();
        setInviteData(data.invitations);
        setInviteCount(data.count);
        if (data.count > 0) setIsModalOpen(true);
      } catch (error) {
        console.error("초대장 로딩 실패", error);
      }
    };
    fetchInvitationList();
  }, []);

  const handleInviteAction = async (id: number, status: InviteResponse) => {
    try {
      await patchInvite(id, status);
      setInviteData(prev => {
        const nextData = prev.slice(1);
        setInviteCount(nextData.length);
        if (nextData.length === 0) setIsModalOpen(false);
        return nextData;
      });
    } catch (error) {
      console.error(`${status} 처리 실패:`, error);
    }
  };

  return (
    <main className="w-full">
      <div className="mt-[8.5px]">
        <Header
          hasNewInvite={inviteCount > 0}
          onAlarmClick={() => inviteCount > 0 && setIsModalOpen(true)}
        />
      </div>

      <div className="pt-[23.5px] pb-[75px]">
        {/* plantData가 변경되면 PlantProgress가 즉시 리렌더링됩니다 */}
        {plantData && <PlantProgress plantProgressData={plantData} />}
      </div>

      <div className="pb-[119px]">
        <ChatProgress />
      </div>

      <div className="fixed bottom-0 z-100 w-full max-w-[440px]">
        <NavBar />
      </div>

      {isModalOpen && inviteData.length > 0 && (
        <InvitationModal
          inviteContent={inviteData[0]}
          onClose={() => setIsModalOpen(false)}
          onAccept={() =>
            handleInviteAction(inviteData[0].inviteId, "ACCEPTED")
          }
          onDecline={() =>
            handleInviteAction(inviteData[0].inviteId, "REJECTED")
          }
        />
      )}
    </main>
  );
}
