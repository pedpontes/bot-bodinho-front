import { bodinhoApi } from "@/helpers/http";
import { SessionModel } from "@/interfaces/session";

export async function LoadSessionByIdRequest(
  id: SessionModel["id"]
): Promise<Record<string, SessionModel>> {
  return await bodinhoApi
    .get(`/sessions/${id}`)
    .then((response) => response.data);
}
