import { MenuTab, PathDisplay } from '@/types/enum';
import { GraphNode, GraphEdge } from '@/types/graph';
import { JourneyStoreData } from '@/types/type';

export function generateInitialNodeEdge(journeys: JourneyStoreData | null, type: MenuTab): { nodes: GraphNode[]; edges: GraphEdge[] } {
    if (!journeys || !journeys.data) {
        return {
            nodes: [],
            edges: []
        }
    }

    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    journeys.data.forEach((journey, index) => {
        journey.paths.data.forEach((path, index) => {
            nodes.push({
                id: path.id,
                type: PathDisplay.Unselect,
                data: {
                    force: { x: 0, y: 0 },
                    velocity: { x: 0, y: 0 },
                    status: path.status,
                    pathInfo: path,
                },
                draggable: false,
                position: {
                    x: 0,
                    y: 0
                }
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
                })

                isExisted.push([relationship.id, neighborId].sort());
            }
        })
    })

    return {
        nodes: nodes,
        edges: edges
    }
}

function isEdgeExisted(isExisted: string[][], target: string[]) {
    return isExisted.some((item) => {
        return item[0] === target[0] && item[1] === target[1];
    })
}