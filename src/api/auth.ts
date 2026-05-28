import { apiUrl } from "@/api/config";

type LoginResponse = {
  accessToken: string;
};

export async function login(
  usernameOrEmail: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernameOrEmail,
      password,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("INVALID_CREDENTIALS");
    }

    throw new Error("LOGIN_REQUEST_ERROR");
  }

  const data = (await response.json()) as Partial<LoginResponse>;

  if (!data.accessToken) {
    console.log(data);
    throw new Error("LOGIN_REQUEST_ERROR");
  }

  return {
    accessToken: data.accessToken,
  };
}
