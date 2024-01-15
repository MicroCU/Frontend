import { GroupTypeEnum } from "@/types/enum";
import { MarkerType, Node, Edge } from "reactflow";
import { mockData } from "./data";
import { IMicroData } from "@/types/type";

const position = { x: 0, y: 0 };
const edgeType = 'default';

interface INode {
    id: string;
    next: string[];
}

interface IGraph {
    [id: string]: INode;
}

export interface IGroupValueMap {
    name: string;
    next: string[];
    type: GroupTypeEnum;
    members: IMicroData[];
}
export let groupMember = new Map<string, IGroupValueMap>() // key: {group node id, group name}, value: node's member
// export let parents = new Map<string, Set<string>>() // key: {node id}, value: node's parents

export function getInitialNodesAndEdges() {
    let initialNodes: Node<any, string | undefined>[] = [];
    let initialEdges: Edge<any>[] = [];
    let nextData: IGraph = {} as IGraph;

    mockData.groups.forEach(group => {
        initialNodes.push({
            id: group.id,
            data: { label: group.name },
            position,
            draggable: false,
            type: group.type === GroupTypeEnum.Single ? 'singleNode' : 'groupNode',
        });

        groupMember.set(group.id, { name: group.name, type: group.type, next: group.next, members: group.members })

        // group.next.forEach(nextId => {
        //     if (parents.has(nextId)) {
        //         parents.get(nextId)?.add(group.id)
        //     } else {
        //         let tmp = new Set<string>()
        //         parents.set(nextId, tmp.add(group.id))
        //     }
        // })

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

        nextData[group.id] = { id: group.id, next: group.next }
    })

    return { initialNodes, initialEdges };
}