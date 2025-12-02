import { bodinhoApi } from "@/helpers/http";

export async function LoadRedirectAuthDiscordRequest(): Promise<void> {
  return await bodinhoApi.get(`/oauth/discord`).then((res) => res.data);
}
