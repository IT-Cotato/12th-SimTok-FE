"use client";
import type { ReactNode } from "react";

import CheckIcon from "@/assets/check.svg";
import DownArrow from "@/assets/down-arrow.svg";
import PlusIcon from "@/assets/plus.svg";
import ProfileIcon from "@/assets/profile.svg";

import {
  CHAT_FREQUENCY_OPTIONS,
  CHAT_STYLE,
  CHAT_TOPIC,
  FRIENDS_SETTINGS_MENU,
  SettingsMenuKey,
} from "@/constants/friendsSettings";

import {
  ChatStyle,
  ChatTopic,
  ChatTopicItem,
} from "@/types/friendProfile.type";

interface SettingFieldProps {
  userName: string;
  goalDays?: number | undefined;
  chatStyle: ChatStyle;
  chatTopic: ChatTopic[];
}

const getChatFrequencyLabel = (goalDays?: number) =>
  CHAT_FREQUENCY_OPTIONS.find(o => o.value === goalDays)?.label ??
  "선택하지 않음";

const SETTINGS_SECTION_RENDERER: Record<
  SettingsMenuKey,
  (props: SettingFieldProps) => ReactNode
> = {
  friendName: ({ userName }) => (
    <div className="bg-neutral-11 flex h-[55px] items-center gap-[10px] rounded-2xl px-[10px] py-2">
      <ProfileIcon className="text-neutral-07 h-6 w-6" />
      <span className="text-h2 text-neutral-07">{userName}</span>
    </div>
  ),

  chatFrequency: ({ goalDays }) => (
    <div className="bg-neutral-11 flex h-[55px] cursor-pointer items-center justify-between rounded-2xl px-[10px] py-2">
      <span className="text-neutral-07 text-h2">
        {getChatFrequencyLabel(goalDays)}
      </span>
      <DownArrow className="text-neutral-07 h-6 w-6" />
    </div>
  ),

  chatStyle: ({ chatStyle }) => (
    <div className="flex gap-[45px]">
      {CHAT_STYLE.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-[10px]">
          <button
            className={`relative h-6 w-6 cursor-pointer rounded-full ${
              chatStyle === key ? "bg-mint-01" : "border-neutral-08 border"
            }`}
          >
            {chatStyle === key && (
              <CheckIcon className="absolute inset-0 m-auto h-5 w-5 text-white" />
            )}
          </button>
          <span className="text-h2 text-neutral-07">{label}</span>
        </div>
      ))}
    </div>
  ),
  chatTopic: ({ chatTopic }) => (
    <div className="grid grid-cols-3 gap-[10px]">
      {CHAT_TOPIC.map(({ key, label, icon }: ChatTopicItem) => (
        <button
          key={key}
          className={`flex h-[55px] w-[127px] cursor-pointer items-center justify-center rounded-2xl border ${chatTopic.includes(key) ? "border-mint-01" : "border-neutral-08"}`}
        >
          {key === "custom" ? (
            <PlusIcon className="h-6 w-6" />
          ) : (
            <>
              {icon && <img src={icon} alt={label} className="h-6 w-6" />}
              <p className="text-h2 text-neutral-01">{label}</p>
            </>
          )}
        </button>
      ))}
    </div>
  ),
};

export const SettingField = ({
  userName,
  goalDays,
  chatStyle,
  chatTopic,
}: SettingFieldProps) => {
  return (
    <section className="flex flex-col gap-5">
      {FRIENDS_SETTINGS_MENU.map(({ key, title }) => (
        <div key={key} className="flex flex-col gap-[6px] px-4">
          <h1 className="text-h3 text-neutral-05">{title}</h1>
          {SETTINGS_SECTION_RENDERER[key]({
            userName,
            goalDays,
            chatStyle,
            chatTopic,
          })}
        </div>
      ))}
    </section>
  );
};
