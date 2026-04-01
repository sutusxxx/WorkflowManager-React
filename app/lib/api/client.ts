import axios, { type AxiosInstance } from 'axios';

export const clientInstance: AxiosInstance = (() => {
  return axios.create({
    baseURL: "/api",
    headers: {
      Accept: 'application/json, text/plain, */*',
      "Content-Type": 'application/json',
    },
  });
})();