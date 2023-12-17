// store.js
import create from "zustand";

const useCommonStore = create((set) => ({
  selectedPrompt: null,
  setSelectedPrompt: (prompt) => set({ selectedPrompt: prompt }),
}));

export default useCommonStore;
