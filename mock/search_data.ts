import { PathStatus } from "@/types/enum";
import { BriefPathInfo, JourneyData, SearchPageData } from "@/types/type";

export const mockDBForSearch: BriefPathInfo[] = [
    {
        id: "search-1",
        name: "Basic Biology",
        description: "Biological science is the study of life and living organisms, their life cycles, adaptations and environment.",
        tags: [
            {
                id: "search-1-t1",
                icon:
                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Biology",
            },
            {
                id: "search-1-t2",
                icon:
                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Health",
            },
        ],
        status: PathStatus.STILL_LEARNING
    },
    {
        id: "search-2",
        name: "Basic Bio Chemistry",
        description: "An overview of the basic concepts and principles of chemistry.",
        tags: [
            {
                id: "search-2-t1",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Chemistry",
            },
            {
                id: "search-2-t2",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Laboratory",
            },
        ],
        status: PathStatus.PASSED_TEST,
    },
    {
        id: "search-3",
        name: "Basic Physics",
        description: "An overview of the basic concepts and principles of physics.",
        tags: [
            {
                id: "search-3-t1",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Physics",
            },
            {
                id: "search-3-t2",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Laboratory",
            },
        ],
        status: PathStatus.NOT_VISITED,
    },
    {
        id: "search-4",
        name: "Basic Mathematics",
        description: "An overview of the basic concepts and principles of mathematics.",
        tags: [
            {
                id: "search-4-t1",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Mathematics",
            },
            {
                id: "search-4-t2",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Laboratory",
            },
        ],
        status: PathStatus.NOT_VISITED,
    },
    {
        id: "search-5",
        name: "Basic English",
        description: "An overview of the basic concepts and principles of English.",
        tags: [
            {
                id: "search-5-t1",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "English",
            },
            {
                id: "search-5-t2",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Laboratory",
            },
        ],
        status: PathStatus.NOT_VISITED,
    },
]

// WORD FOR SEARCH is "Basic", "Bio" (Other words will return empty array)
export function getSearchResult(searchText: string): SearchPageData {  // Mock API Response
    let response: SearchPageData = {
        total: 0,
        data: [],
        relationships: []
    }
    if (searchText == "Basic" || searchText == "basic") {
        let result: BriefPathInfo[] = [
            ...mockDBForSearch
        ]
        response = {
            total: result.length,
            data: result,
            relationships: [
                {
                    id: "search-1",
                    neighbor: ["search-2"]
                },
                {
                    id: "search-2",
                    neighbor: ["search-1", "search-3", "search-4", "search-5"]
                },
                {
                    id: "search-3",
                    neighbor: ["search-2"]
                },
                {
                    id: "search-4",
                    neighbor: ["search-2"]
                },
                {
                    id: "search-5",
                    neighbor: ["search-2"]
                }
            ]
        }
    } else if (searchText == "Bio") {
        let result: BriefPathInfo[] = [
            mockDBForSearch[0],
            mockDBForSearch[1]
        ]
        response = {
            total: result.length,
            data: result,
            relationships: [
                {
                    id: "search-1",
                    neighbor: ["search-2"]
                },
                {
                    id: "search-2",
                    neighbor: ["search-1"]
                },
            ]
        }
    }
    return response
}

export function getMockSearchPosition(pathId: string) {
    const positionMap = new Map<string, { x: number, y: number }>();
    positionMap.set("search-1", { x: 250, y: 0 });
    positionMap.set("search-2", { x: 250, y: 100 });
    positionMap.set("search-3", { x: 100, y: 200 });
    positionMap.set("search-4", { x: 250, y: 200 });
    positionMap.set("search-5", { x: 400, y: 200 });
    return positionMap.get(pathId)!;
}

export function convertSearchToJourney(searchText: string) {
    let resp = getSearchResult(searchText)
    let journeys: JourneyData
    journeys = {
        id: "search",
        name: "Search",
        progress: 0,
        paths: resp,
    }
    return [journeys]
}