import { layoutFromMap } from "entitree-flex";
import { groupMember, parents } from "../node-edges";
import { defaultSettings } from "../setting";
import { Node, Edge } from "reactflow";
import { NodeData } from "./type";
import { calculateNodeSize, findRoot } from "../algorithm/util";
import { adjustPosition } from "../algorithm/adjustPosition";
import { compactGraph } from "../algorithm/compact";

function generateStructForFlextree(nodes: Node<any, string | undefined>[]) {
    let hierarchy: NodeData = {} as NodeData;
    nodes.forEach((node) => {
        let sizee = calculateNodeSize(node.id!)
        let p = parents.get(node.id!)
        let myParents: string[] = []
        p && p.forEach((value) => {
            myParents.push(value)
        })

        hierarchy[node.id!] = {
            id: node.id!,
            name: node.data.label,
            width: sizee[0],
            height: sizee[1],
            children: groupMember.get(node.id!)?.next || [],
            spouses: [],
            parents: myParents,
        }
    })
    return hierarchy;
}

export function setInfoSection(reactFlownodes: Node<any, string | undefined>[], screenWidth: number, rootWidth: number) {
    reactFlownodes.push({
        id: 'info',
        type: 'infoNode',
        position: {
            x: - screenWidth/2 + rootWidth/2,
            y: 0
        },
        data: {
            label: 'info section (mock na)'
        },
        draggable: false,
        selectable: false,
    })
}

export function calculateLayoutNodes(reactFlownodes: Node<any, string | undefined>[], edges: Edge<any>[], screenWidth: number) {
    const rootId: string = findRoot()
    const hierarchy: NodeData = generateStructForFlextree(reactFlownodes)
    let { nodes } = layoutFromMap(rootId, hierarchy, defaultSettings);
    let rootWidth = 0;

    nodes.forEach((node) => {
        const reactFlowNode = reactFlownodes.find((value) => value.data.label === node.name)
        if (reactFlowNode) {
            reactFlowNode.position = {
                x: node.x,
                y: node.y
            } 

            if (reactFlowNode.id === rootId) {
                rootWidth = node.width
            }
        }
    })

    adjustPosition(reactFlownodes)
    compactGraph(reactFlownodes, nodes, rootId)
    setInfoSection(reactFlownodes, screenWidth, rootWidth)

    // reactFlownodes.forEach((node) => {  // TEST ONLY
    //     node.data.label = node.id + " => " + node.position.x + ", " + node.position.y
    // })

    return { lNode: reactFlownodes, lEdge: edges, rootInfo: { width: rootWidth } };
}