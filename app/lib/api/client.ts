import axios from 'axios';

export const clientApi = (() => {
  return axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  });
})();