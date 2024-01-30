import { MockHomeData, getMockJourneyPosition } from '@/mock/journey_data';
import { getMockSearchPosition, getSearchResult } from '@/mock/search_data';
import { MenuTab, UndirectedNodeType } from '@/types/enum';
import { UndirectedGraphNodeData } from '@/types/type';
import { Node, Edge } from 'reactflow';

export function generateInitialNodeEdge(type: MenuTab, searchText?: string) {
    if (type === MenuTab.journey) {
        return generateInitialNodeEdgeForJourney();
    } else if (type === MenuTab.search) {
        return generateInitialNodeEdgeForSearch(searchText);
    } else if (type === MenuTab.recently) {
        // TODO: implement recently
        return {
            initialNodes: [],
            initialEdges: []
        }
    } else {
        return generateInitialNodeEdgeForJourney();
    }
}

function generateInitialNodeEdgeForSearch(searchText: string | undefined) {
    if (!searchText) {
        return {
            initialNodes: [],
            initialEdges: []
        }
    }

    let resp = getSearchResult(searchText);
    const nodes: Node<UndirectedGraphNodeData, UndirectedNodeType>[] = [];
    const edges: Edge<any>[] = [];
    resp.data.forEach((path, index) => {
        const mockPosition = getMockSearchPosition(path.id);
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
            draggable: false
        })
    })

    let isExisted: string[][] = [];
    resp.relationships.forEach((relationship, index) => {
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

function generateInitialNodeEdgeForJourney() {
    const nodes: Node<UndirectedGraphNodeData, UndirectedNodeType>[] = [];
    const edges: Edge<any>[] = [];
    MockHomeData.journeys.forEach((journey, index) => {
        journey.paths.data.forEach((path, index) => {
            const mockPosition = getMockJourneyPosition(path.id);
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
                draggable: false
            })
        })
    })

    let isExisted: string[][] = [];
    MockHomeData.relationships.forEach((relationship, index) => {
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