import { Node } from "reactflow";
import { parents } from "../node-edges";
import { defaultSettings, gapSpecial } from "../setting";
import { calculateNodeSize } from "./util";

interface INodeBrief {
    id: string;
    position: { x: number, y: number };
    width: number;
    height: number
}

var distinctParents: Map<string, string[]> = new Map<string, string[]>() // key: "p1, p2, p3"  value: ["c1", "c2"]

// Adjust position is for the case that a node has more than 1 parent
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

    reactFlownodes.forEach(node => {
        node.data.label = node.id + " " + node.position.x + " " + node.position.y
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

        let parenMostLeft: INodeBrief = {
            id: "",
            position: { x: 10000000000000, y: 0 },
            width: 0,
            height: 0
        }
        let parentMostRight: INodeBrief = {
            id: "",
            position: { x: -10000000000000, y: 0 },
            width: 0,
            height: 0
        }
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

function parentsPositionImproved(nodes: INodeBrief[], reactFlownodes: Node<any, string | undefined>[]) { // adjust position of parents in x-axis
    const moveCenter = (center: INodeBrief) => {
        let parentOfCenterIds = parents.get(center.id)
        if (parentOfCenterIds) {
            let ids = Array.from(parentOfCenterIds);
            if (ids.length > 1) {
                let left = ids[0]
                let right = ids[1]
                let l = reactFlownodes.find(node => node.id === left)
                let r = reactFlownodes.find(node => node.id === right)
                if (l && r) {
                    center.position.x = (l.position.x + calculateNodeSize(l.id)[0] + r.position.x) / 2
                }
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
            left[i].position.x -= gapSpecial
        }
    }

    const moveRight = (right: INodeBrief[], center: INodeBrief) => {
        for (let i = 0; i < right.length; i++) {
            let zeroDiff = (right[i].position.x - (center.position.x + center.width))
            right[i].position.x -= zeroDiff
            right[i].position.x += gapSpecial
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
        centerLeft.position.x -= gapSpecial / 2

        centerRight.position.x -= zeroDiffCenter
        centerRight.position.x += gapSpecial / 2

        let left = nodes.slice(0, Math.floor(nodes.length / 2) - 1)
        moveLeft(left, centerLeft)

        let right = nodes.slice(Math.floor(nodes.length / 2) + 1)
        moveRight(right, centerRight)
    }
}

function childrenPositionImproved(nodes: INodeBrief[], parentMostLeft: INodeBrief, parentMostRight: INodeBrief) {
    const moveY = (node: INodeBrief) => {
        node.position.y = Math.max(parentMostLeft.position.y + parentMostLeft.height, parentMostRight.position.y + parentMostRight.height) + defaultSettings.sourceTargetSpacing
    }

    // NOTE: nodes' length is always 2 as the constaint described.
    let leftChild = nodes[0]
    let rightChild = nodes[1]

    leftChild.position.x = parentMostLeft.position.x
    moveY(leftChild)

    rightChild.position.x = leftChild.position.x + leftChild.width + gapSpecial
    moveY(rightChild)

    let diffCenterParentX = (parentMostRight.position.x + parentMostRight.width - parentMostLeft.position.x) / 2
    let diffCenterChildX = (rightChild.position.x + rightChild.width - leftChild.position.x) / 2

    leftChild.position.x += diffCenterParentX - diffCenterChildX
    rightChild.position.x += diffCenterParentX - diffCenterChildX
}