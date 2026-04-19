import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  name: string;
}

interface AppState {
  user: User | null;
  isDarkMode: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isDarkMode: false,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "pocket-doctor-storage", // name of the item in the storage (must be unique)
    }
  )
);
