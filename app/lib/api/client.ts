import axios from 'axios';

export const clientApi = (() => {
  return axios.create({
    baseURL: "/api",
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  });
})();

clientApi.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401 && window.location.pathname !== "/login") {
    console.log("Unauthorized, redirecting to login...");
    window.location.href = "/login";
    return;
  }

  throw error;
});
