import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CombinedFriend } from "@/types/friendProfile.type";

interface GardenState {
  selectedPlantId: string | null;
  nickname: string;
  invitedFriendId: number | null;
  invitedFriend: CombinedFriend | null; // 친구 객체 전체 저장 공간 추가
  message: string;
  setSelectedPlant: (id: string | null) => void;
  setNickname: (name: string) => void;
  setInvitedFriendId: (friendId: number | null) => void;
  setInvitedFriend: (friend: CombinedFriend | null) => void; // 설정 함수 추가
  resetForm: () => void;
  setMessage: (message: string) => void;
}

export const useGardenStore = create<GardenState>()(
  persist(
    set => ({
      selectedPlantId: null,
      nickname: "",
      invitedFriendId: null,
      invitedFriend: null, // 초기값
      message: "",

      setSelectedPlant: id => set({ selectedPlantId: id }),
      setNickname: name => set({ nickname: name }),
      setInvitedFriendId: friendId => set({ invitedFriendId: friendId }),
      setInvitedFriend: friend => set({ invitedFriend: friend }), // 구현
      setMessage: message => set({ message: message }),
      resetForm: () =>
        set({
          selectedPlantId: null,
          nickname: "",
          invitedFriendId: null,
          invitedFriend: null,
          message: "",
        }),
    }),
    {
      name: "garden-registration-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
