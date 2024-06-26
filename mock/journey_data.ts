import { PathStatus } from "@/types/enum";
import { APIResponse, HomePageData } from "@/types/type";

const MockHomeData: HomePageData = {
    total: 4,
    journeys: [
        {
            id: "j1",
            name: "Junior Programmer",
            progress: 60,
            paths: {
                total: 3,
                data: [
                    {
                        id: "1-p1",
                        name: "Python",
                        description:
                            "Python is an easy to learn, powerful programming language. It has efficient high-level data structures.",
                        tags: [
                            {
                                id: "1-t1",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Coding",
                            },
                            {
                                id: "1-t2",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Programming Language",
                            },
                        ],
                        progress: 0,
                        picture: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2100301.png",
                    },
                    {
                        id: "1-p2",
                        name: "Data Stucture",
                        description:
                            "A data structure is a way of organizing, storing, and managing data to perform operations efficiently. It defines the relationship between the data and the operations that can be performed on that data. The choice of a data structure depends on the nature of the data and the operations that need to be executed.",
                        tags: [
                            {
                                id: "1-t3",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Programming",
                            },
                            {
                                id: "1-t4",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Basic",
                            },
                        ],
                        progress: 100,
                        picture: "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110352.png"
                    },
                    {
                        id: "1-p3",
                        name: "Algorithm",
                        description:
                            "An algorithm is a step-by-step procedure or a set of well-defined instructions for solving a specific problem or accomplishing a particular task. In computer science, algorithms are fundamental to the field of software development and are used to design efficient and effective solutions to various computational problems.",
                        tags: [
                            {
                                id: "1-t5",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Programming",
                            },
                            {
                                id: "1-t6",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Advanced",
                            },
                        ],
                        progress: 30,
                    },
                ],
            },
        },
        {
            id: "j2",
            name: "Software Engineer",
            progress: 40,
            paths: {
                total: 3,
                data: [
                    {
                        id: "2-p1",
                        name: "Microservice",
                        description:
                            "Microservices are a software development technique—a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services. In a microservices architecture, services are fine-grained and the protocols are lightweight.",
                        tags: [
                            {
                                id: "2-t1",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Software",
                            },
                            {
                                id: "2-t2",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Architecture",
                            },
                        ],
                        progress: 30,
                    },
                    {
                        id: "2-p2",
                        name: "Database",
                        description:
                            "A database is a structured collection of data that is organized and stored in a way that allows efficient retrieval, updating, and management of that data. Databases are essential components of modern computing systems and are used to store, organize, and retrieve vast amounts of information.",
                        tags: [
                            {
                                id: "2-t3",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Programming",
                            },
                            {
                                id: "2-t4",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Advanced",
                            },
                        ],
                        progress: 40,
                    },
                    {
                        id: "2-p3",
                        name: "Message Queue",
                        description:
                            "A message queue is a form of asynchronous service-to-service communication used in serverless and microservices architectures. Messages are stored on the queue until they are processed and deleted. Each message is processed only once, by a single consumer.",
                        tags: [
                            {
                                id: "2-t5",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Asynchronous",
                            },
                            {
                                id: "2-t6",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Advanced",
                            },
                        ],
                        progress: 50,
                    },
                ]
            },
        },
        {
            id: "j3",
            name: "Junior Mathematician 1010101010101010101010 long long long",
            progress: 10,
            paths: {
                total: 3,
                data: [
                    {
                        id: "3-p1",
                        name: "Matrix very very important!!!!!!!!!!!!!!",
                        description:
                            "In mathematics, a matrix (plural matrices) is a rectangular array or table of numbers, symbols, or expressions, arranged in rows and columns. For example, the dimension of the matrix below is 2 × 3 (read 'two by three'), because there are two rows and three columns.",
                        tags: [
                            {
                                id: "3-t1",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Math",
                            },
                        ],
                        progress: 0,
                    },
                    {
                        id: "3-p2",
                        name: "Linear Algebra",
                        description:
                            "Linear algebra is the branch of mathematics concerning linear equations such as linear functions such as and their representations through matrices and vector spaces.",
                        tags: [
                            {
                                id: "3-t2",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Math",
                            },
                            {
                                id: "3-t3",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Data Science",
                            },
                        ],
                        progress: 60,
                    },
                    {
                        id: "3-p3",
                        name: "Graph Theory",
                        description:
                            "In mathematics, graph theory is the study of graphs, which are mathematical structures used to model pairwise relations between objects. A graph in this context is made up of vertices (also called nodes or points) which are connected by edges (also called links or lines).",
                        tags: [
                            {
                                id: "3-t4",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Math",
                            },
                            {
                                id: "3-t5",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Advanced",
                            },
                        ],
                        progress: 40,
                    },
                ],
            }
        },
        {
            id: "j4",
            name: "Data Scientist",
            progress: 80,
            paths: {
                total: 3,
                data: [
                    {
                        id: "4-p1",
                        name: "Image Processing",
                        description:
                            "Image processing is a method to perform some operations on an image, in order to get an enhanced image or to extract some useful information from it. It is a type of signal processing in which input is an image and output may be image or characteristics/features associated with that image. Nowadays, image processing is among rapidly growing technologies. It forms core research area within engineering and computer science disciplines too. Image processing basically includes the following three steps.",
                        tags: [
                            {
                                id: "4-t1",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Software",
                            },
                            {
                                id: "4-t2",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Math",
                            },
                        ],
                        progress: 0,
                    },
                    {
                        id: "4-p2",
                        name: "Power BI",
                        description:
                            "Power BI is a business analytics service by Microsoft. It aims to provide interactive visualizations and business intelligence capabilities with an interface simple enough for end users to create their own reports and dashboards.",
                        tags: [
                            {
                                id: "4-t3",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Tools",
                            },
                            {
                                id: "4-t4",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Math",
                            },
                        ],
                        progress: 8,
                    },
                    {
                        id: "4-p3",
                        name: "Probability",
                        description:
                            "Probability is the branch of mathematics concerning numerical descriptions of how likely an event is to occur, or how likely it is that a proposition is true. The probability of an event is a number between 0 and 1, where, roughly speaking, 0 indicates impossibility of the event and 1 indicates certainty.",
                        tags: [
                            {
                                id: "4-t5",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Math",
                            },
                            {
                                id: "4-t6",
                                icon:
                                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                                name: "Basic",
                            },
                        ],
                        progress: 0,
                    },
                ],
            }
        }
    ],
    relationships: [
        {
            id: "1-p1",
            neighbors: ["1-p2", "1-p3"]
        },
        {
            id: "1-p2",
            neighbors: ["1-p1"]
        },
        {
            id: "1-p3",
            neighbors: ["1-p1", "2-p1", "2-p2", "3-p1"]
        },
        {
            id: "2-p1",
            neighbors: ["1-p3", "2-p3"]
        },
        {
            id: "2-p2",
            neighbors: ["1-p3", "2-p3"]
        },
        {
            id: "2-p3",
            neighbors: ["2-p1", "2-p2"]
        },
        {
            id: "3-p1",
            neighbors: ["1-p3", "3-p2", "3-p3"]
        },
        {
            id: "3-p2",
            neighbors: ["3-p1", "4-p1", "4-p2", "4-p3"]
        },
        {
            id: "3-p3",
            neighbors: ["3-p1"]
        },
        {
            id: "4-p1",
            neighbors: ["3-p2"]
        },
        {
            id: "4-p2",
            neighbors: ["3-p2"]
        },
        {
            id: "4-p3",
            neighbors: ["3-p2"]
        },
    ]
}

export function getHomeResult(): Promise<APIResponse> { // Mock API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: MockHomeData,
            });
        }, 0);
    });
}

export function getMockJourneyPosition(pathId: string) {  // Mock Tendon's Algorithm
    const positionMap = new Map<string, { x: number, y: number }>();
    positionMap.set("1-p1", { x: 250, y: 0 });
    positionMap.set("1-p2", { x: 100, y: 100 });
    positionMap.set("1-p3", { x: 400, y: 100 });
    positionMap.set("2-p1", { x: 250, y: 200 });
    positionMap.set("2-p2", { x: 550, y: 200 });
    positionMap.set("2-p3", { x: 400, y: 300 });

    positionMap.set("3-p1", { x: 700, y: 100 });
    positionMap.set("3-p2", { x: 700, y: 200 });
    positionMap.set("3-p3", { x: 900, y: 200 });
    positionMap.set("4-p1", { x: 700, y: 300 });
    positionMap.set("4-p2", { x: 900, y: 300 });
    positionMap.set("4-p3", { x: 1100, y: 300 });

    return positionMap.get(pathId) || null;
}