import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GardenState {
  selectedPlantId: string | null;
  nickname: string;
  invitedFriendId: number | null;
  message: string;
  setSelectedPlant: (id: string | null) => void;
  setNickname: (name: string) => void;
  setInvitedFriendId: (friendId: number | null) => void;
  resetForm: () => void;
  setMessage: (message: string) => void;
}

export const useGardenStore = create<GardenState>()(
  persist(
    set => ({
      selectedPlantId: null,
      nickname: "",
      invitedFriendId: null,
      message: "",

      setSelectedPlant: id => set({ selectedPlantId: id }),
      setNickname: name => set({ nickname: name }),
      setInvitedFriendId: friendId => set({ invitedFriendId: friendId }),
      setMessage: message => set({ message: message }),
      resetForm: () =>
        set({
          selectedPlantId: null,
          nickname: "",
          invitedFriendId: null,
          message: "",
        }),
    }),
    {
      name: "garden-registration-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
