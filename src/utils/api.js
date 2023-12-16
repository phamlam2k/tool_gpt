import axiosInstance, { BASE_API } from "../https";

export const getInteractionsApi = () => {
  return axiosInstance.get(`${BASE_API}/interactions`);
};

export const saveInteractionsApi = (data) => {
  return axiosInstance.post(`${BASE_API}/interactions`, data);
};
