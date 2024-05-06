"use server";

import { cookies } from "next/headers";
import { HomePageData, JourneyALLData, RecentlyPageData, SearchPageData } from "@/types/type";
import { AuthError } from "@/constants/error";

export const fetchJourney = async (lang: string) => {
    const accessToken = cookies().get("access_token");

    if (!accessToken) {
        throw new Error(AuthError.ERR_ACCESS_TOKEN);
    }

    const res = await fetch(process.env.MCV_JOURNEY_URL! + "?lang=" + lang, {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        }
    });
    if (res.status === 200) {
        const resp = await res.json();
        return {
            status: res.status,
            data: resp.data as HomePageData
        }
    }
    return {
        status: res.status,
        msg: res.statusText
    }
}

export const fetchRecently = async (lang: string) => {
    const accessToken = cookies().get("access_token");

    if (!accessToken) {
        throw new Error(AuthError.ERR_ACCESS_TOKEN);
    }

    const res = await fetch(process.env.MCV_PATH_RECENT_URL! + "?lang=" + lang, {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        }
    });
    if (res.status === 200) {
        const resp = await res.json();
        return {
            status: res.status,
            data: resp.data as RecentlyPageData
        }
    }
    return {
        status: res.status,
        msg: res.statusText
    }
}

export const fetchSearch = async (searchText: string, lang: string) => {
    const accessToken = cookies().get("access_token");

    if (!accessToken) {
        throw new Error(AuthError.ERR_ACCESS_TOKEN);
    }

    const res = await fetch(process.env.MCV_PATH_SEARCH_URL! + "?search=" + searchText + "&lang=" + lang, {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        }
    });
    if (res.status == 200) {
        const resp = await res.json();
        return {
            status: res.status,
            data: resp.data as SearchPageData
        }
    }
    return {
        status: res.status,
        msg: res.statusText
    }
}