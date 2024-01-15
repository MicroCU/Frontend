
import { GroupTypeEnum } from "@/types/enum";
import { groupMember } from "./node-edges";
import { defaultSettings, groupSettings } from "./setting";
import { Node } from "reactflow";

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

export function calculateNodeSize(nodeId: string): [number, number] {
    let nodeWidth = defaultSettings.singleWidth;
    let nodeHeight = defaultSettings.singleHeight;
    const nodeInfo = groupMember.get(nodeId)
    if (!nodeInfo) {
        return [nodeWidth, nodeHeight]
    }
    let memberCount = nodeInfo.members.length;
    let w, h;
    if (nodeInfo.type === GroupTypeEnum.Unordered) {
        w = (nodeWidth * memberCount) + (defaultSettings.Margin * (memberCount - 1));
        h = nodeHeight;
    } else if (nodeInfo.type === GroupTypeEnum.Ordered) {
        w = nodeWidth;
        h = (nodeHeight * memberCount) + (defaultSettings.Margin * (memberCount - 1));
    } else {
        w = nodeWidth;
        h = nodeHeight;
    }
    return [w, h];
}

export function improvePositionForVerticalGroup(nodes: Node<any, string | undefined>[]) {
    let isAdjusted = new Set<string>();
    nodes.forEach(node => {
        if (groupMember.get(node.id)?.type === GroupTypeEnum.Ordered) {
            isAdjusted.add(node.id)
            adjustChildrenPosition(node.id, nodes, isAdjusted)
        }
    })
}

function adjustChildrenPosition(nodeId: string, nodes: Node<any, string | undefined>[], isAdjusted: Set<string>) {
    let children = groupMember.get(nodeId)?.next;
    if (children) {
        children.forEach(childId => {
            nodes.forEach(node => {
                if (isAdjusted.has(childId)) {
                    return
                }
                if (node.id === childId) {
                    node.position.y += 80   // MAY NEED TO CHANGE THIS
                    isAdjusted.add(childId)
                }
            })
            adjustChildrenPosition(childId, nodes, isAdjusted)
        })
    }
}