import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GardenState {
  selectedPlantId: string | null;
  nickname: string;
  invitedFriendId: string | null;

  setSelectedPlant: (id: string | null) => void;
  setNickname: (name: string) => void;
  setInvitedFriend: (friendId: string | null) => void;
  resetForm: () => void;
}

export const useGardenStore = create<GardenState>()(
  persist(
    set => ({
      selectedPlantId: null,
      nickname: "",
      invitedFriendId: null,

      setSelectedPlant: id => set({ selectedPlantId: id }),
      setNickname: name => set({ nickname: name }),
      setInvitedFriend: friendId => set({ invitedFriendId: friendId }),
      resetForm: () =>
        set({ selectedPlantId: null, nickname: "", invitedFriendId: null }),
    }),
    {
      name: "garden-registration-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
