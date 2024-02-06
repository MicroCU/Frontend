import { ErrorAPI, HomePageData, JourneyStoreData, RecentlyPageData, SearchPageData } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import { getHomeResult } from "./journey_data";
import { convertRecentlyToJourney, getRecentlyResult } from "./recently_data";
import { convertSearchToJourney, getSearchResult } from "./search_data";

export async function fetchJourneyForNormal(setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
    setJourneys(null);
    try {
        const resp = await getHomeResult();
        const status = resp.status;
        if (status !== 200) {
            const errMesg = resp.message;
            setError({
                status: status,
                message: errMesg ? errMesg : "Unknown error"
            });
            return;
        }
        const result = resp.data as HomePageData;
        setJourneys({
            data: result.journeys,
            relationships: result.relationships
        });
    } catch (error) {
        console.error("error: ", error);
    }
}

export async function fetchRecentlyForNormal(setRecently: Dispatch<SetStateAction<JourneyStoreData | null>>, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
    setRecently(null);
    try {
        const resp = await getRecentlyResult();
        const status = resp.status;
        if (status !== 200) {
            const errMesg = resp.message;
            setError({
                status: status,
                message: errMesg ? errMesg : "Unknown error"
            });
            return;
        }
        const result = resp.data as RecentlyPageData;
        const journey = convertRecentlyToJourney(result);
        setRecently(journey);
    } catch (error) {
        console.error("error: ", error);
    }
}

export async function fetchSearchForNormal(setSearch: Dispatch<SetStateAction<JourneyStoreData | null>>, serachText: string, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
    setSearch(null);
    try {
        const resp = await getSearchResult(serachText);
        const status = resp.status;
        if (status !== 200) {
            const errMesg = resp.message;
            setError({
                status: status,
                message: errMesg ? errMesg : "Unknown error"
            });
            return;
        }
        const result = resp.data as SearchPageData;
        const journey = convertSearchToJourney(result);
        setSearch(journey);
    } catch (error) {
        console.error("error: ", error);
    }
}