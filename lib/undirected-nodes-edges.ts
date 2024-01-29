import { JourneyData, UndirectedGraphNodeData } from '@/types/type';
import { Node } from 'reactflow';

function getMockPosition(pathId: string) {
    const positionMap = new Map<string, { x: number, y: number }>();
    positionMap.set("1-p1", { x: 250, y: 0 });
    positionMap.set("1-p2", { x: 100, y: 100 });
    positionMap.set("1-p3", { x: 400, y: 100 });
    positionMap.set("2-p1", { x: 250, y: 200 });
    positionMap.set("2-p2", { x: 550, y: 200 });
    positionMap.set("2-p3", { x: 400, y: 300 });

    return positionMap.get(pathId)!;
}

export function generateNode(data: JourneyData[]) {
    const nodes: Node<UndirectedGraphNodeData>[] = [];
    data.forEach((journey, index) => {
        journey.paths.forEach((path, index) => {
            const mockPosition = getMockPosition(path.id);
            nodes.push({
                id: path.id,
                type: "circleNode",
                data: {
                    status: path.status,
                    pathInfo: path
                },
                position: {
                    x: mockPosition.x,
                    y: mockPosition.y
                }
            })
        })
    })
    return nodes;
}

export const mockEdges = [
    { id: 'e1', source: '1-p1', target: '1-p2', type: 'straight' },
    { id: 'e2', source: '1-p1', target: '1-p3', type: 'straight' },
    { id: 'e3', source: '1-p3', target: '2-p1', type: 'straight' },
    { id: 'e4', source: '1-p3', target: '2-p2', type: 'straight' },
    { id: 'e5', source: '2-p1', target: '2-p3', type: 'straight' },
    { id: 'e6', source: '2-p2', target: '2-p3', type: 'straight' },
];