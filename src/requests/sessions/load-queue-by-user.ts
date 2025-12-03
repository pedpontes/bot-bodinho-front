import { bodinhoApi } from "@/helpers/http";
import { LoadQueueByUserResponse } from "@/interfaces/session";

export async function LoadQueueByUserRequest(): Promise<LoadQueueByUserResponse> {
  return await bodinhoApi
    .get(`/api/sessions/queue`)
    .then((response) => response.data);
}
