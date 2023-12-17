import axiosInstance, { BASE_API } from "../https";

export const getInteractionsApi = async ({
  currentPage,
  selectedCategory,
  itemsPerPage,
}) => {
  if (!selectedCategory) {
    return {
      totalItems: 0,
      data: [],
      totalPages: 0,
      currentPage: 0,
    };
  }

  const { data } = await axiosInstance.get(
    `${BASE_API}/interactions/topic/${selectedCategory.value}?page=${
      currentPage - 1
    }&size=${itemsPerPage}`
  );

  return data.data;
};

export const saveInteractionsApi = (data) => {
  return axiosInstance.post(`${BASE_API}/interactions`, data);
};
