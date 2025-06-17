import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,

  // Set user
  setUser: (userData) => set({ user: userData }),

  // Clear user (logout)
  clearUser: () => set({ user: null }),

  // Update part of the user object
  updateUser: (partialData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...partialData,
      },
    })),
}));

export default useUserStore;
