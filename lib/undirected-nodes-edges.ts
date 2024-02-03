import { getMockJourneyPosition } from '@/mock/journey_data';
import { getMockRecentlyPosition } from '@/mock/recently_data';
import { getMockSearchPosition } from '@/mock/search_data';
import { MenuTab, UndirectedNodeType } from '@/types/enum';
import { JourneyStoreData, UndirectedGraphNodeData } from '@/types/type';
import { Node, Edge } from 'reactflow';

export function generateInitialNodeEdge(journeys: JourneyStoreData | null, type: MenuTab) {
    if (!journeys) {
        return {
            initialNodes: [],
            initialEdges: []
        }
    }

    const nodes: Node<UndirectedGraphNodeData, UndirectedNodeType>[] = [];
    const edges: Edge<any>[] = [];
    journeys.data.forEach((journey, index) => {
        journey.paths.data.forEach((path, index) => {
            let mockPosition = { x: 0, y: 0 };
            if (type === MenuTab.journey) {
                mockPosition = getMockJourneyPosition(path.id);
            } else if (type === MenuTab.search) {
                mockPosition = getMockSearchPosition(path.id);
            } else if (type === MenuTab.recently) {
                mockPosition = getMockRecentlyPosition(path.id);
            } else {
                mockPosition = getMockJourneyPosition(path.id);
            }

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
                },
                draggable: false,
                width: 24,
                height: 24
            })
        })
    })

    let isExisted: string[][] = [];
    journeys.relationships.forEach((relationship, index) => {
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