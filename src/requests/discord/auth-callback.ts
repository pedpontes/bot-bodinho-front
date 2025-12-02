import { bodinhoApi } from "@/helpers/http";
import { LoadAuthCredentialsByCodeDiscordResult } from "@/interfaces/discord";

export async function LoadAuthDiscordProviderByCode(
  code: string
): Promise<LoadAuthCredentialsByCodeDiscordResult> {
  return await bodinhoApi
    .get(`/webhook/discord/auth?code=` + code)
    .then((response) => response.data);
}
