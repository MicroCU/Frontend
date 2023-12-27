import { groupMember } from "./node-edges";

export function findRoot() {
    let root: string = '';
    let allFoundNextNodes = new Set<string>();
    let allFoundParentNodes = new Set<string>();
    groupMember.forEach((value, key) => {
        value.next.forEach(nextId => {
            allFoundNextNodes.add(nextId)
        })
        allFoundParentNodes.add(key)
    })
    allFoundParentNodes.forEach(nodeId => {
        if (!allFoundNextNodes.has(nodeId)) {
            root = nodeId;
        }
    })
    return root;
}

export function findMostLeftAndMostRightNodes(graph: IGraph, startNodeId: string): { left: string; right: string } {
    const visited: Set<string> = new Set();
    let mostLeft: string | null = null;
    let mostRight: string | null = null;

    function dfs(nodeId: string) {
        visited.add(nodeId);

        if (mostLeft === null) {
            mostLeft = nodeId;
        }

        if (mostRight === null || graph[nodeId].next.length === 0) {
            mostRight = nodeId;
        }

        for (const nextNodeId of graph[nodeId].next) {
            if (!visited.has(nextNodeId)) {
                dfs(nextNodeId);
            }
        }
    }

    if (graph[startNodeId]) {
        dfs(startNodeId);
    }

    return { left: mostLeft || '', right: mostRight || '' };
}

