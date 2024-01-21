import { GroupTypeEnum } from "@/types/enum";
import { MarkerType, Node, Edge } from "reactflow";
import { mockData } from "./data";
import { IGroupData } from "@/types/type";

const edgeType = 'default';

export function getInitialNodesAndEdges() {
    let initialNodes: Node<IGroupData, GroupTypeEnum>[] = [];
    let initialEdges: Edge<any>[] = [];

    mockData.groups.forEach(group => {
        initialNodes.push({
            id: group.id,
            data: {
                id: group.id,
                name: group.name,
                type: group.type,
                next: group.next,
                members: group.members
            },
            position: { x: 0, y: 0 },
            draggable: false,
            type: group.type,
        });

        group.next.forEach(next => {
            initialEdges.push({
                id: `e${group.id}${next}`,
                source: group.id,
                target: next,
                type: edgeType,
                markerEnd: { type: MarkerType.ArrowClosed, color: '#5C4EFF', width: 25, height: 25, },
                style: { stroke: '#5C4EFF', strokeWidth: 2 },
            });
        })
    })

    return { initialNodes, initialEdges };
}