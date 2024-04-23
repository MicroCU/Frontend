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
    if (res.status === 200) {
        const resp = await res.json();
        return {
            status: res.status,
            msg: resp.msg
        }
    }
    return {
        status: res.status,
        msg: res.statusText
    }
}

export const markedAsCompleteVideo = async (sourceType: string, sourceId: string) => {
    const accessToken = cookies().get("access_token");

    if (!accessToken) {
        throw new Error(AuthError.ERR_ACCESS_TOKEN);
    }

    const res = await fetch(process.env.MCV_MICRO_MARKED_AS_COMPLETE_URL! + sourceId + "/complete/patch?source_type=" + sourceType, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        }
    });
    if (res.status === 200) {
        const resp = await res.json();
        return {
            status: res.status,
            msg: resp.message
        }
    }
    return {
        status: res.status,
        msg: res.statusText
    }
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
    if (res.status === 200) {
        const resp = await res.json();
        return {
            status: res.status,
            data: resp.data
        }
    }
    return {
        status: res.status,
        msg: res.statusText
    }
}