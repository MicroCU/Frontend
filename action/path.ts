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

export const updateVideoProgress = async (videoId: string, pathId: string, type: string, numTicks: number, watchedPartition: number[]) => {
    const accessToken = cookies().get("access_token");

    if (!accessToken) {
        throw new Error(AuthError.ERR_ACCESS_TOKEN);
    }

    const res = await fetch(process.env.MCV_MICRO_UPDATE_VIDEO_PROGRESS_URL! + videoId + "/progress/patch?path_id=" + pathId + "&type=" + type + "&num_tick=" + numTicks + "&watched_partition=" + watchedPartition, {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        }
    });
    const resp = await res.json();
    return resp;
}

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