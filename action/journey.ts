"use server";

import { cookies } from "next/headers";
import { getHomeResult } from "@/mock/journey_data";
import { getRecentlyResult } from "@/mock/recently_data";
import { getSearchResult } from "@/mock/search_data";
import { HomePageData, RecentlyPageData, SearchPageData } from "@/types/type";
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
    const resp = await res.json();
    return {
        status: resp.status,
        msg: resp.message,
        data: resp.data as HomePageData
    }
}

export const fetchRecently = async () => {
    const resp = await getRecentlyResult();
    // TODO: MAY NEED TO add revalidate
    return {
        status: resp.status,
        msg: resp.message,
        data: resp.data as RecentlyPageData
    }
}

export const fetchSearch = async (searchText: string) => {
    const resp = await getSearchResult(searchText);
    return {
        status: resp.status,
        msg: resp.message,
        data: resp.data as SearchPageData
    }
}