import { MarkerType, Node } from "reactflow";
import { GroupType, IMicroNode, mockData } from "./data";
import { findMostLeftAndMostRightNodes, findRoot } from "./algorithm";

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';
export interface IGroupValueMap {
    name: string;
    next: string[];
    type: GroupType;
    members: IMicroNode[];
}
export let groupMember = new Map<string, IGroupValueMap>() // key: {group node id, group name}, value: node's member
export let parents = new Map<string, Set<string>>() // key: {node id}, value: node's parents

export function getInitialNodesAndEdges() {
    let initialNodes: Node<any, string | undefined>[] = [];
    let initialEdges: {
        id: string;
        source: string;
        target: string;
        type: string;
        markerEnd: {
            type: MarkerType;
            color: string;
        };
    }[] = [];
    let nextData: IGraph = {} as IGraph;

    mockData.groups.forEach(group => {
        initialNodes.push({
            id: group.id,
            data: { label: group.name },
            position,
            draggable: false,
            type: group.type === GroupType.Single ? 'singleNode' : group.type === GroupType.Ordered ? 'orderedGroupNode' : 'unorderedGroupNode',
        });

        groupMember.set(group.id, {name: group.name, type: group.type, next: group.next, members: group.members})

        group.next.forEach(nextId => {
            if (parents.has(nextId)) {
                parents.get(nextId)?.add(group.id)
            } else {
                let tmp = new Set<string>()
                parents.set(nextId, tmp.add(group.id))
            }
        })

        group.next.forEach(next => {
            initialEdges.push({
                id: `e${group.id}${next}`,
                source: group.id,
                target: next,
                type: edgeType,
                markerEnd: { type: MarkerType.ArrowClosed, color: 'black' }
            });
        })

        nextData[group.id] = { id: group.id, next: group.next }
    })

    let ans = findMostLeftAndMostRightNodes(nextData, findRoot())
    console.log(ans)

    return { initialNodes, initialEdges };
}