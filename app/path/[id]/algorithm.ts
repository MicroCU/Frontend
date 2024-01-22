import { GroupData } from "@/types/type";
import { getInitialNodesAndEdges } from "./node-edges";

export function getMicroInGroup(groupId: string) {
    const { initialNodes } = getInitialNodesAndEdges();
    const matchedNode = initialNodes.find(node => node.id === groupId);
    if (!matchedNode) return []
    return matchedNode?.data.members
}

export function getGroupData(groupId: string) {
    const { initialNodes } = getInitialNodesAndEdges();
    initialNodes.forEach(node => {
        if (node.data?.id === groupId) {
            return node.data
        }
    })
    return {} as GroupData
}