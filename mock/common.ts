import { MenuTab } from "@/types/enum";
import { MockHomeData } from "./journey_data";
import { mockDBForSearch } from "./search_data";
import { mockDBForRecently } from "./recently_data";

export function getPathDetailFromId(pathId: string, type: MenuTab) {
    let result = null;
    if (type === MenuTab.journey) {
        MockHomeData.journeys.forEach((journey) => {
            journey.paths.data.forEach((path) => {
                if (path.id === pathId) {
                    result = path;
                }
            });
        });
    } else if (type === MenuTab.search) {
        mockDBForSearch.forEach((path) => {
            if (path.id === pathId) {
                result = path;
            }
        });
    } else if (type === MenuTab.recently) {
        mockDBForRecently.forEach((path) => {
            if (path.id === pathId) {
                result = path;
            }
        });
    }

    return result;
}

export function isPathInJourney(pathId: string | undefined, journeyId: string) {  // Only use for journey tabs
    if (!pathId) {
        return false;
    }
    let pathFound = false;
    MockHomeData.journeys.forEach((journey) => {
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