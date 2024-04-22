"use server";

import { AuthError } from "@/constants/error";
import { getPathResult, updatePathProgress } from "@/mock/path_data";
import { cookies } from "next/headers";

export const updateRecentlyPath = async (id: string) => {
    if (!id) {
        return;
    }
    const resp = await updatePathProgress(id, 100); // Marked as completed only
    return resp;
}

export const fetchPath = async (id: string, lang: string) => {
    if (!id) {
        return {
            status: 400,
            message: "Invalid path id",
            data: {
                path: null
            }
        }
    }
    // const accessToken = cookies().get("access_token");

    // if (!accessToken) {
    //     throw new Error(AuthError.ERR_ACCESS_TOKEN);
    // }

    // const res = await fetch(process.env.MCV_PATH_URL! + id + "/get?lang=" + lang, {
    //     headers: {
    //         Authorization: `Bearer ${accessToken.value}`
    //     }
    // });
    // const resp = await res.json();
    const resp = await getPathResult(id);
    return resp;
}