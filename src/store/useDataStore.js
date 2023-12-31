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

  keyword: "",
  setKeyword: (keyword) => set({ keyword: keyword }),

  sortDir: "desc",
  setSortDir: (sortDir) => set({ sortDir: sortDir }),

  sortBy: "",
  setSortBy: (sortBy) => set({ sortBy: sortBy }),
}));

export default useDataStore;
