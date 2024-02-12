"use server";

import { getHomeResult } from "@/mock/journey_data";
import { getRecentlyResult } from "@/mock/recently_data";
import { getSearchResult } from "@/mock/search_data";
import { HomePageData, RecentlyPageData, SearchPageData } from "@/types/type";

// TODO: Implement the actual API call

export const fetchJourney = async () => {
    const resp = await getHomeResult();
    return {
        status: resp.status,
        message: resp.message,
        data: resp.data as HomePageData
    }
}

export const fetchRecently = async () => {
    const resp = await getRecentlyResult();
    // TODO: MAY NEED TO add revalidate
    return {
        status: resp.status,
        message: resp.message,
        data: resp.data as RecentlyPageData
    }
}

export const fetchSearch = async (searchText: string) => {
    const resp = await getSearchResult(searchText);
    return {
        status: resp.status,
        message: resp.message,
        data: resp.data as SearchPageData
    }
}