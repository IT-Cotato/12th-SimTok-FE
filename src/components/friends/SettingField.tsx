"use client";
import type { ReactNode } from "react";
import { useState } from "react";

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

import { ChatFrequencyModal } from "./ChatFrequencyModal";

interface SettingFieldProps {
  userName: string;
  goalDays?: number;
  chatStyle?: ChatStyle;
  chatTopic: ChatTopic[];
  onChangeGoalDays: (value?: number) => void;
  onChangeChatStyle: (style: ChatStyle) => void;
  onToggleChatTopic: (topic: ChatTopic) => void;
}

const getChatFrequencyLabel = (goalDays?: number) =>
  CHAT_FREQUENCY_OPTIONS.find(o => o.value === goalDays)?.label ??
  "대화하고 싶은 정도를 선택해주세요";

export const SettingField = (props: SettingFieldProps) => {
  const {
    userName,
    goalDays,
    chatStyle,
    chatTopic,
    onChangeGoalDays,
    onChangeChatStyle,
    onToggleChatTopic,
  } = props;

  const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);

  const openFrequencySelectModal = () => {
    setIsFrequencyModalOpen(true);
  };

  const closeFrequencySelectModal = () => {
    setIsFrequencyModalOpen(false);
  };

  const SETTINGS_SECTION_RENDERER: Record<SettingsMenuKey, () => ReactNode> = {
    friendName: () => (
      <div className="bg-neutral-11 flex h-[55px] items-center gap-[10px] rounded-2xl px-[10px] py-2">
        <ProfileIcon className="text-neutral-07 h-6 w-6" />
        <span className="text-h2 text-neutral-07">{userName}</span>
      </div>
    ),

    chatFrequency: () => (
      <>
        <div
          className="bg-neutral-11 flex h-[55px] cursor-pointer items-center justify-between rounded-2xl px-[10px] py-2"
          onClick={openFrequencySelectModal}
        >
          <span className="text-neutral-07 text-h2">
            {getChatFrequencyLabel(goalDays)}
          </span>
          <DownArrow className="text-neutral-07 h-6 w-6" />
        </div>

        {isFrequencyModalOpen && (
          <ChatFrequencyModal
            value={goalDays}
            onChange={days => {
              onChangeGoalDays(days);
              closeFrequencySelectModal();
            }}
            onClose={closeFrequencySelectModal}
          />
        )}
      </>
    ),

    chatStyle: () => (
      <div className="flex gap-[45px]">
        {CHAT_STYLE.map(({ key, label }) => {
          const styleKey = key as ChatStyle;
          const isSelected = chatStyle === styleKey;

          return (
            <div key={key} className="flex items-center gap-[10px]">
              <button
                type="button" // form 전송 방지
                className={`relative h-6 w-6 cursor-pointer rounded-full transition-colors ${
                  isSelected
                    ? "bg-mint-01 border-none"
                    : "border-neutral-08 border"
                }`}
                onClick={() => onChangeChatStyle(key as ChatStyle)}
              >
                {isSelected && (
                  <CheckIcon className="absolute inset-0 m-auto h-5 w-5 text-white" />
                )}
              </button>
              <span
                className={`text-h2 transition-colors ${
                  isSelected ? "text-neutral-01 font-bold" : "text-neutral-07"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    ),


    chatTopic: () => (
      <div className="grid grid-cols-3 gap-[10px]">
        {CHAT_TOPIC.map(({ key, label, icon }: ChatTopicItem) => (
          <button
            key={key}
            className={`flex h-[55px] max-w-[127px] cursor-pointer items-center justify-center rounded-2xl border ${
              chatTopic.includes(key) ? "border-mint-01" : "border-neutral-08"
            }`}
            onClick={() => onToggleChatTopic(key)}
          >
            {icon && <img src={icon} alt={label} className="h-6 w-6" />}
            <p className="text-h2 text-neutral-01">{label}</p>
          </button>
        ))}
      </div>
    ),
  };

  return (
    <section className="flex flex-col gap-5">
      {FRIENDS_SETTINGS_MENU.map(({ key, title }) => (
        <div key={key} className="flex flex-col gap-[6px] px-4">
          <h1 className="text-h3 text-neutral-05">{title}</h1>
          {SETTINGS_SECTION_RENDERER[key]()}
        </div>
      ))}
    </section>
  );
};
