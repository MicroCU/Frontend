import { TreeNode } from "entitree-flex";
import { Node } from "reactflow";
import { ITreeNode } from "../lib/type";
import { groupMember } from "../node-edges";
import { defaultSettings } from "../setting";

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