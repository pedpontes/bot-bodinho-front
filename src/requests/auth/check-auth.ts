import { bodinhoApi } from "@/helpers/http";
import { UserModel } from "@/interfaces/user";

export async function CheckAuthRequest(): Promise<UserModel | null> {
  try {
    const response = await bodinhoApi.get("/api/auth/me");
    return response.data;
  } catch {
    return null;
  }
}
