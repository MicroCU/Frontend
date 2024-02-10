import { JourneyStoreData } from "@/types/type";

export function getPathDetailFromId(pathId: string, journeys: JourneyStoreData | null) {
    if (journeys) {
        const foundPath = journeys.data
            .flatMap((journey) => journey.paths.data)
            .find((path) => path.id === pathId);

        if (foundPath) {
            return foundPath;
        }
    }
    return null;
}

export function isPathInJourney(pathId: string | undefined, journeyId: string, journeys: JourneyStoreData | null) {  // Only use for journey tabs
    if (!pathId || !journeys) {
        return false;
    }

    const isPathFound = journeys.data.some((journey) => {
        if (journey.id === journeyId) {
            return journey.paths.data.some((path) => path.id === pathId);
        }
        return false;
    });

    return isPathFound;
}