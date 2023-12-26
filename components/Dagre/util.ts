import { Node } from "reactflow";
export function setInfoSection(reactFlownodes: Node<any, string | undefined>[], screenWidth: number, rootWidth: number) {
    reactFlownodes.push({
        id: 'info',
        type: 'infoNode',
        position: {
            x: - screenWidth/2 + rootWidth/2,
            y: 0
        },
        data: {
            label: 'info section (mock na)'
        },
        draggable: false,
        selectable: false,
    })
}