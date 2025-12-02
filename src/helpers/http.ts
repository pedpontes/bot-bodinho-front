import axios from "axios";

const PORT = 8080;
export const BASE_URL = `http://localhost:${PORT}`;

function httpHelper() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || BASE_URL,
    withCredentials: true,
  });

  return instance;
}

export const bodinhoApi = httpHelper();
