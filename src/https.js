import axios from "axios";
import { AUTH_TOKEN } from "./config/const";

export const BASE_API = "https://103.226.250.83:8443";

const axiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    hasUserAgent: false,
  },
});

// Add a request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(AUTH_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
      } else if (error.response.status === 500) {
      } else if (error.response.status === 404) {
        // window.location.href = '/404'
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
