import { PathStatus } from "@/types/enum";
import { JourneyData } from "@/types/type";

export const MockHomeData: JourneyData[] = [
    {
        id: "j1",
        name: "Junior Programmer",
        progress: 60,
        paths: [
            {
                id: "1-p1",
                title: "Python",
                description:
                    "Python is an easy to learn, powerful programming language. It has efficient high-level data structures.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Coding",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Programming Language",
                    },
                ],
                status: PathStatus.NOT_VISITED
            },
            {
                id: "1-p2",
                title: "Data Stucture",
                description:
                    "A data structure is a way of organizing, storing, and managing data to perform operations efficiently. It defines the relationship between the data and the operations that can be performed on that data. The choice of a data structure depends on the nature of the data and the operations that need to be executed.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Programming",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Basic",
                    },
                ],
                status: PathStatus.PASSED_TEST
            },
            {
                id: "1-p3",
                title: "Algorithm",
                description:
                    "An algorithm is a step-by-step procedure or a set of well-defined instructions for solving a specific problem or accomplishing a particular task. In computer science, algorithms are fundamental to the field of software development and are used to design efficient and effective solutions to various computational problems.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Programming",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Advanced",
                    },
                ],
                status: PathStatus.STILL_LEARNING
            },
        ],
    },
    {
        id: "j2",
        name: "Software Engineer",
        progress: 40,
        paths: [
            {
                id: "2-p1",
                title: "Microservice",
                description:
                    "Microservices are a software development technique—a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services. In a microservices architecture, services are fine-grained and the protocols are lightweight.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Software",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Architecture",
                    },
                ],
                status: PathStatus.NOT_VISITED
            },
            {
                id: "2-p2",
                title: "Database",
                description:
                    "A database is a structured collection of data that is organized and stored in a way that allows efficient retrieval, updating, and management of that data. Databases are essential components of modern computing systems and are used to store, organize, and retrieve vast amounts of information.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Programming",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Advanced",
                    },
                ],
                status: PathStatus.STILL_LEARNING
            },
            {
                id: "2-p3",
                title: "Message Queue",
                description:
                    "A message queue is a form of asynchronous service-to-service communication used in serverless and microservices architectures. Messages are stored on the queue until they are processed and deleted. Each message is processed only once, by a single consumer.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Asynchronous",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Advanced",
                    },
                ],
                status: PathStatus.PASSED_TEST
            },
        ],
    },
]

export function getPathDetailFromId(pathId: string) {
    for (let i = 0; i < MockHomeData.length; i++) {
        const journey = MockHomeData[i];
        for (let j = 0; j < journey.paths.length; j++) {
            const path = journey.paths[j];
            if (path.id === pathId) {
                return path;
            }
        }
    }
    return null;
}

export function isPathInJourney(pathId: string | undefined, journeyId: string) {
    if (!pathId) {
        return false;
    }
    for (let i = 0; i < MockHomeData.length; i++) {
        const journey = MockHomeData[i];
        if (journey.id === journeyId) {
            for (let j = 0; j < journey.paths.length; j++) {
                const path = journey.paths[j];
                if (path.id === pathId) {
                    return true;
                }
            }
        }
    }
    return false;
}