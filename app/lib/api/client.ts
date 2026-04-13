import axios, { type AxiosInstance } from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:8080";

export const clientInstance: AxiosInstance = (() => {
  return axios.create({
    baseURL: "/api",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
})();