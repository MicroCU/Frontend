import { Node } from "reactflow";
import { defaultSettings } from "./setting";

export function setInfoSection(reactFlownodes: Node<any, string | undefined>[], screenWidth: number, rootInfo: {
    width: number;
    x: number;
    y: number;
}) {
    reactFlownodes.push({
        id: 'info',
        type: 'infoNode',
        position: {
            x: rootInfo.x - screenWidth/2 + defaultSettings.singleWidth/2, //In case, the root is single node 
            y: rootInfo.y - defaultSettings.rootY
        },
        data: {
            label: 'info section (mock na)'
        },
        draggable: false,
        selectable: false,
    })
}