import { create } from 'zustand'

export const useCarStore = create((set) => ({
    currentIndex: 0,
    direction: 'right',
    setIndex: (i, dir = 'right') => set({ currentIndex: i, direction: dir }),
    next: (total) => set((s) => ({
        currentIndex: (s.currentIndex + 1) % total,
        direction: 'right',
    })),
    prev: (total) => set((s) => ({
        currentIndex: (s.currentIndex - 1 + total) % total,
        direction: 'left',
    })),
}))