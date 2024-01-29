import { UndirectedNodeType } from '@/types/enum';
import { HomePageData, UndirectedGraphNodeData } from '@/types/type';
import { Node, Edge } from 'reactflow';

function getMockPosition(pathId: string) {
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

    return positionMap.get(pathId)!;
}

export function generateInitialNodeEdge(homeData: HomePageData) {
    const nodes: Node<UndirectedGraphNodeData, UndirectedNodeType>[] = [];
    const edges: Edge<any>[] = [];
    homeData.journeys.forEach((journey, index) => {
        journey.paths.data.forEach((path, index) => {
            const mockPosition = getMockPosition(path.id);
            nodes.push({
                id: path.id,
                type: UndirectedNodeType.CircularNode,
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

    let isExisted: string[][] = [];
    homeData.relationships.forEach((relationship, index) => {
        relationship.neighbor.forEach((neighborId, index) => {
            if (!isEdgeExisted(isExisted, [relationship.id, neighborId].sort())) {
                edges.push({
                    id: `${neighborId}-${relationship.id}`,
                    source: neighborId,
                    target: relationship.id,
                    type: 'straight'
                })
                isExisted.push([relationship.id, neighborId].sort());
            }
        })
    })

    return {
        initialNodes: nodes,
        initialEdges: edges
    }
}

function isEdgeExisted(isExisted: string[][], target: string[]) {
    return isExisted.some((item) => {
        return item[0] === target[0] && item[1] === target[1];
    })
}