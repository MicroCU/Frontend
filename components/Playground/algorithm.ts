import { calculateNodeSize } from "./lib/EntitreeFlex";
import { groupMember, parents } from "./node-edges";
import { Node, Edge } from "reactflow";
import { defaultSettings } from "./setting";

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

export function adjustPosition(reactFlownodes: Node<any, string | undefined>[]) {
    findChildrenWithMultipleParents(reactFlownodes)
}

interface IParent {
    id: string;
    position: { x: number, y: number };
    width: number;
}

function findChildrenWithMultipleParents(reactFlownodes: Node<any, string | undefined>[]) {
    parents.forEach((value, key) => {
        if (value.size > 1) {
            let p: IParent[] = []
            value.forEach(parentId => {
                let node = reactFlownodes.find(node => node.id === parentId)
                if (node) {
                    let size = calculateNodeSize(node.id!)
                    p.push({ id: node.id!, position: node.position, width: size[0] })
                }
            })
            p.sort((a, b) => a.position.x - b.position.x);
            positionImproved(key, p, reactFlownodes)
        }
    })
}

const neededGap = 172
function positionImproved(nodeId: string, parentIds: IParent[], reactFlownodes: Node<any, string | undefined>[]) {
    // console.log("Adjusting: ", nodeId)
    // parentIds.forEach((parent, index) => {
    //     if (index > 0) {
    //         let previousParent = parentIds[index - 1]
    //         let gap = parent.position.x - ( previousParent.position.x + previousParent.width )
    //         let diff = gap - neededGap
    //         parent.position.x -= diff
    //     }
    // })

    // reactFlownodes.forEach(node => {
    //     if (parentIds.find(parent => parent.id === node.id)) {
    //         let parent = parentIds.find(parent => parent.id === node.id)!
    //         node.position = parent.position
    //     }
    // })
}