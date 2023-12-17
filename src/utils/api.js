import axiosInstance, { BASE_API } from "../https";

export const getInteractionsApi = async ({
  currentPage,
  selectedCategory,
  itemsPerPage,
}) => {
  let url = `${BASE_API}/interactions`;

  if (selectedCategory) {
    url = url + `/topic/${selectedCategory.value}`;
  }

  const { data } = await axiosInstance.get(url);

  return data.data;
};

export const saveInteractionsApi = (data) => {
  return axiosInstance.post(`${BASE_API}/interactions`, data);
};
