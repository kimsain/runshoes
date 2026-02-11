import { create } from 'zustand';

interface UIStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  activeFilters: {
    brands: string[];
    categories: string[];
    priceRange: [number, number];
  };
  setActiveFilters: (filters: UIStore['activeFilters']) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  activeFilters: {
    brands: [],
    categories: [],
    priceRange: [0, 500000],
  },
  setActiveFilters: (filters) => set({ activeFilters: filters }),
}));
