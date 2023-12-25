import { calculateNodeSize } from "./lib/EntitreeFlex";
import { groupMember, parents } from "./node-edges";
import { Node, Edge } from "reactflow";
import { defaultSettings } from "./setting";
import { TreeNode } from "entitree-flex/dist/TreeNode";
import { ITreeNode } from "./lib/type";

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

interface INodeBrief {
    id: string;
    position: { x: number, y: number };
    width: number;
    height: number
}

var distinctParents: Map<string, string[]> = new Map<string, string[]>() // key: "p1, p2, p3"  value: ["c1", "c2"]
var parenMostLeft: INodeBrief = {
    id: "",
    position: { x: 10000000000000, y: 0 },
    width: 0,
    height: 0
}
var parentMostRight:INodeBrief = {
    id: "",
    position: { x: -10000000000000, y: 0 },
    width: 0,
    height: 0
}
export function adjustPosition(reactFlownodes: Node<any, string | undefined>[]) {
    parents.forEach((ps, nodeId) => {
        if (ps.size > 1) {
            let p: INodeBrief[] = []
            ps.forEach(parentId => {
                let node = reactFlownodes.find(node => node.id === parentId)
                if (node) {
                    let size = calculateNodeSize(node.id!)
                    p.push({ id: node.id!, position: node.position, width: size[0], height: size[1] })
                }
            })
            p.sort((a, b) => a.position.x - b.position.x);
            parentsPositionImproved(p, reactFlownodes)
            
            // Prepare for children position improvement
            let key = Array.from(ps).join(", ") // Use string as key because reference type
            if (distinctParents.has(key)) {
                let value = distinctParents.get(key)
                if (value && !checkIfThisElementExistInArray(value, nodeId)) {
                    distinctParents.set(key, [...value, nodeId])
                }
            } else {
                distinctParents.set(key, [nodeId])
            }
        }
    })

    distinctParents.forEach((children, papa) => {
        let c: INodeBrief[] = []
        children.forEach(nodeId => {
            let node = reactFlownodes.find(node => node.id === nodeId)
            if (node) {
                let size = calculateNodeSize(node.id!)
                c.push({ id: node.id!, position: node.position, width: size[0], height: size[1] })
            }
        })
        c.sort((a, b) => a.position.x - b.position.x);

        papa.split(", ").forEach(parentId => {
            let node = reactFlownodes.find(node => node.id === parentId)
            if (node) {
                let size = calculateNodeSize(node.id!)
                parenMostLeft = parenMostLeft.position.x < node.position.x ? parenMostLeft : { id: node.id!, position: node.position, width: size[0], height: size[1] }
                parentMostRight = parentMostRight.position.x > node.position.x ? parentMostRight : { id: node.id!, position: node.position, width: size[0], height: size[1] }
            }
        })
    
        childrenPositionImproved(c, parenMostLeft, parentMostRight)
    })
}

function checkIfThisElementExistInArray(arr: string[], element: string) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            return true
        }
    }
    return false
}

const neededGap = 0
function parentsPositionImproved(nodes: INodeBrief[], reactFlownodes: Node<any, string | undefined>[]) { // adjust position of parents in x-axis
    const moveCenter = (center: INodeBrief) => {
        let parentOfCenterIds = parents.get(center.id)
        if (parentOfCenterIds) {
            let ids = Array.from(parentOfCenterIds); 
            if (ids.length > 1) {

            } else {
                let parentId = ids[0]
                let n = reactFlownodes.find(node => node.id === parentId)
                if (n) {
                    center.position.x = n.position.x
                }
            }
        }
    }
    const moveLeft = (left: INodeBrief[], center: INodeBrief) => {
        for (let i = 0; i < left.length; i++) {
            let zeroDiff = (center.position.x - (left[i].position.x + left[i].width))
            left[i].position.x += zeroDiff
            left[i].position.x -= neededGap
        }
    }

    const moveRight = (right: INodeBrief[], center: INodeBrief) => {
        for (let i = 0; i < right.length; i++) {
            let zeroDiff = (right[i].position.x - (center.position.x + center.width))
            right[i].position.x -= zeroDiff
            right[i].position.x += neededGap
        }
    }

    if ((nodes.length) % 2 !== 0) {
        let center = nodes[Math.floor(nodes.length / 2)]
        moveCenter(center)

        let left = nodes.slice(0, Math.floor(nodes.length / 2))
        moveLeft(left, center)

        let right = nodes.slice(Math.floor(nodes.length / 2) + 1)
        moveRight(right, center)
    } else {
        let centerLeft = nodes[Math.floor(nodes.length / 2) - 1]
        let centerRight = nodes[Math.floor(nodes.length / 2)]
        let zeroDiffCenter = ((centerRight.position.x - (centerLeft.position.x + centerLeft.width))) / 2

        centerLeft.position.x += zeroDiffCenter
        centerLeft.position.x -= neededGap / 2

        centerRight.position.x -= zeroDiffCenter
        centerRight.position.x += neededGap / 2

        let left = nodes.slice(0, Math.floor(nodes.length / 2) - 1)
        moveLeft(left, centerLeft)

        let right = nodes.slice(Math.floor(nodes.length / 2) + 1)
        moveRight(right, centerRight)
    }
}

function childrenPositionImproved(nodes: INodeBrief[], parenMostLeft: INodeBrief, parentMostRight: INodeBrief) {
    const moveY = (node: INodeBrief) => {
        node.position.y = Math.max(parenMostLeft.position.y + parenMostLeft.height, parentMostRight.position.y + parentMostRight.height) + defaultSettings.sourceTargetSpacing
    }
    let diffCenterParentX = ( parentMostRight.position.x + parentMostRight.width - parenMostLeft.position.x )/2
    let centerChild = nodes[Math.floor(nodes.length / 2)]
    
    centerChild.position.x =  parenMostLeft.position.x + diffCenterParentX - centerChild.width/2
    moveY(centerChild)
    
    let left = nodes.slice(0, Math.floor(nodes.length / 2))
    let right = nodes.slice(Math.floor(nodes.length / 2) + 1)
    for (let i = left.length - 1; i >= 0; i--) {
        if (i == left.length - 1) {
            left[i].position.x = centerChild.position.x - ( (left.length - i) * (left[i].width + neededGap) )
        } else {
            left[i].position.x = left[i+1].position.x - left[i].width - neededGap
        
        }
        moveY(left[i])
    }
    for (let i = 0; i < right.length; i++) {
        if (i == 0) {
            right[i].position.x = centerChild.position.x + centerChild.width + neededGap
        } else {
            right[i].position.x = right[i-1].position.x + right[i-1].width + neededGap
        }
        moveY(right[i])
    }
}

// var maxMap = new Map<string, {left: number, right: number}>()
// export function compactGraph(reactFlownodes: Node<any, string | undefined>[], nodes: TreeNode<ITreeNode>[], rootId: string) {
//     // Update position of nodes (TreeNode) Because we need to use it in recur()
//     nodes.forEach(node => {
//         let reactFlowNode = reactFlownodes.find(n => n.id === node.id)
//         if (reactFlowNode) {
//             node.x = reactFlowNode.position.x
//             node.y = reactFlowNode.position.y
//         }
//     })

//     recur(nodes, rootId, 10000000000000, -10000000000000)
// }

// function recur(nodes: TreeNode<ITreeNode>[], nodeId: string, maxLeft: number, maxRight: number) {
//     let node = nodes.find(node => node.id === nodeId)
//     if (node && node.children) {
//         if (node.children.length > 0) {
//             let left = node.children[0]
//             let right = node.children[node.children.length - 1]
//             let {maxLeft: left1, maxRight: right1} = recur(nodes, left, maxLeft, maxRight)
//             let {maxLeft: left2, maxRight: right2} = recur(nodes, right, maxLeft, maxRight)
//             maxLeft = left1 < left2 ? left1 : left2
//             maxRight = right1 > right2 ? right1 : right2
//         } else {
//             maxLeft = maxLeft < node.x ? maxLeft : node.x
//             maxRight = maxRight > node.x + node.width ? maxRight : node.x + node.width
//         }
//     }

//     if (!maxMap.has(nodeId)) {
//         maxMap.set(nodeId, {left: maxLeft, right: maxRight})
//     }
//     return {maxLeft, maxRight}
// }