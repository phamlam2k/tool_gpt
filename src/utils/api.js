import { AUTH_TOKEN } from "../config/const";

export const BASE_API = "http://192.168.17.34:8081";

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

export const saveInteractions = async (data) => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN);

    const response = await fetch(`${BASE_API}/interactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const rawResponse = response.json();

    return rawResponse;
  } catch (error) {
    console.log("ERror", error);
  }
};
