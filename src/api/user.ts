import { apiFetch } from "@/api/client";

export type UserInfo = {
    Id: string;
    Email: string;
    Username: string;
    DisplayName: string | null;
    AvatarUrl: string | null;
    TotalXp?:number;
    CreatedAtUtc: string;
}
export async function GetUserInfo(): Promise<UserInfo> {
    const response = await apiFetch("/users/me");
    console.log(response)
    if (!response.ok){
        if(response.status === 401)
        {
            throw new Error("UNAUTHORIZED");
        }
        
        throw new Error("USER_REQUEST_ERROR");
    }
    return response.json();
}