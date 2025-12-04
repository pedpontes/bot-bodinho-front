import axios from "axios";

const PORT = 8080;
const useLocalhost = true;

export let BASE_URL: string | null;

function httpHelper() {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  
  switch (hostname) {
    case "bot-bodinho-front.vercel.app":
      BASE_URL = "https://bodinho-discord.ddns.net";
      break;
    default:
      if (useLocalhost && typeof window !== 'undefined') {
        BASE_URL = `http://${hostname}:${PORT}`;
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
