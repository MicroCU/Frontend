import { PathStatus } from "@/types/enum";
import { BriefPathInfo, JourneyData, RecentlyPageData } from "@/types/type";

export const mockDBForRecently: BriefPathInfo[] = [
    {
        id: "recently-1",
        name: "Basic Grammar",
        description: "Grammar is the system of a language. People sometimes describe grammar as the 'rules' of a language; but in fact no language has rules*.",
        tags: [
            {
                id: "recently-1-t1",
                icon:
                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Language",
            },
        ],
        status: PathStatus.STILL_LEARNING
    },
    {
        id: "recently-2",
        name: "Professional Speaking",
        description: "Speaking is the delivery of language through the mouth. To speak, we create sounds using many parts of our body, including the lungs, vocal tract, vocal cords, tongue, teeth and lips.",
        tags: [
            {
                id: "recently-2-t1",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Language",
            },
            {
                id: "recently-2-t2",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Business",
            },
        ],
        status: PathStatus.PASSED_TEST,
    },
    {
        id: "recently-3",
        name: "1000 Vacabularies",
        description: "A vocabulary, also known as a wordstock or word-stock, is a set of familiar words within a person's language. A vocabulary, usually developed with age, serves as a useful and fundamental tool for communication and acquiring knowledge.",
        tags: [
            {
                id: "recently-3-t1",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Language",
            },
            {
                id: "recently-3-t2",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Daily Life",
            },
        ],
        status: PathStatus.NOT_VISITED,
    },
    {
        id: "recently-4",
        name: "Advance Wrtting",
        description: "Writing is a medium of human communication that involves the representation of a language with symbols. Writing systems are not themselves human languages (with the debatable exception of computer languages); they are means of rendering a language into a form that can be reconstructed by other humans separated by time and/or space.",
        tags: [
            {
                id: "recently-4-t1",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Language",
            },
            {
                id: "recently-4-t2",
                icon: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg",
                name: "Advance",
            },
        ],
        status: PathStatus.NOT_VISITED,
    },
]

export function getRecentlyResult(): RecentlyPageData {  // Mock API Response
    let response: RecentlyPageData = {
        total: 4,
        paths: mockDBForRecently,
        relationships: [
            {
                id: "recently-1",
                neighbor: ["recently-2", "recently-3"]
            },
            {
                id: "recently-2",
                neighbor: ["recently-1", "recently-4"]
            },
            {
                id: "recently-3",
                neighbor: ["recently-1", "recently-4"]
            },
            {
                id: "recently-4",
                neighbor: ["recently-2", "recently-3"]
            },
        ]
    }
    return response
}

export function getMockRecentlyPosition(pathId: string) {
    const positionMap = new Map<string, { x: number, y: number }>();
    positionMap.set("recently-1", { x: 250, y: 0 });
    positionMap.set("recently-2", { x: 100, y: 100 });
    positionMap.set("recently-3", { x: 400, y: 100 });
    positionMap.set("recently-4", { x: 250, y: 200 });
    return positionMap.get(pathId)!;
}

export function convertRecentlyToJourney() {
    let resp = getRecentlyResult()
    let journeys: JourneyData
    journeys = {
        id: "recently",
        name: "Recently",
        progress: 0,
        paths: {
            total: resp.total,
            data: resp.paths
        }
    }
    return [journeys]
}