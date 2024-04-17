import { GroupType, MicroType } from "@/types/enum";
import { PathAPIResponse, PathData } from "@/types/type";

const directedGraphCase = [
    [
        {
            id: '1', name: 'Overview of the python to student who dont use it before', nexts: ['2', '3'], type: GroupType.Unordered,
            micros: [
                { id: '1', name: 'Overview of the python to student who dont use it before', total_progress: 0, type: MicroType.Video,
                    video: {
                        id: '1',
                        title: 'Overview of the python to student who dont use it before',
                        link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                        decisionTitle: 'Python 101',
                        progress: 20
                    },
                    documents: [
                        {
                          id: '100',
                          name: "HTML Doc 1",
                          link: "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2023_2/46128/materials/Final_Report_Example-738515-17047265726194.pdf"
                        },
                        {
                          id: '101',
                          name: "HTML Doc 2",
                          link: "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2023_2/46128/materials/2023_2110489_syllabus-738515-17047223002075.pdf"
                        }
                    ],
                 },
            ]
        },
        {
            id: '2', name: 'Comment', nexts: ['4'], type: GroupType.Unordered,
            micros: [
                { id: '21', name: 'Comment 1 Test', total_progress: 0, type: MicroType.Test,
                    test:{
                        id: '21',
                        link: "https://www.mycourseville.com/?q=courseville/course/46128"
                    }
                 },
                { id: '22', name: 'Comment 2', total_progress: 0, type: MicroType.Practice },
                { id: '23', name: 'Comment 3', total_progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '3', name: 'Syntax - 2', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '3', name: 'Syntax - 2', total_progress: 40, type: MicroType.Video ,
                    video: {
                        id: '3',
                        title: 'Syntax - 2',
                        link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        decisionTitle: 'Python 101',
                        progress: 40
                    }
                }
            ]
        },
        {
            id: '4', name: 'Comment I', nexts: ['5'], type: GroupType.Ordered,
            micros: [
                { id: '41', name: 'Comment 1', total_progress: 0, type: MicroType.Video },
                { id: '42', name: 'Comment 2', total_progress: 20, type: MicroType.Video },
                { id: '43', name: 'Comment 3', total_progress: 40, type: MicroType.Video },
            ]
        },
        {
            id: '5', name: 'Comment II', nexts: [], type: GroupType.Ordered,
            micros: [
                { id: '51', name: 'Comment 1', total_progress: 0, type: MicroType.Practice },
                { id: '52', name: 'Comment 2', total_progress: 0, type: MicroType.Practice },
                { id: '53', name: 'Comment 3', total_progress: 0, type: MicroType.Practice },
            ]
        },
    ],
    [
        {
            id: '1', name: 'Overview of the python to student who dont use it before', nexts: ['2', '3'], type: GroupType.Unordered,
            micros: [
                { id: '1', name: 'Overview of the python to student who dont use it before', total_progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '2', name: 'Comment', nexts: ['4'], type: GroupType.Unordered,
            micros: [
                { id: '21', name: 'Comment 1', total_progress: 0, type: MicroType.Practice },
                { id: '22', name: 'Comment 2', total_progress: 0, type: MicroType.Practice },
                { id: '23', name: 'Comment 3', total_progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '3', name: 'Syntax - 2', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '3', name: 'Syntax - 2', total_progress: 40, type: MicroType.Video }
            ]
        },
        {
            id: '4', name: 'Comment', nexts: ['5'], type: GroupType.Ordered,
            micros: [
                { id: '41', name: 'Comment 1', total_progress: 0, type: MicroType.Practice },
                { id: '42', name: 'Comment 2', total_progress: 0, type: MicroType.Practice },
                { id: '43', name: 'Comment 3', total_progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '5', name: 'Comment', nexts: ['6', '7'], type: GroupType.Ordered,
            micros: [
                { id: '51', name: 'Comment 1', total_progress: 0, type: MicroType.Practice },
                { id: '52', name: 'Comment 2', total_progress: 0, type: MicroType.Practice },
                { id: '53', name: 'Comment 3', total_progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '6', name: 'Comment', nexts: [], type: GroupType.Ordered,
            micros: [
                { id: '61', name: 'Comment 1', total_progress: 0, type: MicroType.Practice },
                { id: '62', name: 'Comment 2', total_progress: 0, type: MicroType.Practice },
                { id: '63', name: 'Comment 3', total_progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '7', name: 'Comment', nexts: [], type: GroupType.Ordered,
            micros: [
                { id: '71', name: 'Comment 1', total_progress: 0, type: MicroType.Practice },
                { id: '72', name: 'Comment 2', total_progress: 0, type: MicroType.Practice },
                { id: '73', name: 'Comment 3', total_progress: 0, type: MicroType.Practice },
            ]
        },
    ],
    [
        {
            id: '1', name: 'Overview of the python to student who dont use it before', nexts: ['2', '3'], type: GroupType.Unordered,
            micros: [
                { id: '1', name: 'Overview of the python to student who dont use it before', total_progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '2', name: 'Comment', nexts: ['8'], type: GroupType.Unordered,
            micros: [
                { id: '21', name: 'Comment 1', total_progress: 0, type: MicroType.Practice },
                { id: '22', name: 'Comment 2', total_progress: 0, type: MicroType.Practice },
                { id: '23', name: 'Comment 3', total_progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '3', name: 'Syntax - 2', nexts: ['30'], type: GroupType.Unordered,
            micros: [
                { id: '3', name: 'Syntax - 2', total_progress: 40, type: MicroType.Video }
            ]
        },
        {
            id: '30', name: 'Syntax - 3', nexts: ['4', '9'], type: GroupType.Unordered,
            micros: [
                { id: '30', name: 'Syntax - 3', total_progress: 80, type: MicroType.Video }
            ]
        },
        {
            id: '4', name: 'Operator', nexts: ['5', '6'], type: GroupType.Unordered,
            micros: [
                { id: '41', name: 'Bitwise', total_progress: 90, type: MicroType.Video },
                { id: '42', name: 'Arithmatic', total_progress: 0, type: MicroType.Video },
                { id: '43', name: 'Bitwise - 1', total_progress: 90, type: MicroType.Video },
            ]
        },
        {
            id: '5', name: 'Control Flow', nexts: ['7'], type: GroupType.Ordered,
            micros: [
                { id: '51', name: 'Conditional', total_progress: 50, type: MicroType.Video },
                { id: '52', name: 'Loop', total_progress: 0, type: MicroType.Video },
                { id: '53', name: 'Function', total_progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '6', name: 'Useful Library', nexts: ['7', '70'], type: GroupType.Unordered,
            micros: [
                { id: '61', name: 'Built-in function 123456', total_progress: 0, type: MicroType.Video },
                { id: '62', name: 'Standard library** 123456', total_progress: 0, type: MicroType.Video },
                { id: '63', name: 'Standard library1 123456', total_progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '7', name: 'Python Final Test', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '71', name: 'Python Final Test 1', total_progress: 10, type: MicroType.Video },
                { id: '72', name: 'Python Final Test 2', total_progress: 40, type: MicroType.Video },
                { id: '73', name: 'Python Final Test 3', total_progress: 0, type: MicroType.Test },
            ]
        },
        {
            id: '70', name: 'MID', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '701', name: 'Python Midterm Test 1', total_progress: 20, type: MicroType.Video },
                { id: '702', name: 'Python Final Test 2', total_progress: 60, type: MicroType.Video },
                { id: '703', name: 'Python Final Test 3', total_progress: 0, type: MicroType.Test },
            ]
        },
        {
            id: '8', name: 'Comment 2 Long Long Long Long Long Long Long Long Long', nexts: ['10', '11'], type: GroupType.Ordered,
            micros: [
                { id: '81', name: 'Comment 2 Long Long Long Long Long Long Long Long', total_progress: 20, type: MicroType.Video },
                { id: '82', name: 'Comment 3', total_progress: 40, type: MicroType.Video },
                { id: '83', name: 'Comment 4', total_progress: 60, type: MicroType.Video },
                { id: '84', name: 'Comment 5', total_progress: 10, type: MicroType.Video },
                { id: '85', name: 'Comment 6', total_progress: 35, type: MicroType.Video },
            ]
        },
        {
            id: '9', name: 'Operator2', nexts: ['90'], type: GroupType.Ordered,
            micros: [
                { id: '91', name: 'Bitwise', total_progress: 70, type: MicroType.Video },
                { id: '92', name: 'Arithmatic', total_progress: 50, type: MicroType.Video },
                { id: '93', name: 'Arithmatic 2', total_progress: 0, type: MicroType.Practice },
            ]
        },
        {
            id: '90', name: 'Operator Funny JingJing', nexts: ['70'], type: GroupType.Unordered,
            micros: [
                { id: '90', name: 'Operator Funny JingJing', total_progress: 90, type: MicroType.Practice },
            ]
        },
        {
            id: '10', name: 'Lesson', nexts: [], type: GroupType.Ordered,
            micros: [
                { id: '101', name: 'Lesson 1', total_progress: 0, type: MicroType.Video },
                { id: '102', name: 'Lesson 2', total_progress: 0, type: MicroType.Video },
                { id: '103', name: 'Lesson 3', total_progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '11', name: 'Lesson * (Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)(Long)', nexts: ['12', '13'], type: GroupType.Unordered,
            micros: [
                { id: '111', name: 'Lesson 1* longlong longlong longlong', total_progress: 0, type: MicroType.Video },
                { id: '112', name: 'Lesson 2* longlong longlong longlong', total_progress: 0, type: MicroType.Video },
                { id: '113', name: 'Lesson 3* longlong longlong longlong', total_progress: 0, type: MicroType.Video },
                { id: '114', name: 'Lesson 4', total_progress: 50, type: MicroType.Video },
                { id: '115', name: 'Lesson 5', total_progress: 70, type: MicroType.Video },
            ]
        },
        {
            id: '12', name: 'Lesson I very very long very very longvery very longvery very long', nexts: ['14', '15'], type: GroupType.Unordered,
            micros: [
                { id: '121', name: 'Lesson 1 I', total_progress: 0, type: MicroType.Video },
                { id: '122', name: 'Lesson 2 I', total_progress: 0, type: MicroType.Video },
                { id: '123', name: 'Lesson 3 I', total_progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '13', name: 'Lesson II abbcvgdvcgsgvcdhsdcghvcfhvhgcvgvfhcvvdhcvdvh', nexts: ['15'], type: GroupType.Unordered,
            micros: [
                { id: '131', name: 'Lesson 1*II', total_progress: 0, type: MicroType.Video },
                { id: '132', name: 'Lesson 2*II', total_progress: 0, type: MicroType.Video },
                { id: '133', name: 'Lesson 3*II', total_progress: 0, type: MicroType.Video },
            ]
        },
        {
            id: '14', name: 'Lesson very very basic for you only', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '14', name: 'Lesson very very basic for you only', total_progress: 0, type: MicroType.Test },
            ]
        },
        {
            id: '15', name: 'Lesson IV', nexts: [], type: GroupType.Unordered,
            micros: [
                { id: '131', name: 'Lesson 1*IV', total_progress: 0, type: MicroType.Video },
                { id: '132', name: 'Lesson 2*IV', total_progress: 0, type: MicroType.Video },
                { id: '133', name: 'Lesson 3*IV', total_progress: 0, type: MicroType.Video },
            ]
        },
    ]
]

const mockGroupDB: PathData = {
    id: "path-1",
    name: "Introduction Python 101 Fun!!!!!",
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
    groups: []
}

export function getPathResult(id: string): Promise<PathAPIResponse> { // Mock API Response
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
    mockGroupDB.groups = directedGraphCase[0]
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

export function updatePathProgress(id: string, total_progress: number): Promise<{ status: number, message?: string }> { // Mock API Response
    // find path's id in mockDB
    for (let i = 0; i < directedGraphCase.length; i++) {
        let paths = directedGraphCase[i]
        for (let j = 0; j < paths.length; j++) {
            let group = paths[j]
            if (group.id == id) {
                for (let k = 0; k < group.micros.length; k++) {
                    group.micros[k].total_progress = total_progress
                }
                break
            }
        }
    }

    if (id == "21") {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 500,
                    message: "Mock Data jaaaaa"
                });
            }, 2000);
        });
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200
            });
        }, 0);
    });
}