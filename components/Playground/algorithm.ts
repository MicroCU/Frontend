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

interface INodeBrief {
    id: string;
    position: { x: number, y: number };
    width: number;
}
var distinctParents: Map<string, string[]> = new Map<string, string[]>() // key: "p1, p2, p3"  value: ["c1", "c2"]
var parenMostLeft = {
    id: "",
    position: { x: 10000000000000, y: 0 },
    width: 0
}
var parentMostRight = {
    id: "",
    position: { x: -10000000000000, y: 0 },
    width: 0
}
export function adjustPosition(reactFlownodes: Node<any, string | undefined>[]) {
    parents.forEach((ps, nodeId) => {
        if (ps.size > 1) {
            let p: INodeBrief[] = []
            ps.forEach(parentId => {
                let node = reactFlownodes.find(node => node.id === parentId)
                if (node) {
                    let size = calculateNodeSize(node.id!)
                    p.push({ id: node.id!, position: node.position, width: size[0] })
                }
            })
            p.sort((a, b) => a.position.x - b.position.x);
            parentsPositionImproved(p)
            
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
                c.push({ id: node.id!, position: node.position, width: size[0] })
            }
        })
        c.sort((a, b) => a.position.x - b.position.x);

        papa.split(", ").forEach(parentId => {
            let node = reactFlownodes.find(node => node.id === parentId)
            // console.log("PARENT[FINAL]: ", node?.id, " --> ", node?.position.x)
            if (node) {
                let size = calculateNodeSize(node.id!)
                parenMostLeft = parenMostLeft.position.x < node.position.x ? parenMostLeft : { id: node.id!, position: node.position, width: size[0] }
                parentMostRight = parentMostRight.position.x > node.position.x ? parentMostRight : { id: node.id!, position: node.position, width: size[0] }
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
function parentsPositionImproved(nodes: INodeBrief[]) { // adjust position of parents in x-axis
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
    let diffCenterParentX = ( parentMostRight.position.x + parentMostRight.width - parenMostLeft.position.x )/2
    let centerChild = nodes[Math.floor(nodes.length / 2)]
    
    centerChild.position.x =  parenMostLeft.position.x + diffCenterParentX - centerChild.width/2
    
    let left = nodes.slice(0, Math.floor(nodes.length / 2))
    let right = nodes.slice(Math.floor(nodes.length / 2) + 1)
    for (let i = left.length - 1; i >= 0; i--) {
        if (i == left.length - 1) {
            left[i].position.x = centerChild.position.x - ( (left.length - i) * (left[i].width + neededGap) )
        } else {
            left[i].position.x = left[i+1].position.x - left[i].width - neededGap
        
        }
    }
    for (let i = 0; i < right.length; i++) {
        if (i == 0) {
            right[i].position.x = centerChild.position.x + centerChild.width + neededGap
        } else {
            right[i].position.x = right[i-1].position.x + right[i-1].width + neededGap
        }
    }
}