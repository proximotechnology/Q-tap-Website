import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  isUserAuthenticated: false,

  // Set user
  setUser: (userData) => set({ isUserAuthenticated: true, user: userData }),

  // Clear user (logout)
  clearUser: () => set({ user: null, isUserAuthenticated: false }),

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
