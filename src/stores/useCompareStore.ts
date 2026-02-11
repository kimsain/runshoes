import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareStore {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      compareIds: [],

      addToCompare: (id: string) => {
        const { compareIds } = get();
        if (compareIds.length >= 3) {
          // Remove the first one and add new
          set({ compareIds: [...compareIds.slice(1), id] });
        } else if (!compareIds.includes(id)) {
          set({ compareIds: [...compareIds, id] });
        }
      },

      removeFromCompare: (id: string) => {
        const { compareIds } = get();
        set({ compareIds: compareIds.filter((i) => i !== id) });
      },

      clearCompare: () => {
        set({ compareIds: [] });
      },

      isInCompare: (id: string) => {
        return get().compareIds.includes(id);
      },
    }),
    {
      name: 'compare-storage',
    }
  )
);
