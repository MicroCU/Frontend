export enum GroupType {
    Single,
    Ordered,
    Unordered
}

export enum MicroNodeType {
    Micro,
    Practice,
    Test
}

export interface IMicroNode {
    id: string;
    name: string;
    progress: number;
    type: MicroNodeType;
}

export interface IGroup {
    id: string;
    name: string;
    next: string[];
    type: GroupType;
    members: IMicroNode[];
}

export interface IMockData {
    groups: IGroup[];
}

// For EntitreeFlex name of each node must be unique !!!
export const mockData: IMockData = {
    groups: [
        {
            id: '1', name: 'Overview', next: ['2', '3'], type: GroupType.Single, 
            members: [
                { id: '1', name: 'Overview', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '2', name: 'Comment', next: ['8'], type: GroupType.Single, 
            members: [
                { id: '2', name: 'Comment', progress: 0, type: MicroNodeType.Micro }
            ]
        },
        {
            id: '3', name: 'Syntax - 2', next: ['4', '9'], type: GroupType.Single, 
            members: [
                { id: '3', name: 'Syntax - 2', progress: 80, type: MicroNodeType.Micro }
            ]
        },
        {
            id: '4', name: 'Operator', next: ['5', '6'], type: GroupType.Unordered, 
            members: [
                { id: '41', name: 'Bitwise', progress: 90, type: MicroNodeType.Micro },
                { id: '42', name: 'Arithmatic', progress: 0, type: MicroNodeType.Micro },
                { id: '43', name: 'Bitwise - 1', progress: 90, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '5', name: 'Control Flow', next: ['7', '70'], type: GroupType.Unordered, 
            members: [
                { id: '51', name: 'Conditional', progress: 50, type: MicroNodeType.Micro },
                { id: '52', name: 'Loop', progress: 0, type: MicroNodeType.Micro },
                { id: '53', name: 'Function', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '6', name: 'Useful Library', next: ['7', '70'], type: GroupType.Unordered, 
            members: [
                { id: '61', name: 'Built-in function', progress: 0, type: MicroNodeType.Micro },
                { id: '62', name: 'Standard library**', progress: 0, type: MicroNodeType.Micro },
                { id: '63', name: 'Standard library1', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '7', name: 'Python Final Test', next: [], type: GroupType.Unordered, 
            members: [
                { id: '71', name: 'Python Final Test 1', progress: 0, type: MicroNodeType.Test },
                { id: '72', name: 'Python Final Test 2', progress: 0, type: MicroNodeType.Test },
                { id: '73', name: 'Python Final Test 3', progress: 0, type: MicroNodeType.Test },
            ]
        },
        {
            id: '70', name: 'MID', next: [], type: GroupType.Unordered, 
            members: [
                { id: '701', name: 'Python Midterm Test 1', progress: 0, type: MicroNodeType.Test },
                { id: '702', name: 'Python Final Test 2', progress: 0, type: MicroNodeType.Test },
                { id: '703', name: 'Python Final Test 3', progress: 0, type: MicroNodeType.Test },
            ]
        },
        {
            id: '8', name: 'Comment 2', next: ['10', '11'], type: GroupType.Unordered, 
            members: [
                { id: '81', name: 'Comment 2', progress: 0, type: MicroNodeType.Micro },
                { id: '82', name: 'Comment 3', progress: 0, type: MicroNodeType.Micro },
                { id: '83', name: 'Comment 4', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '9', name: 'Operator2', next: [], type: GroupType.Ordered, 
            members: [
                { id: '91', name: 'Bitwise', progress: 90, type: MicroNodeType.Micro },
                { id: '92', name: 'Arithmatic', progress: 0, type: MicroNodeType.Micro },
                { id: '93', name: 'Arithmatic 2', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '10', name: 'Lesson', next: [], type: GroupType.Ordered, 
            members: [
                { id: '101', name: 'Lesson 1', progress: 0, type: MicroNodeType.Micro },
                { id: '102', name: 'Lesson 2', progress: 0, type: MicroNodeType.Micro },
                { id: '103', name: 'Lesson 3', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '11', name: 'Lesson *', next: ['12', '13'], type: GroupType.Unordered, 
            members: [
                { id: '111', name: 'Lesson 1*', progress: 0, type: MicroNodeType.Micro },
                { id: '112', name: 'Lesson 2*', progress: 0, type: MicroNodeType.Micro },
                { id: '113', name: 'Lesson 3*', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '12', name: 'Lesson I', next: ['14', '15'], type: GroupType.Unordered, 
            members: [
                { id: '121', name: 'Lesson 1 I', progress: 0, type: MicroNodeType.Micro },
                { id: '122', name: 'Lesson 2 I', progress: 0, type: MicroNodeType.Micro },
                { id: '123', name: 'Lesson 3 I', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '13', name: 'Lesson II', next: ['14', '15'], type: GroupType.Unordered, 
            members: [
                { id: '131', name: 'Lesson 1*II', progress: 0, type: MicroNodeType.Micro },
                { id: '132', name: 'Lesson 2*II', progress: 0, type: MicroNodeType.Micro },
                { id: '133', name: 'Lesson 3*II', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '14', name: 'Lesson III', next: [], type: GroupType.Single, 
            members: [
                { id: '14', name: 'Lesson 1 III', progress: 0, type: MicroNodeType.Micro },
                // { id: '142', name: 'Lesson 2 III', progress: 0, type: MicroNodeType.Micro },
                // { id: '143', name: 'Lesson 3 III', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        {
            id: '15', name: 'Lesson IV', next: [], type: GroupType.Unordered, 
            members: [
                { id: '131', name: 'Lesson 1*IV', progress: 0, type: MicroNodeType.Micro },
                { id: '132', name: 'Lesson 2*IV', progress: 0, type: MicroNodeType.Micro },
                { id: '133', name: 'Lesson 3*IV', progress: 0, type: MicroNodeType.Micro },
            ]
        },
        // {
        //     id: '16', name: 'Lesson V', next: [], type: GroupType.Single, 
        //     members: [
        //         { id: '16', name: 'Lesson 1 V', progress: 0, type: MicroNodeType.Micro },
        //         // { id: '142', name: 'Lesson 2 III', progress: 0, type: MicroNodeType.Micro },
        //         // { id: '143', name: 'Lesson 3 III', progress: 0, type: MicroNodeType.Micro },
        //     ]
        // },
        // {
        //     id: '17', name: 'Lesson VI', next: [], type: GroupType.Unordered, 
        //     members: [
        //         { id: '171', name: 'Lesson 1*VI', progress: 0, type: MicroNodeType.Micro },
        //         { id: '172', name: 'Lesson 2*VI', progress: 0, type: MicroNodeType.Micro },
        //         { id: '173', name: 'Lesson 3*VI', progress: 0, type: MicroNodeType.Micro },
        //     ]
        // },
    ]
}