
import { GroupTypeEnum } from "@/types/enum";
import { groupMember } from "./node-edges";
import { defaultSettings, groupSettings } from "./setting";
import { Node } from "reactflow";
import { IMicroData } from "@/types/type";
import { IMicroProps } from "@/components/Micro";

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

export function getMicroInGroup(groupId: string) {
    let member: IMicroData[] = groupMember.get(groupId)?.members || [];
    let micros: IMicroProps[] = [];
    member.forEach((value) => {
        micros.push({
            id: value.id,
            title: value.name,
            progress: value.progress,
            type: value.type,
            isGroup: member.length > 1
        });
    });
    return micros;
}

// export function calculateNodeSize(nodeId: string, type?: string | undefined) {  // TODO: EDIT
//     let componentData
//     if (type === "groupNode") {
//         componentData = document
//             .getElementById(`group-display-${nodeId}`)
//             ?.getBoundingClientRect();
//     } else {
//         componentData = document
//             .getElementById(`micro-display-${nodeId}`)
//             ?.getBoundingClientRect();
//     }
//     let width = componentData ? componentData.width : 0;
//     let height = componentData ? componentData.height : 0;

//     return {
//         width: width,
//         height: height,
//     };
// }

// export function improveHorizontalPosition(nodes: Node<any, string | undefined>[]) {
//     nodes.forEach(node => {
//         let members = groupMember.get(node.id)?.members
//         let groupType = groupMember.get(node.id)?.type
//         if (members?.length === 1) {
//             node.position.x += groupSettings.width / 2
//             // node.position.x -= defaultSettings.singleWidth / 2  // PROBLEM: WIDTH IS NOT EQUAL
//         }
//         else if (groupType === GroupTypeEnum.Ordered) {
//             node.position.x += defaultSettings.singleWidth
//         }
//     })
// }

// export function improvePositionForVerticalGroup(nodes: Node<any, string | undefined>[]) {
//     let isAdjusted = new Set<string>();
//     nodes.forEach(node => {
//         if (groupMember.get(node.id)?.type === GroupTypeEnum.Ordered) {
//             isAdjusted.add(node.id)
//             adjustChildrenPosition(node.id, nodes, isAdjusted)
//         }
//     })
// }

// function adjustChildrenPosition(nodeId: string, nodes: Node<any, string | undefined>[], isAdjusted: Set<string>) {
//     let children = groupMember.get(nodeId)?.next;
//     if (children) {
//         children.forEach(childId => {
//             nodes.forEach(node => {
//                 if (isAdjusted.has(childId)) {
//                     return
//                 }
//                 if (node.id === childId) {
//                     node.position.y += 80   // MAY NEED TO CHANGE THIS
//                     isAdjusted.add(childId)
//                 }
//             })
//             adjustChildrenPosition(childId, nodes, isAdjusted)
//         })
//     }
// }