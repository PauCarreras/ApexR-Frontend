import { apiFetch } from "@/api/client";

export type UserInfo = {
    Id: string;
    Email: string;
    Username: string;
    DisplayName: string | null;
    AvatarUrl: string | null;
    totalXp?:number;
    CreatedAtUtc: string;
}
export type UserEvents = {
    Id?: string;
    Name?: string;
    Description?: string;
    LocationName?: string;
    EventDate?: string;
    EventTime?: string;
    EventType?: string;
    id?: string;
    name?: string;
    description?: string;
    locationName?: string;
    eventDate?: string;
    eventTime?: string;
    eventType?: string;
}
export async function GetUserInfo(): Promise<UserInfo> {
    const response = await apiFetch("/user/me");
    if (!response.ok){
        if(response.status === 401)
        {
            throw new Error("UNAUTHORIZED");
        }
        
        throw new Error("USER_REQUEST_ERROR");
    }
    return response.json();
}
export async function GetUserEvents(): Promise<UserEvents[]>{
    const response = await apiFetch("/user/me/events");
    if (!response.ok){
        if(response.status === 401)
        {
            throw new Error("UNAUTHORIZED");
        }
        
        throw new Error("USER_REQUEST_ERROR");
    }
    return response.json();
}
