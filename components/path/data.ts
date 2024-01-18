import { GroupTypeEnum, MicroTypeEnum } from "@/types/enum";
import { IMockDirectedGraphData } from "@/types/type";

export const mockData: IMockDirectedGraphData = {
    // groups: [
    //     {
    //         id: '1', name: 'Overview', next: ['2'], type: GroupTypeEnum.Single,
    //         members: [
    //             { id: '1', name: 'Overview', progress: 0, type: MicroTypeEnum.VIDEO },
    //         ]
    //     },
    //     {
    //         id: '2', name: 'Comment', next: ['3'], type: GroupTypeEnum.Unordered,
    //         members: [
    //             { id: '21', name: 'Comment 1', progress: 0, type: MicroTypeEnum.PRACTICE },
    //             { id: '22', name: 'Comment 2', progress: 0, type: MicroTypeEnum.PRACTICE },
    //             { id: '23', name: 'Comment 3', progress: 0, type: MicroTypeEnum.PRACTICE },
    //         ]
    //     },
    //     {
    //         id: '3', name: 'Comment', next: [], type: GroupTypeEnum.Ordered,
    //         members: [
    //             { id: '31', name: 'Comment 1', progress: 0, type: MicroTypeEnum.PRACTICE },
    //             { id: '32', name: 'Comment 2', progress: 0, type: MicroTypeEnum.PRACTICE },
    //             // { id: '33', name: 'Comment 3', progress: 0, type: MicroTypeEnum.PRACTICE },
    //         ]
    //     },
    // ]
    // groups: [
    //     {
    //         id: '1', name: 'Overview', next: ['2', '3'], type: GroupTypeEnum.Single,
    //         members: [
    //             { id: '1', name: 'Overview', progress: 0, type: MicroTypeEnum.VIDEO },
    //         ]
    //     },
    //     {
    //         id: '2', name: 'Comment', next: [], type: GroupTypeEnum.Unordered,
    //         members: [
    //             { id: '21', name: 'Comment 1', progress: 0, type: MicroTypeEnum.PRACTICE },
    //             { id: '22', name: 'Comment 2', progress: 0, type: MicroTypeEnum.PRACTICE },
    //             { id: '23', name: 'Comment 3', progress: 0, type: MicroTypeEnum.PRACTICE },
    //         ]
    //     },
    //     {
    //         id: '3', name: 'Syntax - 2', next: [], type: GroupTypeEnum.Single,
    //         members: [
    //             { id: '3', name: 'Syntax - 2', progress: 40, type: MicroTypeEnum.VIDEO }
    //         ]
    //     },
    // ]
    groups: [
        {
            id: '1', name: 'Overview', next: ['2', '3'], type: GroupTypeEnum.Single,
            members: [
                { id: '1', name: 'Overview', progress: 0, type: MicroTypeEnum.VIDEO },
            ]
        },
        {
            id: '2', name: 'Comment', next: ['8'], type: GroupTypeEnum.Unordered,
            members: [
                { id: '21', name: 'Comment 1', progress: 0, type: MicroTypeEnum.PRACTICE },
                { id: '22', name: 'Comment 2', progress: 0, type: MicroTypeEnum.PRACTICE },
                { id: '23', name: 'Comment 3', progress: 0, type: MicroTypeEnum.PRACTICE },
            ]
        },
        {
            id: '3', name: 'Syntax - 2', next: ['30'], type: GroupTypeEnum.Single,
            members: [
                { id: '3', name: 'Syntax - 2', progress: 40, type: MicroTypeEnum.VIDEO }
            ]
        },
        {
            id: '30', name: 'Syntax - 3', next: ['4', '9'], type: GroupTypeEnum.Single,
            members: [
                { id: '30', name: 'Syntax - 3', progress: 80, type: MicroTypeEnum.VIDEO }
            ]
        },
        {
            id: '4', name: 'Operator', next: ['5', '6'], type: GroupTypeEnum.Unordered,
            members: [
                { id: '41', name: 'Bitwise', progress: 90, type: MicroTypeEnum.VIDEO },
                { id: '42', name: 'Arithmatic', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '43', name: 'Bitwise - 1', progress: 90, type: MicroTypeEnum.VIDEO },
            ]
        },
        {
            id: '5', name: 'Control Flow', next: ['7', '70'], type: GroupTypeEnum.Ordered,
            members: [
                { id: '51', name: 'Conditional', progress: 50, type: MicroTypeEnum.VIDEO },
                { id: '52', name: 'Loop', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '53', name: 'Function', progress: 0, type: MicroTypeEnum.VIDEO },
            ]
        },
        {
            id: '6', name: 'Useful Library', next: ['7', '70'], type: GroupTypeEnum.Unordered,
            members: [
                { id: '61', name: 'Built-in function', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '62', name: 'Standard library**', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '63', name: 'Standard library1', progress: 0, type: MicroTypeEnum.VIDEO },
            ]
        },
        {
            id: '7', name: 'Python Final Test', next: [], type: GroupTypeEnum.Unordered,
            members: [
                { id: '71', name: 'Python Final Test 1', progress: 10, type: MicroTypeEnum.VIDEO },
                { id: '72', name: 'Python Final Test 2', progress: 40, type: MicroTypeEnum.VIDEO },
                // { id: '73', name: 'Python Final Test 3', progress: 0, type: MicroNodeType.Test },
            ]
        },
        {
            id: '70', name: 'MID', next: [], type: GroupTypeEnum.Unordered,
            members: [
                { id: '701', name: 'Python Midterm Test 1', progress: 20, type: MicroTypeEnum.VIDEO },
                { id: '702', name: 'Python Final Test 2', progress: 60, type: MicroTypeEnum.VIDEO },
                // { id: '703', name: 'Python Final Test 3', progress: 0, type: MicroNodeType.Test },
            ]
        },
        {
            id: '8', name: 'Comment 2 Long', next: ['10', '11'], type: GroupTypeEnum.Ordered,
            members: [
                { id: '81', name: 'Comment 2', progress: 20, type: MicroTypeEnum.VIDEO },
                { id: '82', name: 'Comment 3', progress: 40, type: MicroTypeEnum.VIDEO },
                { id: '83', name: 'Comment 4', progress: 60, type: MicroTypeEnum.VIDEO },
                { id: '84', name: 'Comment 5', progress: 100, type: MicroTypeEnum.VIDEO },
                { id: '85', name: 'Comment 6', progress: 35, type: MicroTypeEnum.VIDEO },
            ]
        },
        {
            id: '9', name: 'Operator2', next: ['90'], type: GroupTypeEnum.Ordered,
            members: [
                { id: '91', name: 'Bitwise', progress: 70, type: MicroTypeEnum.VIDEO },
                { id: '92', name: 'Arithmatic', progress: 50, type: MicroTypeEnum.VIDEO },
                { id: '93', name: 'Arithmatic 2', progress: 0, type: MicroTypeEnum.PRACTICE },
            ]
        },
        {
            id: '90', name: 'Operator *', next: ['7', '70'], type: GroupTypeEnum.Single,
            members: [
                { id: '90', name: 'Operator *', progress: 90, type: MicroTypeEnum.PRACTICE },
            ]
        },
        {
            id: '10', name: 'Lesson', next: [], type: GroupTypeEnum.Ordered,
            members: [
                { id: '101', name: 'Lesson 1', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '102', name: 'Lesson 2', progress: 0, type: MicroTypeEnum.VIDEO },
                // { id: '103', name: 'Lesson 3', progress: 0, type: MicroTypeEnum.VIDEO },
            ]
        },
        {
            id: '11', name: 'Lesson * (Long)', next: ['12', '13'], type: GroupTypeEnum.Unordered,
            members: [
                { id: '111', name: 'Lesson 1* longlonglonglonglonglong', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '112', name: 'Lesson 2* longlonglonglonglonglong', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '113', name: 'Lesson 3* longlonglonglonglonglong', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '114', name: 'Lesson 4', progress: 50, type: MicroTypeEnum.VIDEO },
                { id: '115', name: 'Lesson 5', progress: 70, type: MicroTypeEnum.VIDEO },
            ]
        },
        {
            id: '12', name: 'Lesson I', next: ['14', '15'], type: GroupTypeEnum.Unordered,
            members: [
                { id: '121', name: 'Lesson 1 I', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '122', name: 'Lesson 2 I', progress: 0, type: MicroTypeEnum.VIDEO },
                // { id: '123', name: 'Lesson 3 I', progress: 0, type: MicroNodeType.VIDEO },
            ]
        },
        {
            id: '13', name: 'Lesson II abbcvgdvcgsgvcdhsdcghvcfhvhgcvgvfhcvvdhcvdvh', next: ['14', '15'], type: GroupTypeEnum.Unordered,
            members: [
                { id: '131', name: 'Lesson 1*II', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '132', name: 'Lesson 2*II', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '133', name: 'Lesson 3*II', progress: 0, type: MicroTypeEnum.VIDEO },
            ]
        },
        {
            id: '14', name: 'Lesson III', next: [], type: GroupTypeEnum.Single,
            members: [
                { id: '14', name: 'Lesson 1 III', progress: 0, type: MicroTypeEnum.TEST },
                // { id: '142', name: 'Lesson 2 III', progress: 0, type: MicroNodeType.VIDEO },
                // { id: '143', name: 'Lesson 3 III', progress: 0, type: MicroNodeType.VIDEO },
            ]
        },
        {
            id: '15', name: 'Lesson IV', next: [], type: GroupTypeEnum.Unordered,
            members: [
                { id: '131', name: 'Lesson 1*IV', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '132', name: 'Lesson 2*IV', progress: 0, type: MicroTypeEnum.VIDEO },
                { id: '133', name: 'Lesson 3*IV', progress: 0, type: MicroTypeEnum.VIDEO },
            ]
        },
        // {
        //     id: '16', name: 'Lesson V', next: [], type: GroupType.Single, 
        //     members: [
        //         { id: '16', name: 'Lesson 1 V', progress: 0, type: MicroNodeType.VIDEO },
        //         // { id: '142', name: 'Lesson 2 III', progress: 0, type: MicroNodeType.VIDEO },
        //         // { id: '143', name: 'Lesson 3 III', progress: 0, type: MicroNodeType.VIDEO },
        //     ]
        // },
        // {
        //     id: '17', name: 'Lesson VI', next: [], type: GroupType.Unordered, 
        //     members: [
        //         { id: '171', name: 'Lesson 1*VI', progress: 0, type: MicroNodeType.VIDEO },
        //         { id: '172', name: 'Lesson 2*VI', progress: 0, type: MicroNodeType.VIDEO },
        //         { id: '173', name: 'Lesson 3*VI', progress: 0, type: MicroNodeType.VIDEO },
        //     ]
        // },
    ]
}