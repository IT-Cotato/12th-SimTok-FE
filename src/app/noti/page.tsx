"use client";

import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { BackHeader } from "@/components/common/BackHeader";
import { NotiItem } from "@/components/noti/NotiItem";
import { NotiSection } from "@/components/noti/NotiSection";

import { Notification, NotificationSection } from "@/types/noti.type";

import {
  getNotifications,
  patchReadAllNotifications,
} from "../api/noti/noti.api";

const SECTION_LABEL: Record<NotificationSection, string> = {
  GARDEN: "정원",
  DAILY_RECORD: "하루기록",
  CHAT: "채팅",
};

const SECTION_ORDER: NotificationSection[] = ["GARDEN", "DAILY_RECORD", "CHAT"];

function formatRelativeTime(createdAt: string): string {
  const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
  if (diff < 60) return `${diff}초`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간`;
  return `${Math.floor(diff / 86400)}일`;
}

const NotiPage = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    patchReadAllNotifications().then(() => {
      queryClient.invalidateQueries({ queryKey: ["unreadNotificationCount"] });
    });
  }, [queryClient]);

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const notifications = data?.notifications ?? [];

  const groupedBySection = SECTION_ORDER.reduce<
    Record<NotificationSection, Notification[]>
  >(
    (acc, section) => {
      acc[section] = notifications.filter(n => n.section === section);
      return acc;
    },
    { GARDEN: [], DAILY_RECORD: [], CHAT: [] },
  );

  return (
    <main className="flex min-h-dvh w-full flex-col">
      <div className="flex flex-1 justify-center">
        <div className="mt-[13px] flex h-full w-110 flex-col pb-30">
          <BackHeader title="알림" />
          {SECTION_ORDER.map(section => {
            const items = groupedBySection[section];
            if (items.length === 0) return null;
            return (
              <NotiSection key={section} title={SECTION_LABEL[section]}>
                {items.map(item => (
                  <NotiItem
                    key={item.notificationId}
                    imgUrl={item.imageUrl}
                    content={item.content}
                    timeText={formatRelativeTime(item.createdAt)}
                  />
                ))}
              </NotiSection>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default NotiPage;
