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
    {
        id: "j3",
        name: "Junior Mathematician",
        progress: 10,
        paths: [
            {
                id: "3-p1",
                title: "Matrix",
                description:
                    "In mathematics, a matrix (plural matrices) is a rectangular array or table of numbers, symbols, or expressions, arranged in rows and columns. For example, the dimension of the matrix below is 2 × 3 (read 'two by three'), because there are two rows and three columns.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Math",
                    },
                ],
                status: PathStatus.NOT_VISITED
            },
            {
                id: "3-p2",
                title: "Linear Algebra",
                description:
                    "Linear algebra is the branch of mathematics concerning linear equations such as linear functions such as and their representations through matrices and vector spaces.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Math",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Data Science",
                    },
                ],
                status: PathStatus.PASSED_TEST
            },
            {
                id: "3-p3",
                title: "Graph Theory",
                description:
                    "In mathematics, graph theory is the study of graphs, which are mathematical structures used to model pairwise relations between objects. A graph in this context is made up of vertices (also called nodes or points) which are connected by edges (also called links or lines).",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Math",
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
        id: "j4",
        name: "Data Scientist",
        progress: 80,
        paths: [
            {
                id: "4-p1",
                title: "Image Processing",
                description:
                    "Image processing is a method to perform some operations on an image, in order to get an enhanced image or to extract some useful information from it. It is a type of signal processing in which input is an image and output may be image or characteristics/features associated with that image. Nowadays, image processing is among rapidly growing technologies. It forms core research area within engineering and computer science disciplines too. Image processing basically includes the following three steps.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Software",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Math",
                    },
                ],
                status: PathStatus.NOT_VISITED
            },
            {
                id: "4-p2",
                title: "Power BI",
                description:
                    "Power BI is a business analytics service by Microsoft. It aims to provide interactive visualizations and business intelligence capabilities with an interface simple enough for end users to create their own reports and dashboards.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Tools",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Math",
                    },
                ],
                status: PathStatus.STILL_LEARNING
            },
            {
                id: "4-p3",
                title: "Probability",
                description:
                    "Probability is the branch of mathematics concerning numerical descriptions of how likely an event is to occur, or how likely it is that a proposition is true. The probability of an event is a number between 0 and 1, where, roughly speaking, 0 indicates impossibility of the event and 1 indicates certainty.",
                tags: [
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Math",
                    },
                    {
                        imageURL:
                            "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                        title: "Basic",
                    },
                ],
                status: PathStatus.PASSED_TEST
            },
        ],
    },
]

export function getPathDetailFromId(pathId: string) {
    let result = null;
    MockHomeData.forEach((journey) => {
        journey.paths.forEach((path) => {
            if (path.id === pathId) {
                result = path;
            }
        });
    });

    return result;
}

export function isPathInJourney(pathId: string | undefined, journeyId: string) {
    if (!pathId) {
        return false;
    }
    let pathFound = false;
    MockHomeData.forEach((journey) => {
        if (journey.id === journeyId) {
            journey.paths.forEach((path) => {
                if (path.id === pathId) {
                    pathFound = true;
                }
            });
        }
    });
    return pathFound;
}