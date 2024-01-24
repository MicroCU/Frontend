export const nodes = [
    {
        id: '1',
        type: 'circleNode',
        data: {
            label: 'Node 1',
        },
        position: { x: 250, y: 0 },
    },
    {
        id: '2',
        type: 'circleNode',
        data: {
            label: 'Node 2',
        },
        position: { x: 100, y: 100 },
    },
    {
        id: '3',
        type: 'circleNode',
        data: {
            label: 'Node 3',
        },
        position: { x: 400, y: 100 },
    },
    {
        id: '4',
        type: 'circleNode',
        data: {
            label: 'Node 4',
        },
        position: { x: 0, y: 200 },
    },
    {
        id: '5',
        type: 'circleNode',
        data: {
            label: 'Node 5',
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