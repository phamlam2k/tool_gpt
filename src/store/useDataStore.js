// store.js
import create from "zustand";

const useDataStore = create((set) => ({
  selectedCategory: {
    value: "js",
    label: "javascript",
  },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  itemsPerPage: 9,
}));

export default useDataStore;
