import { JourneyData, JourneyStoreData } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import { getHomeResult } from "./journey_data";
import { convertRecentlyToJourney, getRecentlyResult } from "./recently_data";
import { convertSearchToJourney, getSearchResult } from "./search_data";

export async function fetchJourneyGraph(setJourneys: Dispatch<SetStateAction<JourneyStoreData | null>>) {
    setJourneys(null);
    try {
        const result = await getHomeResult();
        setJourneys({
            data: result.journeys,
            relationships: result.relationships
        });
    } catch (error) {
        console.error("error: ", error); // TODO: Handle as Toast
    }
}

export async function fetchJourneyNormal(setJourneysNormal: Dispatch<SetStateAction<JourneyData[] | null>>) {
    setJourneysNormal(null);
    try {
        const result = await getHomeResult();
        setJourneysNormal(result.journeys);
    } catch (error) {
        console.error("error: ", error); // TODO: Handle as Toast
    }
}

export async function fetchRecentlyGraph(setRecently: Dispatch<SetStateAction<JourneyStoreData | null>>) {
    setRecently(null);
    try {
        const result = await getRecentlyResult();
        const journey = convertRecentlyToJourney(result);
        setRecently(journey);
    } catch (error) {
        console.error("error: ", error); // TODO: Handle as Toast
    }
}

export async function fetchRecentlyNormal(setRecently: Dispatch<SetStateAction<JourneyData[] | null>>) {
    setRecently(null);
    try {
        const result = await getRecentlyResult();
        const journey = convertRecentlyToJourney(result);
        setRecently(journey.data);
    } catch (error) {
        console.error("error: ", error); // TODO: Handle as Toast
    }
}


export async function fetchSearchGraph(setSearch: Dispatch<SetStateAction<JourneyStoreData | null>>, serachText: string) {
    setSearch(null);
    try {
        const result = await getSearchResult(serachText);
        const journey = convertSearchToJourney(result);
        setSearch(journey);
    } catch (error) {
        console.error("error: ", error); // TODO: Handle as Toast
    }
}

export async function fetchSearchNormal(setSearch: Dispatch<SetStateAction<JourneyData[] | null>>, serachText: string) {
    setSearch(null);
    try {
        const result = await getSearchResult(serachText);
        const journey = convertSearchToJourney(result);
        setSearch(journey.data);
    } catch (error) {
        console.error("error: ", error); // TODO: Handle as Toast
    }
}