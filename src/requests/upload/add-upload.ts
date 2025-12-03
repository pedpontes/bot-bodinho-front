import { bodinhoApi } from "@/helpers/http";
import { UploadModel } from "@/interfaces/upload";

export async function AddUploadRequest(file: File): Promise<UploadModel> {
  const formData = new FormData();
  formData.append("audio", file);

  return await bodinhoApi
    .post("/api/uploads", formData)
    .then((response) => response.data);
}
