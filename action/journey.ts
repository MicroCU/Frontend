"use server";

import { cookies } from "next/headers";
import { HomePageData, RecentlyPageData, SearchPageData } from "@/types/type";
import { AuthError } from "@/constants/error";
import { getHomeResult } from "@/mock/journey_data";

export const fetchJourney = async (lang: string) => {
    // const accessToken = cookies().get("access_token");

    // if (!accessToken) {
    //     throw new Error(AuthError.ERR_ACCESS_TOKEN);
    // }

    // const res = await fetch(process.env.MCV_JOURNEY_URL! + "?lang=" + lang, {
    //     headers: {
    //         Authorization: `Bearer ${accessToken.value}`
    //     }
    // });
    // const resp = await res.json();
    const resp = await getHomeResult();
    return {
        status: resp.status,
        msg: resp.message,
        data: resp.data as HomePageData
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
    const resp = await res.json();
    return {
        status: resp.status,
        msg: resp.message,
        data: resp.data as RecentlyPageData
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
    const resp = await res.json();
    return {
        status: resp.status,
        msg: resp.message,
        data: resp.data as SearchPageData
    }
}