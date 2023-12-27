import { GroupType } from "./data";
import { groupMember } from "./node-edges";
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

export function getRootRealWidth(rootId: string) {
    let root = groupMember.get(rootId)
    let memberOfRoot = root?.members
    if (memberOfRoot && memberOfRoot.length == 1) {
        return defaultSettings.singleWidth
    } else if (memberOfRoot && memberOfRoot.length > 1) {
        if (root?.type === GroupType.Ordered) {
            return ( defaultSettings.singleWidth * memberOfRoot.length ) + (defaultSettings.Padding * (memberOfRoot.length - 1))
        } else if (root?.type === GroupType.Unordered) {
            return defaultSettings.singleWidth
        } else {
            return 0
        }
    }
    return 0
}
