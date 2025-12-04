import axios from "axios";

const PORT = 8080;
const useLocalhost = true;

export let BASE_URL: string | null;

function httpHelper() {
  switch (location.hostname) {
    case "bot-bodinho-front.vercel.app":
      BASE_URL = "https://bodinho-discord.ddns.net";
    default:
      if (useLocalhost) {
        BASE_URL = `http://${location.hostname}:${PORT}`;
        break;
      }
      BASE_URL = "https://bodinho-discord.ddns.net";
  }

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || BASE_URL,
    withCredentials: true,
  });

  return instance;
}

export const bodinhoApi = httpHelper();
