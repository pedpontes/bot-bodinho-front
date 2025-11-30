import { Axios } from "axios";

const PORT = 8080;

function httpHelper() {
  const axios = new Axios({
    baseURL: process.env.NEXT_PUBLIC_API_URL || `http://localhost:${PORT}/api`,
  });

  return axios;
}

export const bodinhoApi = httpHelper();
