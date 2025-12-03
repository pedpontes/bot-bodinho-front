import { bodinhoApi } from "@/helpers/http";
import { UploadModel } from "@/interfaces/upload";

export async function PlayUploadByIdRequest(
  id: UploadModel["id"]
): Promise<void> {
  await bodinhoApi.post(`/api/uploads/${id}/play`);
}


