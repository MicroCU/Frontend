import { Node } from "reactflow";
import { defaultSettings, groupSettings } from "./setting";

export function setInfoSection(reactFlownodes: Node<any, string | undefined>[], screenWidth: number, rootInfo: {
    width: number;
    x: number;
    y: number;
}) {
    let infoNode = reactFlownodes.find(node => node.id === 'info')
    if (infoNode) {
        infoNode.position = {
            x: rootInfo.x - screenWidth/2 + rootInfo.width/2,
            y: rootInfo.y - defaultSettings.rootY
        }
        return 
    }
    reactFlownodes.push({
        id: 'info',
        type: 'infoNode',
        position: {
            x: rootInfo.x - screenWidth/2 + rootInfo.width/2,
            y: rootInfo.y - defaultSettings.rootY
        },
        data: {
            label: 'info section (mock na)'
        },
        draggable: false,
        selectable: false,
    })
}