// store.js
import create from "zustand";

const useDataStore = create((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  itemsPerPage: 3,
}));

export default useDataStore;
