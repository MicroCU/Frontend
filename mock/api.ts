import { JourneyData, JourneyStoreData } from "@/types/type";
import { Dispatch, SetStateAction } from "react";
import { getHomeResult } from "./journey_data";

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