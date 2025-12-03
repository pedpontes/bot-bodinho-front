import { bodinhoApi } from "@/helpers/http";
import {
  UploadPaginationRequest,
  UploadPaginationResponse,
} from "@/interfaces/upload";

export async function LoadUploadsPaginationRequest(
  data: UploadPaginationRequest
): Promise<UploadPaginationResponse> {
  return await bodinhoApi
    .get("/api/uploads", {
      params: data,
    })
    .then((response) => response.data);
}
