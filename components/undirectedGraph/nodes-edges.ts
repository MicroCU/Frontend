import { NodeStatusEnum } from '@/types/enum';
import { NodeData } from '@/types/type';
import { Node } from 'reactflow';

export const nodes: Node<NodeData>[] = [
    {
        id: '1',
        type: "circleNode",
        data: {
            status: NodeStatusEnum.STILL_LEARNING,
            pathInfo: {
                title: "Python",
                description: "Python is an easy to learn, powerful programming language. It has efficient high-level data structures ....",
                tags: [{
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Programming"
                },
                {
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Python"
                }],
            }
        },
        position: { x: 250, y: 0 },
    },
    {
        id: '2',
        type: "circleNode",
        data: {
            status: NodeStatusEnum.PASSED_TEST,
            pathInfo: {
                title: "Data Stucture",
                description: "A data structure is a way of organizing, storing, and managing data to perform operations efficiently. It defines the relationship between the data and the operations that can be performed on that data. The choice of a data structure depends on the nature of the data and the operations that need to be executed.",
                tags: [{
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Programming"
                },
                {
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Basic"
                }],
            }
        },
        position: { x: 100, y: 100 },
    },
    {
        id: '3',
        type: "circleNode",
        data: {
            status: NodeStatusEnum.NOT_VISITED,
            pathInfo: {
                title: "Algorithm",
                description: "An algorithm is a step-by-step procedure or a set of well-defined instructions for solving a specific problem or accomplishing a particular task. In computer science, algorithms are fundamental to the field of software development and are used to design efficient and effective solutions to various computational problems.",
                tags: [{
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Programming"
                },
                {
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Advanced"
                }],
            }
        },
        position: { x: 400, y: 100 },
    },
    {
        id: '4',
        type: "circleNode",
        data: {
            status: NodeStatusEnum.STILL_LEARNING,
            pathInfo: {
                title: "Database",
                description: "A database is a structured collection of data that is organized and stored in a way that allows efficient retrieval, updating, and management of that data. Databases are essential components of modern computing systems and are used to store, organize, and retrieve vast amounts of information.",
                tags: [{
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Advanced"
                },
                {
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Software"
                }],
            }
        },
        position: { x: 0, y: 200 },
    },
    {
        id: '5',
        type: "circleNode",
        data: {
            status: NodeStatusEnum.NOT_VISITED,
            pathInfo: {
                title: "Microservice",
                description: "Microservices is an architectural style for developing and organizing software applications as a collection of small, independent services that communicate with each other over a network. Each microservice is a self-contained unit that represents a specific business capability and can be developed, deployed, and scaled independently of other services in the system.",
                tags: [{
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Advanced"
                },
                {
                    imageURL:
                        "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
                    title: "Architecture"
                }],
            }
        },
        position: { x: 400, y: 200 },
    },
];

export const edges = [
    { id: 'e1-2', source: '1', target: '2', type: 'straight' },
    { id: 'e1-3', source: '1', target: '3', type: 'straight' },
    { id: 'e2-4', source: '2', target: '4', type: 'straight' },
    { id: 'e3-5', source: '3', target: '5', type: 'straight' },
];