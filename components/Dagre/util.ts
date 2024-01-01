import { Node } from "reactflow";
import { defaultSettings, groupSettings } from "./setting";

export function setInfoSection(reactFlownodes: Node<any, string | undefined>[], screenWidth: number, rootInfo: {
    width: number;
    x: number;
    y: number;
}) {
    let isExists = reactFlownodes.find(node => node.id === 'info')?.data?.label
    if (isExists) {
        return;
    }
    reactFlownodes.push({
        id: 'info',
        type: 'infoNode',
        position: {
            x: rootInfo.x - screenWidth/2 + groupSettings.width/2,
            y: rootInfo.y - defaultSettings.rootY
        },
        data: {
            label: 'info section (mock na)'
        },
        draggable: false,
        selectable: false,
    })
}
