import { bodinhoApi } from "@/helpers/http";

export async function LogoutRequest(): Promise<void> {
  try {
    await bodinhoApi.get("/api/auth/logout");
  } catch {}
}
