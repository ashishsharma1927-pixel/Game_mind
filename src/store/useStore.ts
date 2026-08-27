import { create } from 'zustand';

interface AppState {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const useStore = create<AppState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
