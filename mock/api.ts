import { ErrorAPI, HomePageData, JourneyData, JourneyStoreData, RecentlyPageData, SearchPageData } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import { getHomeResult } from "./journey_data";
import { convertRecentlyToJourney, getRecentlyResult } from "./recently_data";
import { convertSearchToJourney, getSearchResult } from "./search_data";

export async function fetchJourneyGraph(setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
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

export async function fetchJourneyNormal(setJourneysNormal: Dispatch<SetStateAction<JourneyData[] | null>>, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
    setJourneysNormal(null);
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
        setJourneysNormal(result.journeys);
    } catch (error) {
        console.error("error: ", error);
    }
}

export async function fetchRecentlyGraph(setRecently: Dispatch<SetStateAction<JourneyStoreData | null>>, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
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

export async function fetchRecentlyNormal(setRecently: Dispatch<SetStateAction<JourneyData[] | null>>, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
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
        setRecently(journey.data);
    } catch (error) {
        console.error("error: ", error);
    }
}


export async function fetchSearchGraph(setSearch: Dispatch<SetStateAction<JourneyStoreData | null>>, serachText: string, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
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

export async function fetchSearchNormal(setSearch: Dispatch<SetStateAction<JourneyData[] | null>>, serachText: string, setError: Dispatch<SetStateAction<ErrorAPI | null>>) {
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
        setSearch(journey.data);
    } catch (error) {
        console.error("error: ", error);
    }
}