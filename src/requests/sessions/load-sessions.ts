import { bodinhoApi } from "@/helpers/http";
import { SessionModel } from "@/interfaces/session";

export async function LoadSessionsRequest(): Promise<SessionModel[]> {
  return await bodinhoApi
    .get("/api/sessions")
    .then((response) => response.data);
}
