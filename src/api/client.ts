import { apiUrl } from "@/api/config";
import { getToken } from "@/auth/tokenStorage";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();

  return fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
