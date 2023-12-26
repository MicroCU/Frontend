import { calculateNodeSize } from "./lib/EntitreeFlex";
import { groupMember, parents } from "./node-edges";
import { Node } from "reactflow";
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
    let diffCenterParentX = (parentMostRight.position.x + parentMostRight.width - parenMostLeft.position.x) / 2
    let centerChild = nodes[Math.floor(nodes.length / 2)]

    centerChild.position.x = parenMostLeft.position.x + diffCenterParentX - centerChild.width / 2
    moveY(centerChild)

    let left = nodes.slice(0, Math.floor(nodes.length / 2))
    let right = nodes.slice(Math.floor(nodes.length / 2) + 1)
    for (let i = left.length - 1; i >= 0; i--) {
        if (i == left.length - 1) {
            left[i].position.x = centerChild.position.x - ((left.length - i) * (left[i].width + neededGap))
        } else {
            left[i].position.x = left[i + 1].position.x - left[i].width - neededGap

        }
        moveY(left[i])
    }
    for (let i = 0; i < right.length; i++) {
        if (i == 0) {
            right[i].position.x = centerChild.position.x + centerChild.width + neededGap
        } else {
            right[i].position.x = right[i - 1].position.x + right[i - 1].width + neededGap
        }
        moveY(right[i])
    }
}

var maxMap = new Map<string, { left: number, right: number }>()
export function compactGraph(reactFlownodes: Node<any, string | undefined>[], nodes: TreeNode<ITreeNode>[], rootId: string) {
    // Update position of nodes (TreeNode) Because we need to use it in the below algorithm
    nodes.forEach(node => {
        let reactFlowNode = reactFlownodes.find(n => n.id === node.id)
        if (reactFlowNode) {
            node.x = reactFlowNode.position.x
            node.y = reactFlowNode.position.y
        }
    })

    findMaxLeftRight(nodes, rootId, 10000000000000, -10000000000000)

    nodes.forEach(node => {
        let diffCompact = calculateCompactSize(node.id, node.id === rootId)
        if (diffCompact > 0) {
            if (node.id === rootId) {
                moveChildren(node.id, diffCompact, nodes)
            } else if (node.x < defaultSettings.rootX) {
                let leftNode = node.children?.[0]
                if (leftNode) {
                    let leftChild = nodes.find(node => node.id === leftNode)
                    if (leftChild) {
                        leftChild.x += diffCompact
                        moveLeftChildrenToTheRight(leftChild, diffCompact, nodes, new Set<string>())
                    }
                }
            } else if (node.x > defaultSettings.rootX) {
                let rightNode = node.children?.[node.children.length - 1]
                if (rightNode) {
                    let rightChild = nodes.find(node => node.id === rightNode)
                    if (rightChild) {
                        rightChild.x -= diffCompact
                        moveRightChildrenToTheLeft(rightChild, diffCompact, nodes, new Set<string>())
                    }
                }
            }
        }
    })

    // update position
    nodes.forEach(node => {
        let reactFlowNode = reactFlownodes.find(n => n.id === node.id)
        if (reactFlowNode) {
            reactFlowNode.position.x = node.x
            reactFlowNode.position.y = node.y
        }
    })
}

function findMaxLeftRight(nodes: TreeNode<ITreeNode>[], nodeId: string, maxLeft: number, maxRight: number) {
    let node = nodes.find(node => node.id === nodeId)
    if (maxMap.has(nodeId)) {  // Dynamic programming
        let value = maxMap.get(nodeId)
        if (value) {
            maxLeft = value.left
            maxRight = value.right
            return { maxLeft, maxRight }
        }
    }
    if (node && node.children) {
        if (node.children.length > 0) {
            let left = node.children[0]
            let right = node.children[node.children.length - 1]
            let { maxLeft: left1, maxRight: right1 } = findMaxLeftRight(nodes, left, maxLeft, maxRight)
            let { maxLeft: left2, maxRight: right2 } = findMaxLeftRight(nodes, right, maxLeft, maxRight)
            let left3 = node.x
            let right3 = node.x + node.width
            maxLeft = Math.min(left1, left2, left3)
            maxRight = Math.max(right1, right2, right3)
        } else {
            maxLeft = maxLeft < node.x ? maxLeft : node.x
            maxRight = maxRight > node.x + node.width ? maxRight : node.x + node.width
        }
    }

    if (!maxMap.has(nodeId)) {
        maxMap.set(nodeId, { left: maxLeft, right: maxRight })
    }

    return { maxLeft, maxRight }
}

const maxGap = 0
function calculateCompactSize(nodeId: string, isRoot: boolean) {
    let nextChildren = groupMember.get(nodeId)?.next
    if (!nextChildren) {
        return 0
    }
    let leftChild = nextChildren[0]
    let rightChild = nextChildren[nextChildren.length - 1]

    let maxLeftChildNode = maxMap.get(leftChild)
    let maxRightChildNode = maxMap.get(rightChild)

    if (!maxLeftChildNode || !maxRightChildNode) {
        return 0
    }

    if (maxRightChildNode.left - maxLeftChildNode.right > maxGap) {
        if (isRoot) {
            return ( maxRightChildNode.left - maxLeftChildNode.right ) / 2
        } else {
            return maxRightChildNode.left - maxLeftChildNode.right
        }
    }

    return 0
}

function moveChildren(nodeId: string, diff: number, nodes: TreeNode<ITreeNode>[]) {
    let node = nodes.find(node => node.id === nodeId)
    if (node && node.children) {
        let left = node.children[0]
        let right = node.children[node.children.length - 1]
        let leftNode = nodes.find(node => node.id === left)
        let rightNode = nodes.find(node => node.id === right)
        let isMoveLeft = new Set<string>()
        let isMoveRight = new Set<string>()
        if (leftNode) {
            leftNode.x += diff
            isMoveLeft.add(leftNode.id)
            moveLeftChildrenToTheRight(leftNode, diff, nodes, isMoveLeft)
        }
        if (rightNode) {
            rightNode.x -= diff
            isMoveRight.add(rightNode.id)
            moveRightChildrenToTheLeft(rightNode, diff, nodes, isMoveRight)
        }
    }
}

function moveLeftChildrenToTheRight(node: TreeNode<ITreeNode>, diff: number, nodes: TreeNode<ITreeNode>[], isMoveLeft: Set<string>) {
    if (node && node.children) {
        node.children.forEach(child => {
            if (isMoveLeft.has(child)) {
                return
            }
            let childNode = nodes.find(node => node.id === child)
            if (childNode) {
                childNode.x += diff
                isMoveLeft.add(childNode.id)
                moveLeftChildrenToTheRight(childNode, diff, nodes, isMoveLeft)
            }
        })
    }
}

function moveRightChildrenToTheLeft(node: TreeNode<ITreeNode>, diff: number, nodes: TreeNode<ITreeNode>[], isMoveRight: Set<string>) {
    if (node && node.children) {
        node.children.forEach(child => {
            if (isMoveRight.has(child)) {
                return
            }
            let childNode = nodes.find(node => node.id === child)
            if (childNode) {
                childNode.x -= diff
                isMoveRight.add(childNode.id)
                moveRightChildrenToTheLeft(childNode, diff, nodes, isMoveRight)
            }
        })
    }
}