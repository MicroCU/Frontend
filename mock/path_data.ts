import { GroupType, MicroType } from "@/types/enum";
import { PathAPIResponse, PathData } from "@/types/type";

const mockGroupDB: PathData = {
    id: "path-1",
    name: "Introduction Python 101",
    description: `Python is an easy to learn, powerful programming language. It has
    efficient high-level data structures and a simple but effective
    approach to object-oriented programming. Python’s elegant syntax and
    dynamic typing, together with its interpreted nature, make it an ideal
    language for scripting and rapid application development in many areas
    on most platforms.`,
    tags: [
        {
            id: "tag-1",
            name: "Programming",
            icon:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
        },
        {
            id: "tag-2",
            name: "Software Architecture",
            icon:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg"
        }
    ],
    groups: [
        {
            id: '1', name: 'Overview of the python to student who dont use it before', nexts: ['2', '3'], type: GroupType.Unordered,
            micros: [
                { id: '1', name: 'Overview of the python to student who dont use it before', progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '2', name: 'Comment', nexts: ['8'], type: GroupType.Unordered,
            micros: [
                { id: '21', name: 'Comment 1', progress: 0, type: MicroType.Practice },
                { id: '22', name: 'Comment 2', progress: 0, type: MicroType.Practice },
                { id: '23', name: 'Comment 3', progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '3', name: 'Syntax - 2', nexts: ['30'], type: GroupType.Unordered,
            micros: [
                { id: '3', name: 'Syntax - 2', progress: 40, type: MicroType.Video }
            ]
        },
        {
            id: '30', name: 'Syntax - 3', nexts: ['4', '9'], type: GroupType.Unordered,
            micros: [
                { id: '30', name: 'Syntax - 3', progress: 80, type: MicroType.Video }
            ]
        },
        {
            id: '4', name: 'Operator', nexts: ['5', '6'], type: GroupType.Unordered,
            micros: [
                { id: '41', name: 'Bitwise', progress: 90, type: MicroType.Video },
                { id: '42', name: 'Arithmatic', progress: 0, type: MicroType.Video },
                { id: '43', name: 'Bitwise - 1', progress: 90, type: MicroType.Video },
            ]
        },
        {
            id: '5', name: 'Control Flow', nexts: ['7'], type: GroupType.Ordered,
            micros: [
                { id: '51', name: 'Conditional', progress: 50, type: MicroType.Video },
                { id: '52', name: 'Loop', progress: 0, type: MicroType.Video },
                { id: '53', name: 'Function', progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '6', name: 'Useful Library', nexts: ['7', '70'], type: GroupType.Unordered,
            micros: [
                { id: '61', name: 'Built-in function 123456', progress: 0, type: MicroType.Video },
                { id: '62', name: 'Standard library** 123456', progress: 0, type: MicroType.Video },
                { id: '63', name: 'Standard library1 123456', progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '7', name: 'Python Final Test', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '71', name: 'Python Final Test 1', progress: 10, type: MicroType.Video },
                { id: '72', name: 'Python Final Test 2', progress: 40, type: MicroType.Video },
                { id: '73', name: 'Python Final Test 3', progress: 0, type: MicroType.Test },
            ]
        },
        {
            id: '70', name: 'MID', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '701', name: 'Python Midterm Test 1', progress: 20, type: MicroType.Video },
                { id: '702', name: 'Python Final Test 2', progress: 60, type: MicroType.Video },
                { id: '703', name: 'Python Final Test 3', progress: 0, type: MicroType.Test },
            ]
        },
        {
            id: '8', name: 'Comment 2 Long Long Long Long Long Long Long Long Long', nexts: ['10', '11'], type: GroupType.Ordered,
            micros: [
                { id: '81', name: 'Comment 2 Long Long Long Long Long Long Long Long', progress: 20, type: MicroType.Video },
                { id: '82', name: 'Comment 3', progress: 40, type: MicroType.Video },
                { id: '83', name: 'Comment 4', progress: 60, type: MicroType.Video },
                { id: '84', name: 'Comment 5', progress: 100, type: MicroType.Video },
                { id: '85', name: 'Comment 6', progress: 35, type: MicroType.Video },
            ]
        },
        {
            id: '9', name: 'Operator2', nexts: ['90'], type: GroupType.Ordered,
            micros: [
                { id: '91', name: 'Bitwise', progress: 70, type: MicroType.Video },
                { id: '92', name: 'Arithmatic', progress: 50, type: MicroType.Video },
                { id: '93', name: 'Arithmatic 2', progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '90', name: 'Operator Funny JingJing', nexts: ['70'], type: GroupType.Unordered,
            micros: [
                { id: '90', name: 'Operator Funny JingJing', progress: 90, type: MicroType.Practice },
            ]
        },
        {
            id: '10', name: 'Lesson', nexts: [], type: GroupType.Ordered,
            micros: [
                { id: '101', name: 'Lesson 1', progress: 0, type: MicroType.Video },
                { id: '102', name: 'Lesson 2', progress: 0, type: MicroType.Video },
                { id: '103', name: 'Lesson 3', progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '11', name: 'Lesson * (Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)', nexts: ['12', '13'], type: GroupType.Unordered,
            micros: [
                { id: '111', name: 'Lesson 1* longlong longlong longlong', progress: 0, type: MicroType.Video },
                { id: '112', name: 'Lesson 2* longlong longlong longlong', progress: 0, type: MicroType.Video },
                { id: '113', name: 'Lesson 3* longlong longlong longlong', progress: 0, type: MicroType.Video },
                { id: '114', name: 'Lesson 4', progress: 50, type: MicroType.Video },
                { id: '115', name: 'Lesson 5', progress: 70, type: MicroType.Video },
            ]
        },
        {
            id: '12', name: 'Lesson I very very long very very longvery very longvery very long', nexts: ['14', '15'], type: GroupType.Unordered,
            micros: [
                { id: '121', name: 'Lesson 1 I', progress: 0, type: MicroType.Video },
                { id: '122', name: 'Lesson 2 I', progress: 0, type: MicroType.Video },
                { id: '123', name: 'Lesson 3 I', progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '13', name: 'Lesson II abbcvgdvcgsgvcdhsdcghvcfhvhgcvgvfhcvvdhcvdvh', nexts: ['15'], type: GroupType.Unordered,
            micros: [
                { id: '131', name: 'Lesson 1*II', progress: 0, type: MicroType.Video },
                { id: '132', name: 'Lesson 2*II', progress: 0, type: MicroType.Video },
                { id: '133', name: 'Lesson 3*II', progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '14', name: 'Lesson very very basic for you only', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '14', name: 'Lesson very very basic for you only', progress: 0, type: MicroType.Test },
            ]
        },
        {
            id: '15', name: 'Lesson IV', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '131', name: 'Lesson 1*IV', progress: 0, type: MicroType.Video },
                { id: '132', name: 'Lesson 2*IV', progress: 0, type: MicroType.Video },
                { id: '133', name: 'Lesson 3*IV', progress: 0, type: MicroType.Video },
            ]
        },
    ]
}

function mockPathAPI(id: string): Promise<PathAPIResponse> {
    if (id == "error") {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 500,
                    data: {
                        path: {} as PathData
                    },
                    message: "Mock Data jaaaaa"
                });
            }, 2000);
        });
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    path: mockGroupDB
                }
            });
        }, 0);
    });
}

export async function getMockData(id: string) {
    let resp = await mockPathAPI(id);
    return resp;
}