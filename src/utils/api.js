import { AUTH_TOKEN } from "../config/const";
import axiosInstance, { BASE_API } from "../https";

export const getInteractions = async () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN);

    const response = await fetch(`${BASE_API}/interactions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const rawResponse = response.json();

    return rawResponse;
  } catch (error) {
    console.log("Error", error);
  }
};

export const saveInteractionsApi = (data) => {
  return axiosInstance.post(`${BASE_API}/interactions`, data);
};
