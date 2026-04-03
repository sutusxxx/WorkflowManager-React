import axios, { type AxiosInstance } from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:8080";
const API_VERSION = import.meta.env.API_VERSION || "v1";

export const serverInstance: AxiosInstance = (() => {
  return axios.create({
    baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    validateStatus: (status: number) => status < 500
  });
})();
