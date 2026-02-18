"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { NavBar } from "@/components/common/NavBar";
import { InvitationModal } from "@/components/garden/modal/InvitiationModalWrapper";
import { ChatProgress } from "@/components/home/ChatProgress";
import { Header } from "@/components/home/Header";
import { PlantProgress } from "@/components/home/PlantProgress";

import { GardenListResponse } from "@/types/plant.type";
import {
  InvitationContent,
  InviteResponse,
  PlantInvite,
} from "@/types/plantInvite.type";

import { getInvitationList, patchInvite } from "./api/garden/invite.api";
import { getPlantWidget } from "./api/home/home.api";

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [plantData, setPlantData] = useState<GardenListResponse | null>(null);
  const [inviteCome, setInviteCome] = useState(false);
  const [inviteData, setInviteData] = useState<InvitationContent[]>([]);
  const [inviteCount, setInviteCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 홈 위젯 식물 리스트
  useEffect(() => {
    const fetchPlantList = async () => {
      try {
        const data = await getPlantWidget();
        setPlantData(data);
      } catch (error) {
        console.error("식물데이터 가져오기 실패", error);
      }
    };
    fetchPlantList();
  }, []);

  // 정원 식물 초대장 로직
  useEffect(() => {
    const fetchInvitationList = async () => {
      try {
        const data = await getInvitationList();
        console.log(data);
        setInviteData(data.invitations);
        setInviteCount(data.count);
        setInviteCome(data.count > 0);

        if (data.count > 0) {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    };
    fetchInvitationList();
  }, []);

  const handleInviteAction = async (id: number, status: InviteResponse) => {
    try {
      await patchInvite(id, status);

      setInviteData(prev => {
        const nextData = prev.slice(1); // 첫 번째 요소 삭제
        setInviteCount(nextData.length);
        if (nextData.length === 0) setIsModalOpen(false);
        return nextData;
      });
      console.log(`${id} 처리 성공`);
    } catch (error) {
      console.error(`${status} 처리 실패:`, error);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleCloseAndPushBack(); // 순서 변경 로직 실행
  };

  const handleCloseAndPushBack = () => {
    setInviteData(prev => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

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
        <Header
          hasNewInvite={inviteCount > 0}
          onAlarmClick={() => inviteCount > 0 && setIsModalOpen(true)}
        />
      </div>

      <div className="pt-[23.5px] pb-[75px]">
        {plantData && <PlantProgress plantProgressData={plantData} />}
      </div>
      <div className="pb-[119px]">
        <ChatProgress />
      </div>
      <div className="fixed bottom-0 w-full max-w-[440px]">
        <NavBar />
      </div>
      {isModalOpen && inviteData.length > 0 && (
        <InvitationModal
          inviteContent={inviteData[0]}
          onClose={handleCloseModal}
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
