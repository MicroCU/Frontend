"use server";

import { AuthError } from "@/constants/error";
import { cookies } from "next/headers";

export const updateRecentlyPath = async (id: string) => {
    const accessToken = cookies().get("access_token");

    if (!accessToken) {
        throw new Error(AuthError.ERR_ACCESS_TOKEN);
    }

    const res = await fetch(process.env.MCV_PATH__UPDATE_RECENT_URL! + id + "/patch", {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        }
    });
    const resp = await res.json();
    return resp;
}

// export const updateMicroProgress = async (id: string, progress: number) => { // TODO
//     if (!id) {
//         return;
//     }
//     const resp = await updatePathProgress(id, 100);
//     return resp;
// }

export const fetchPath = async (id: string, lang: string) => {
    const accessToken = cookies().get("access_token");

    if (!accessToken) {
        throw new Error(AuthError.ERR_ACCESS_TOKEN);
    }

    const res = await fetch(process.env.MCV_PATH_URL! + id + "/get?lang=" + lang, {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        }
    });
    const resp = await res.json();
    return resp;
}