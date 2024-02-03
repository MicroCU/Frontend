import { BriefPathInfo, JourneyStoreData } from "@/types/type";

export function getPathDetailFromId(pathId: string, journeys: JourneyStoreData | null) {
    let result: BriefPathInfo | null = null;
    if (journeys) {
        journeys.data.forEach((journey) => {
            journey.paths.data.forEach((path) => {
                if (path.id === pathId) {
                    result = path;
                }
            });
        });
    }
    return result;
}

export function isPathInJourney(pathId: string | undefined, journeyId: string, journeys: JourneyStoreData | null) {  // Only use for journey tabs
    if (!pathId || !journeys) {
        return false;
    }
    let pathFound = false;
    journeys.data.forEach((journey) => {
        if (journey.id === journeyId) {
            journey.paths.data.forEach((path) => {
                if (path.id === pathId) {
                    pathFound = true;
                }
            });
        }
    });
    return pathFound;
}